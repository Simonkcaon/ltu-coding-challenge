import { View, SafeAreaView, StyleSheet, FlatList } from "react-native";
import React, { useContext } from "react";
import { ltuRoseShade } from "../constants/colors";
import { LtuSpinner } from "../components/Spinner";
import { LtuText } from "../components/typography/Text";
import { LtuCard } from "../components/Card";
import AppContext from "../context/AppContext";

export function NotesListScreen() {
  const { fetchedNotes } = useContext(AppContext);
  const { notes, loading } = fetchedNotes;

  if (loading) {
    return (
      <View style={styles.innerContainer}>
        <LtuSpinner />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {notes && notes.length > 0 ? (
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <LtuCard>
                <LtuText>{item?.title}</LtuText>
              </LtuCard>
            )}
            keyExtractor={(item) => item?.id ?? ""}
          />
        ) : (
          <LtuText>No notes found</LtuText>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: ltuRoseShade,
    justifyContent: "center",
    alignItems: "center",
  },
});
