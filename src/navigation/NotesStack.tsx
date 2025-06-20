import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotesListScreen } from "../views/NotesListScreen";
import { ltuBlue, ltuRed, ltuRose } from "../constants/colors";
import { TouchableOpacity } from "react-native";
import { LtuIcon } from "../components/Icon";
import { CreateNotesScreen } from "../views/CreateNotesScreen";

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
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Create Note")}
              style={{ padding: 4 }}
              accessibilityLabel="Create a new note"
            >
              <LtuIcon name="add-circle-outline" size={32} color={"#000000"} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Create Note"
        component={CreateNotesScreen}
        options={{
          title: "Create a new Note",
        }}
      />
    </Stack.Navigator>
  );
};
