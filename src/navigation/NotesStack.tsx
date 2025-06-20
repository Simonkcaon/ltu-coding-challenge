import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotesListScreen } from "../views/NotesListScreen";
import { ltuBlue, ltuRed, ltuRose } from "../constants/colors";
import { TouchableOpacity } from "react-native";
import { LtuIcon } from "../components/Icon";

const Stack = createNativeStackNavigator();

export const NotesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notizen Übersicht"
      screenOptions={{
        headerStyle: {
          backgroundColor: ltuRose,
        },
        headerTintColor: ltuBlue,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Notizen Übersicht"
        component={NotesListScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log("Navigate to create note screen")}
              style={{ padding: 4 }}
              accessibilityLabel="Create a new note"
            >
              <LtuIcon name="add-circle-outline" size={32} color={"#000000"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
