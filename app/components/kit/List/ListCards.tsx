"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableCard from "./ListSortableCard";
import styles from "./List.module.scss";

interface Props {
  cards: any[];
  listId: number;
  onDragEnd: any;
}

export default function ListCards({ cards, listId, onDragEnd }: Props) {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext
        items={cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles["list__content"]}>
          {cards.map((card) => (
            <SortableCard key={card.id} {...card} listId={listId} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
