import { useListStore } from "@/store/useListStore";
import { useLists } from "./useLists";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export const useCardReorder = () => {
  const { lists, setLists } = useListStore();
  const { setAllLists } = useLists();

  const reorderLists = (event: DragEndEvent) => {
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
  };

  return { reorderLists };
};
