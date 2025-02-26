import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  deleteNote,
  fetchNotes,
  updateNote,
} from "../redux/notesSlice";
import Loader from "./Loader";

const initialState = {
  title: "",
  content: "",
  date: "",
};

const Notes = () => {
  const [note, setNote] = useState(initialState);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes())
      //.unwrap() is used with Redux Toolkit's createAsyncThunk actions to handle errors more effectively.
      .unwrap()
      .then(() => {
        toast.success("Notes loaded successfully!");
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
        toast.error("Failed to load notes. Please try again.");
      });
  }, [dispatch]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ADD OR UPDATE NOTE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.warn("Please fill in all fields.");
      return;
    }

    const newNote = {
      ...note,
      date: new Date().toLocaleDateString(),
    };

    try {
      if (isEditing) {
        await dispatch(updateNote({ id: editId, note: newNote })).unwrap();
        toast.success("Note updated successfully!");
        setIsEditing(false);
        setEditId(null);
      } else {
        await dispatch(addNote(newNote)).unwrap();
        toast.success("Note added successfully!");
      }
      setNote(initialState);
      setIsExpanded(false);
    } catch (err) {
      console.error("Error saving note:", err);
      toast.error("Failed to save note. Please try again.");
    }
  };

  // HANDLE EDIT
  const handleEdit = (noteId) => {
    const noteToEdit = notes.find((note) => note.id === noteId);
    if (noteToEdit) {
      setNote(noteToEdit);
      setIsEditing(true);
      setEditId(noteId);
      setIsExpanded(true);
    } else {
      toast.error("Note not found.");
    }
  };

  // HANDLE DELETE
  const handleDelete = async (noteId) => {
    try {
      await dispatch(deleteNote(noteId)).unwrap();
      toast.success("Note deleted successfully!");
    } catch (err) {
      console.error("Error deleting note:", err);
      toast.error("Failed to delete note.");
    }
  };

  return (
    <main className="h-screen max-h-screen overflow-y-auto bg-indigo-800 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]">
      <NoteForm
        note={note}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      {loading ? (
        <div className="mx-auto mt-10 flex justify-center text-indigo-500">
          <Loader />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 mt-5">
          <p>⚠️ {error}</p>
        </div>
      ) : (
        <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </main>
  );
};

export default Notes;
