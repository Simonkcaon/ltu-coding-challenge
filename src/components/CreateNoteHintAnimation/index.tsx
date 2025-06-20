import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { ltuBlue } from "../../constants/colors";
import { LtuText } from "../typography/Text";
import { LtuIcon } from "../Icon";

export const CreateNoteHintAnimation = () => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(1500),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [scale]);

  return (
    <View style={styles.container}>
      <LtuText style={styles.text}>Click das </LtuText>
      <Animated.View
        style={[styles.button, { transform: [{ scale }] }]}
      >
        <LtuIcon name="add" size={20} color="white" />
      </Animated.View>
      <LtuText style={styles.text}>oben um eine neue Notiz zu erstellen</LtuText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 14,
    color: "#888",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    backgroundColor: ltuBlue,
  },
}); 