"use client";

import { useState } from "react";
import styles from "./Board.module.scss";
import List from "@/app/components/kit/List/List";
import AddList from "@/app/components/kit/AddList/AddList";
import { useCardStore } from "@/store/useCardStore";
import dynamic from "next/dynamic";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useListStore } from "@/store/useListStore";
import { useLists } from "@/hooks/useLists";

const CommentsModal = dynamic(
  () => import("@/app/components/kit/Modals/comments/CommentsModal"),
  { ssr: false },
);

function SortableList(props: IList) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1, 
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.listWrapper}>
      <List {...props} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  );
}

const Board = () => {
  const { showComments } = useCardStore();
  const { lists, setLists } = useListStore();
  const { setAllLists } = useLists();

  const [activeId, setActiveId] = useState<string | null>(null);

  const activeList = activeId ? lists.find((l) => l.id === +activeId) : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = lists.findIndex((l) => l.id === active.id);
      const newIndex = lists.findIndex((l) => l.id === over.id);

      const newLists = arrayMove(lists, oldIndex, newIndex);
      newLists.forEach((list, idx) => (list.level = idx));

      setLists(newLists);
      setAllLists(newLists);
    }

    setActiveId(null);
  };

  return (
    <>
      <div className={styles.board}>
        <div className={styles.board__header}>
          <h1 className={styles.board__title}>Demo Board</h1>
        </div>

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
          <div className={styles.board__lists}>
            <SortableContext
              items={lists.map((l) => l.id)}
              strategy={horizontalListSortingStrategy}
            >
              {lists
                .sort((a, b) => a.level - b.level)
                .map((list) => (
                  <SortableList key={list.id} {...list} />
                ))}
            </SortableContext>

            <AddList />
          </div>

          <DragOverlay>
            {activeList ? (
              <div className={styles.dragOverlay}>
                <List {...activeList} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {showComments && <CommentsModal />}
    </>
  );
};

export default Board;
