import React from "react";
import Note from "./Note";

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="mt-10 p-2 mx-auto w-[90%]">
      {notes.length === 0 ? (
        <p className="text-sm text-center text-indigo-100 font-semibold">
          No Notes Added
        </p>
      ) : (
        <div
          className={`gap-6 flex flex-wrap justify-center sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-col-4`}
        >
          {" "}
          {notes.map((noteItem) => (
            <Note
              key={noteItem.id}
              note={noteItem}
              onEdit={() => onEdit(noteItem.id)}
              onDelete={() => onDelete(noteItem.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
