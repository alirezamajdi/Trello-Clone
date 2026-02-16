"use client";

import styles from "./Board.module.scss";
import List from "@/app/components/kit/List/List";
import AddList from "@/app/components/kit/AddList/AddList";
import { useCardStore } from "@/store/useCardStore";
import dynamic from "next/dynamic";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const CommentsModal = dynamic(
  () => import("@/app/components/kit/Modals/comments/CommentsModal"),
  { ssr: false },
);

function SortableList({ id, title }: { id: string; title: string }) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <List
        id={id}
        title={title}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

const Board = () => {
  const { showComments } = useCardStore();

  // Replace static array with state
  const [lists, setLists] = useState([
    { id: "1", title: "Todo" },
    { id: "2", title: "In Progress" },
    { id: "3", title: "Review" },
    { id: "4", title: "Done" },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setLists((prev) => {
      const oldIndex = prev.findIndex((l) => l.id === active.id);
      const newIndex = prev.findIndex((l) => l.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <>
      <div className={styles["board"]}>
        <div className={styles["board__header"]}>
          <h1 className={styles["board__title"]}>Demo Board</h1>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className={styles["board__lists"]}>
            <SortableContext
              items={lists.map((l) => l.id)}
              strategy={horizontalListSortingStrategy}
            >
              {lists.map((list) => (
                <SortableList key={list.id} id={list.id} title={list.title} />
              ))}
            </SortableContext>
            <AddList />
          </div>
        </DndContext>
      </div>

      {showComments && <CommentsModal />}
    </>
  );
};

export default Board;
