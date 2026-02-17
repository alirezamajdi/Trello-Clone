import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { useCardReorder } from "./useListReorder";

export const useBoardDnd = () => {
  const { reorderLists } = useCardReorder();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    reorderLists(event);
    setActiveId(null);
  };

  return { activeId, handleDragStart, handleDragEnd };
};
