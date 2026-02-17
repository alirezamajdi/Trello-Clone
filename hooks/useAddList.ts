"use client";

import { useState } from "react";
import { useBoardStorage } from "./useBoardStorage";

export const useAddList = () => {
  const [addListOpen, setAddListOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { addList } = useBoardStorage();

  const handleAdd = () => {
    if (!title.trim()) return;
    addList(title);
    setTitle("");
    setAddListOpen(false);
  };

  return { setAddListOpen, addListOpen, handleAdd, title, setTitle };
};
