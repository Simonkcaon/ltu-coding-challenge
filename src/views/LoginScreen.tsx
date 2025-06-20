import React, { useState } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Auth } from "@aws-amplify/auth";
import { LtuInput } from "../components/Input";
import { ltuRoseShade } from "../constants/colors";
import { LtuButton } from "../components/Button";
import { LtuIcon } from "../components/Icon";

type LoginScreenProps = {
  onLoginSuccess: () => void;
};

export const LoginScreen = ({ onLoginSuccess }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await Auth.signIn(email, password);
      // If user needs to set a new password, automatically handle it
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        const completedUser = await Auth.completeNewPassword(user, password);
        console.log("✅ New password set. User is authenticated");
      }
      onLoginSuccess();
    } catch (e: any) {
      const error = e as { message?: string };
      Alert.alert(
        "Fehler beim Login",
        error.message || "Unbekannter Fehler"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/LifeNotesUs.png")}
        style={styles.logo}
      />
      <LtuInput
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <View>
      <LtuInput
        placeholder="Passwort"
        value={password}
        onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
      />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <LtuIcon name={isPasswordVisible ? "eye-off" : "eye"} size={24} />
        </TouchableOpacity>
      </View>
      <LtuButton onPress={handleLogin} isLoading={loading}>
        Login
      </LtuButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: ltuRoseShade,
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
});
