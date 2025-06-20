import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
  Text,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ltuBlue, ltuRoseShade } from "../constants/colors";
import { LtuSpinner } from "../components/Spinner";
import { getNotesService } from "../services/getNotesService";
import { Note } from "../API";
import { LtuText } from "../components/typography/Text";
import { LtuCard } from "../components/Card";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { updateNoteService } from "../services/updateNoteService";
import AppContext from "../context/AppContext";
import { useIsFocused } from "@react-navigation/native";
import { ArchiveHintAnimation } from "../components/ArchiveHintAnimation";
import { LtuHeadline } from "../components/typography/Headline";

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
        <LtuText style={styles.actionText}>Undo</LtuText>
      </View>
    </TouchableOpacity>
  );
};

export function ArchivedNotesScreen() {
  const [notes, setNotes] = useState<(Note | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch } = useContext(AppContext);
  const isFocused = useIsFocused();

  const handleUnarchive = async (noteId: string) => {
    try {
      const response: any = await updateNoteService({
        id: noteId,
        archived: false,
      });
      // Add note back to the global state for the main list
      if (response.data.updateNote) {
        dispatch({ type: "ADD_NOTE", payload: response.data.updateNote });
      }
      // Remove from local state
      setNotes((prevNotes) => prevNotes.filter((note) => note?.id !== noteId));
    } catch (error) {
      console.error("Failed to un-archive note:", error);
    }
  };

  useEffect(() => {
    const getNotes = async () => {
      // Set loading to true only on the initial fetch or when focusing an empty list
      if (notes.length === 0) {
        setIsLoading(true);
      }
      try {
        const result = await getNotesService(true);
        if (result?.data?.listNotes?.items) {
          setNotes(result.data.listNotes.items as Note[]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isFocused) {
      getNotes();
    }
  }, [isFocused]);

  if (isLoading) {
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
                    onPress={handleUnarchive}
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
            <Image
              source={require("../../assets/sad-archive.png")}
              style={[styles.emptyIcon, { tintColor: "gray" }]}
            />
            <Text style={styles.emptyTitle}>Dein Archiv ist leer</Text>
            <Text style={styles.emptySubtitle}>
              Wische auf einer Notiz von rechts nach links, um sie hierher zu
              archivieren.
            </Text>
            <ArchiveHintAnimation />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
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