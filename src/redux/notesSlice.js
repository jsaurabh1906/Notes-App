import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNoteToDB,
  fetchNotesFromDB,
  updateNoteInDB,
  deleteNoteFromDB,
} from "../services/appwriteConfig";

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

//  Fetch Notes
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching notes from Appwrite...");
      const notes = await fetchNotesFromDB();
      return notes;
    } catch (error) {
      console.error("Error fetching notes:", error);
      return rejectWithValue(error.message);
    }
  }
);

//  Add Note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (note, { rejectWithValue }) => {
    try {
      console.log("Adding note to Appwrite...");
      const newNote = await addNoteToDB(note);
      return newNote;
    } catch (error) {
      console.error("Error adding note:", error);
      return rejectWithValue(error.message);
    }
  }
);

//  Update Note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, note }, { rejectWithValue }) => {
    try {
      console.log(`Updating note ID: ${id}...`);
      const updatedNote = await updateNoteInDB(id, note);
      return updatedNote;
    } catch (error) {
      console.error(`Error updating note ID ${id}:`, error);
      return rejectWithValue(error.message);
    }
  }
);

//  Delete Note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId, { rejectWithValue }) => {
    try {
      console.log(`Deleting note ID: ${noteId}...`);
      await deleteNoteFromDB(noteId);
      return { id: noteId }; // Return ID so we can remove it from state
    } catch (error) {
      console.error(`Error deleting note ID ${noteId}:`, error);
      return rejectWithValue(error.message);
    }
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  Fetch Notes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch notes.";
      })

      //  Add Note
      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add note.";
      })

      //  Update Note
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        const updatedNote = action.payload;

        if (!updatedNote || !updatedNote.id) {
          console.error("Updated note is missing an ID", updatedNote);
          return;
        }

        const index = state.notes.findIndex(
          (note) => note.id === updatedNote.id
        );
        if (index !== -1) {
          state.notes[index] = updatedNote;
        } else {
          console.error("Updated note ID not found in state:", updatedNote.id);
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update note.";
      })

      //  Delete Note
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter(
          (note) => note.id !== action.payload.id
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete note.";
      });
  },
});

export default notesSlice.reducer;
