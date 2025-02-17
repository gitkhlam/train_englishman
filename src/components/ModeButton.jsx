import { useState } from "react";

export default function ModeButton({ onClick, children, isActive }) {

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-3xl font-medium  rounded-lg transition duration-500 cursor-pointer 
      ${isActive ? "bg-[#e5e5e5] text-black" : "text-white hover:bg-[rgb(237,237,237)] hover:text-black"}`}
    >
      {children}
    </button>
  );
}
