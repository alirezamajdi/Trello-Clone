"use client";

import { useListStore } from "@/store/useListStore";
import { useState } from "react";
import { useBoardStorage } from "./useBoardStorage";

export const useAddCard = (listId: number) => {
  const [cardTitle, setCardTitle] = useState("");
  const { lists, setLists } = useListStore();
  const { setAllLists } = useBoardStorage();

  const handleAdd = () => {
    if (!cardTitle.trim()) return;
    let selectedList = lists.find((item) => item?.id == listId);
    let otherLists = lists.filter((item) => item.id !== listId);

    if (!selectedList) return; // exit if not found

    // Find max card id across all lists
    const allCards = lists.flatMap((l) => l.cards || []);
    const maxId =
      allCards.length > 0 ? Math.max(...allCards.map((c) => c.id)) : 0;

    const newCard = {
      title: cardTitle,
      comments: [],
      id: maxId + 1,
      level: selectedList.cards.length + 1,
    };

    if (selectedList.cards && selectedList.cards.length > 0) {
      selectedList.cards = [...selectedList.cards, newCard];
    } else {
      selectedList.cards = [newCard];
    }

    setLists([...otherLists, selectedList]);
    setAllLists([...otherLists, selectedList]);
    setCardTitle("");
  };

  return { handleAdd, setCardTitle, cardTitle };
};
