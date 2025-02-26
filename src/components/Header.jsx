import React from "react";
import { MdNoteAlt } from "react-icons/md";

const Header = () => {
  return (
    <header className="bg-indigo-500 text-white px-8 py-4 flex items-center">
      <h1 className="flex items-center text-2xl font-bold gap-2 font-[McLaren,cursive]">
        <MdNoteAlt />
        Notes
      </h1>
    </header>
  );
};

export default Header;
