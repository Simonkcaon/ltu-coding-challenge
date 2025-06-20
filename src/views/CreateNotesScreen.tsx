import { View, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { ltuRoseShade } from "../constants/colors";
import { LtuInput } from "../components/Input";
import { LtuButton } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { createNoteService } from "../services/createNoteService";
import AppContext from "../context/AppContext";
import { CreateNoteMutation, Note } from "../API";

export function CreateNotesScreen() {
  const navigation = useNavigation();
  const { dispatch } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!title) {
      // Maybe show an alert to the user
      return;
    }
    setIsLoading(true);
    try {
      const response = (await createNoteService(
        title,
        content
      )) as { data: CreateNoteMutation };

      if (response.data.createNote) {
        dispatch({
          type: "ADD_NOTE",
          payload: response.data.createNote as Note,
        });
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error saving note:", error);
      // Maybe show an error alert to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LtuInput
        placeholder="Note Title"
        value={title}
        onChangeText={setTitle}
      />
      <LtuInput
        placeholder="Note Content"
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.contentInput}
      />
      <LtuButton onPress={handleSave} isLoading={isLoading} disabled={isLoading}>
        Save Note
      </LtuButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ltuRoseShade,
    padding: 20,
  },
  contentInput: {
    height: 150,
    textAlignVertical: "top",
    marginTop: 10,
  },
});
