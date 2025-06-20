import { Note } from "../API";

export type NotesState = {
  notes: Note[];
  loading: boolean;
  error: boolean;
};

export type NotesAction =
  | { type: "FETCH_NOTES_SUCCESS"; payload: Note[] }
  | { type: "FETCH_NOTES_LOADING" }
  | { type: "FETCH_NOTES_ERROR" }
  | { type: "ADD_NOTE"; payload: Note }
  | { type: "ARCHIVE_NOTE"; payload: string }
  | { type: "ADD_NOTE_FROM_SUBSCRIPTION"; payload: Note };
