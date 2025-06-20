import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ltuBlue, ltuRose } from "../constants/colors";
import { ArchivedNotesScreen } from "../views/ArchivedNotesScreen";

const Stack = createNativeStackNavigator();

export const ArchiveStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Archived Notes List"
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
        name="Archived Notes List"
        component={ArchivedNotesScreen}
        options={{ title: "Archivierte Notizen" }}
      />
    </Stack.Navigator>
  );
};
