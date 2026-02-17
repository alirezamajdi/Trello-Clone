import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { useListStore } from "@/store/useListStore";
import { useBoardStorage } from "./useBoardStorage";
import { arrayMove } from "@dnd-kit/sortable";

export const useListReorder = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { lists, setLists } = useListStore();
  const { setAllLists } = useBoardStorage();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = lists.findIndex((l) => l.id === active.id);
    const newIndex = lists.findIndex((l) => l.id === over.id);

    const newLists = arrayMove(lists, oldIndex, newIndex).map((l, i) => ({
      ...l,
      level: i,
    }));

    setLists(newLists);
    setAllLists(newLists);
    setActiveId(null);
  };

  return { activeId, handleDragStart, handleDragEnd };
};
