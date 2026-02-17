"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableCard from "./ListSortableCard";
import styles from "./List.module.scss";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { useListStore } from "@/store/useListStore";
import { useLists } from "@/hooks/useLists";
import { useCardReorder } from "@/hooks/useCardReorder";
import Card from "@/app/components/kit/Card/Card";

interface Props {
  cards: any[];
  listId: number;
}

export default function ListContent({ cards, listId }: Props) {
  const { lists, setLists } = useListStore();
  const { setAllLists } = useLists();
  const { handleDragEnd, handleDragStart, activeId } = useCardReorder({
    listId: listId,
    lists,
    onUpdate: (updated) => {
      setLists(updated);
      setAllLists(updated);
    },
  });

  const activeList = activeId ? lists.find((l) => l.id === +listId) : null;
  const activeCard = activeId
    ? activeList?.cards?.find((x) => x.id === +activeId)
    : null;

  return (
    <DndContext
      collisionDetection={closestCenter}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles["list__content"]}>
          {cards.map((card) => (
            <SortableCard key={card.id} {...card} listId={listId} />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className={styles.dragOverlay}>
              <Card {...activeCard} />
            </div>
          ) : null}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
}
