import { API, graphqlOperation } from "aws-amplify";
import { updateNote } from "../graphql/mutations";
import { UpdateNoteInput } from "../API";

export const updateNoteService = async (update: UpdateNoteInput) => {
  try {
    const response = await API.graphql(
      graphqlOperation(updateNote, {
        input: update,
      })
    );
    console.log("✅ Note updated:", response);
    return response;
  } catch (error) {
    console.error("❌ Error updating note:", error);
    throw error;
  }
}; 