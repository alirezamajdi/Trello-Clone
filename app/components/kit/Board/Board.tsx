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
import { useListStore } from "@/store/useListStore";

const CommentsModal = dynamic(
  () => import("@/app/components/kit/Modals/comments/CommentsModal"),
  { ssr: false },
);

function SortableList(props: List) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: props?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <List {...props} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  );
}

const Board = () => {
  const { showComments } = useCardStore();
  const { lists, setLists } = useListStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = lists.findIndex((l) => l.id === active.id);
    const newIndex = lists.findIndex((l) => l.id === over.id);

    const newLists = arrayMove(lists, oldIndex, newIndex);

    setLists(newLists);
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
                <SortableList key={list.id} {...list} />
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
