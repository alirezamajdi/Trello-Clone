import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";

interface Params {
  listId: number;
  lists: IList[];
  onUpdate: (lists: IList[]) => void;
}

export function useCardReorder({ listId, lists, onUpdate }: Params) {
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

    onUpdate(updatedLists);
  }

  return { handleDragEnd };
}
