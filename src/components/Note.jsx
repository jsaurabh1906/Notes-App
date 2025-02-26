import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const Note = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 border-x-4 border-indigo-500 transition-transform duration-300 hover:shadow-lg hover:scale-105 max-w-sm w-full flex flex-col min-h-[120px]">
      <div className="flex flex-col flex-1">
        <h1 className="text-lg font-bold text-indigo-800 mb-2 break-words">
          {note.title}
        </h1>
        <p className="text-gray-700 text-sm mb-3 break-words">{note.content}</p>
      </div>
      <p className="text-gray-500 text-xs mb-4">{note.date}</p>

      {/* Button stays pinned at the bottom while allowing dynamic height */}
      <div className="mt-auto flex justify-between">
        <button
          onClick={onEdit}
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full transition-all duration-300 shadow"
        >
          <MdEdit />
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300 shadow"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Note;
