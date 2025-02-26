import { Client, Databases, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID);

const database = new Databases(client);

//Fetch Notes
export const fetchNotesFromDB = async () => {
  try {
    console.log("fetching from db....");
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents.map((doc) => ({ id: doc.$id, ...doc }));
  } catch (error) {
    console.error("Error fetching notes from database:", error.message);
    throw new Error("Failed to fetch notes. Please try again.");
  }
};

//Add Note
export const addNoteToDB = async (note) => {
  try {
    console.log("Adding note to database...");

    const response = await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      note
    );

    return { id: response.$id, ...response };
  } catch (error) {
    console.error("Error adding note to database:", error.message);
    throw new Error(
      "Failed to add note. Please check your input and try again."
    );
  }
};

// ✅ Update Note with Validations and Error Handling
export const updateNoteInDB = async (id, note) => {
  try {
    if (!id || typeof id !== "string" || id.length > 36) {
      throw new Error(`Invalid note ID: ${id}`);
    }

    console.log(`Updating note with ID: ${id}`);

    const updatedNote = { title: note.title, content: note.content };

    const response = await database.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id,
      updatedNote
    );

    return { id: response.$id, ...response };
  } catch (error) {
    console.error(`Error updating note with ID ${id}:`, error.message);
    throw new Error("Failed to update note. Please try again.");
  }
};

export const deleteNoteFromDB = async (id) => {
  try {
    if (!id || typeof id !== "string" || id.length > 36) {
      throw new Error(`Invalid note ID: ${id}`);
    }

    console.log(`Deleting note with ID: ${id}`);

    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);

    return { success: true, id };
  } catch (error) {
    console.error(`Error deleting note with ID ${id}:`, error.message);
    throw new Error("Failed to delete note. Please try again.");
  }
};
