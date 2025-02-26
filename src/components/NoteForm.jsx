import React from "react";
import { MdAdd, MdEdit } from "react-icons/md";

const NoteForm = ({
  note,
  handleChange,
  handleSubmit,
  isEditing,
  isExpanded,
  setIsExpanded,
}) => {
  return (
    <div className="bg-white/70 p-6 rounded-md shadow-lg mx-auto w-[90%] max-w-[600px] mt-10">
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
        <input
          name="title"
          value={note.title}
          placeholder="Title"
          onChange={handleChange}
          className={`text-md text-indigo-900 font-semibold tracking-wide px-4 outline-none border-b-2 border-indigo-500 transition-all duration-300 ease-in-out
  ${
    isExpanded
      ? "block h-10 opacity-100 translate-y-0"
      : "hidden h-0 opacity-0 -translate-y-2"
  }`}
        />

        <textarea
          name="content"
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 5 : 1}
          onClick={() => setIsExpanded(true)}
          onChange={handleChange}
          className="text-md text-indigo-900 font-semibold tracking-wide px-4 py-2 rounded-md outline-none transition-all duration-300 ease-in-out resize-none"
        />

        <div className="absolute -bottom-11 right-5">
          {isExpanded && (
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-bold p-3 mx-auto rounded-full mt-2 transition-colors duration-300"
            >
              {isEditing ? <MdEdit /> : <MdAdd />}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
