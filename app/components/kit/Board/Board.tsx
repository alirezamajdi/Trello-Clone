"use client";
import styles from "./Board.module.scss";
import List from "@/app/components/kit/List/List";
import { useCardStore } from "@/store/useCardStore";
import dynamic from "next/dynamic";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  MeasuringStrategy,
} from "@dnd-kit/core";

import { useListStore } from "@/store/useListStore";
import { useBoardDnd } from "@/hooks/useBoardDnd";
import Lists from "./BoardLists";
import BoardHeader from "./BoardHeader";

const CommentsModal = dynamic(
  () => import("@/app/components/kit/Modals/CommentsModal"),
  { ssr: false },
);

const Board = () => {
  const { showComments } = useCardStore();
  const { lists } = useListStore();
  const { activeId, handleDragStart, handleDragEnd } = useBoardDnd();

  const activeList = activeId ? lists.find((l) => l.id === +activeId) : null;

  return (
    <>
      <div className={styles.board}>
        <BoardHeader />

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
          <Lists />

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
