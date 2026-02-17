import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";

interface Params {
  listId: number;
  lists: IList[];
  onUpdate: (lists: IList[]) => void;
}

export function useCardReorder({ listId, lists, onUpdate }: Params) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const selectedList = lists.find((l) => l.id === listId);
    if (!selectedList) return;

    const oldIndex = selectedList.cards.findIndex((c) => c.id === active.id);
    const newIndex = selectedList.cards.findIndex((c) => c.id === over.id);

    if (oldIndex < 0 || newIndex < 0) return;

    const reordered = arrayMove(selectedList.cards, oldIndex, newIndex).map(
      (card, index) => ({
        ...card,
        level: index,
      }),
    );

    const updatedLists = lists.map((l) =>
      l.id === listId ? { ...l, cards: reordered } : l,
    );
    setActiveId(null);
    onUpdate(updatedLists);
  }

  return { handleDragEnd, handleDragStart, activeId };
}
