"use client";

import { useEffect } from "react";

const InputController = ({ onChar, onDelete, onEnter, isOver }) => {
  useEffect(() => {
    if (isOver) {
      return;
    }
    const listener = (e) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const key = e.key.toUpperCase();
        if (key.length === 1 && key >= "A" && key <= "Z") {
          onChar(key);
        }
      }
    };

    if (!isOver) {
      window.addEventListener("keyup", listener);
    }

    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onDelete, onChar, onEnter]);
};

export default InputController;
