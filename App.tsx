import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
Amplify.configure(awsconfig);
import React, { JSX, useEffect, useReducer, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ltuRose } from "./src/constants/colors";
import { LoginScreen } from "./src/views/LoginScreen";
import { UserAuthenticated } from "./src/views/UserAuthenticated";
import AppContext from "./src/context/AppContext";
import "react-native-get-random-values";
import { Auth } from "aws-amplify";
import { getNotesService } from "./src/services/getNotesService";
import { NotesAction, NotesState } from "./src/types";
import { Note } from "./src/API";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  const notesReducer = (state: NotesState, action: NotesAction) => {
    switch (action.type) {
      case "FETCH_NOTES_SUCCESS":
        return {
          ...state,
          notes: action.payload,
          loading: false,
          error: false,
        };
      case "FETCH_NOTES_LOADING":
        return { ...state, loading: true, error: false };
      case "FETCH_NOTES_ERROR":
        return { ...state, loading: false, error: true };
      case "ADD_NOTE":
        return { ...state, notes: [action.payload, ...state.notes] };
      case "ARCHIVE_NOTE":
        return {
          ...state,
          notes: state.notes.filter((note) => note.id !== action.payload),
        };
      case "ADD_NOTE_FROM_SUBSCRIPTION":
        return { ...state, notes: [...state.notes, action.payload] };
      default:
        return state;
    }
  };

  const [fetchedNotes, dispatch] = useReducer(notesReducer, {
    notes: [],
    loading: true,
    error: false,
  });

  const appStore = {
    isLoggedIn,
    setIsLoggedIn,
    fetchedNotes,
    dispatch,
  };

  // Check if user is authenticated on app load
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, []);

  // Fetch notes when user is logged in
  useEffect(() => {
    if (!isLoggedIn) return;
    const getNotes = async () => {
      try {
        dispatch({ type: "FETCH_NOTES_LOADING" });
        const response = await getNotesService(false);
        if (response?.data?.listNotes?.items) {
          dispatch({
            type: "FETCH_NOTES_SUCCESS",
            payload: response.data.listNotes.items as Note[],
          });
        }
      } catch (error) {
        dispatch({ type: "FETCH_NOTES_ERROR" });
        console.error("Error fetching notes:", error);
      }
    };
    getNotes();
  }, [isLoggedIn]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContext.Provider value={appStore}>
        <SafeAreaView style={styles.container}>
          {isLoggedIn ? (
            <UserAuthenticated />
          ) : (
            ((
              <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />
            ) as JSX.Element)
          )}
        </SafeAreaView>
      </AppContext.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ltuRose,
  },
});
