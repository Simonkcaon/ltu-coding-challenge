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
                <LtuText size="lg" bold>
                  {item?.title}
                </LtuText>
                {item?.content ? (
                  <LtuText size="sm" numberOfLines={1} ellipsizeMode="tail">
                    {item.content}
                  </LtuText>
                ) : null}
              </LtuCard>
            )}
            keyExtractor={(item) => item?.id ?? ""}
            contentContainerStyle={styles.listContentContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <LtuText>No notes found</LtuText>
          </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContentContainer: {
    paddingBottom: 20,
    gap: 20,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.09,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  
  content: {
    fontSize: 14,
  },
});
