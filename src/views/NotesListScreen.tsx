import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { ltuBlue, ltuRoseShade } from "../constants/colors";
import { LtuSpinner } from "../components/Spinner";
import { LtuText } from "../components/typography/Text";
import { LtuCard } from "../components/Card";
import AppContext from "../context/AppContext";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { updateNoteService } from "../services/updateNoteService";
import { Note } from "../API";
import { CreateNoteHintAnimation } from "../components/CreateNoteHintAnimation";

const WordCountIndicator = ({
  count,
}: {
  count: number | null | undefined;
}) => {
  if (count === null || count === undefined) {
    return null;
  }
  const label = count === 1 ? "Wort" : "Wörter";
  return (
    <LtuText size="xs" style={{ color: "gray" }}>
      {count} {label}
    </LtuText>
  );
};

const RightActions = ({
  onPress,
  noteId,
}: {
  onPress: (noteId: string) => void;
  noteId: string;
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(noteId)}>
      <View style={styles.rightAction}>
        <LtuText style={styles.actionText}>Archive</LtuText>
      </View>
    </TouchableOpacity>
  );
};

export function NotesListScreen() {
  const { fetchedNotes, dispatch } = useContext(AppContext);
  const { notes, loading } = fetchedNotes;

  const handleArchive = async (noteId: string) => {
    try {
      await updateNoteService({ id: noteId, archived: true });
      dispatch({ type: "ARCHIVE_NOTE", payload: noteId });
    } catch (error) {
      console.error("Failed to archive note:", error);
    }
  };

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
              <ReanimatedSwipeable
                renderRightActions={() => (
                  <RightActions
                    onPress={handleArchive}
                    noteId={item?.id ?? ""}
                  />
                )}
              >
                <LtuCard
                  topRightIndicator={<WordCountIndicator count={item?.wordCount} />}
                >
                  <LtuText size="lg" bold>
                    {item?.title}
                  </LtuText>
                  {item?.content ? (
                    <LtuText size="sm" numberOfLines={1} ellipsizeMode="tail">
                      {item.content}
                    </LtuText>
                  ) : null}
                </LtuCard>
              </ReanimatedSwipeable>
            )}
            keyExtractor={(item) => item?.id ?? ""}
            contentContainerStyle={styles.listContentContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <CreateNoteHintAnimation />
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
    gap: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightAction: {
    backgroundColor: ltuBlue,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    maxWidth: 100,
    borderRadius: 20,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    padding: 20,
  },
});
