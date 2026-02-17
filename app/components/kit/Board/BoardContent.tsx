"use client";
import styles from "./Board.module.scss";
import AddList from "@/app/components/kit/Shared/AddList/AddList";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useListStore } from "@/store/useListStore";
import BoardSortableList from "./BoardSortableList";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { useListReorder } from "@/hooks/useListReorder";
import List from "../List/List";

const BoardContent = () => {
  const { lists } = useListStore();
  const { activeId, handleDragStart, handleDragEnd } = useListReorder();

  const activeList = activeId ? lists.find((l) => l.id === +activeId) : null;

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
      <div className={styles.board__lists}>
        <SortableContext
          items={lists.map((l) => l.id)}
          strategy={horizontalListSortingStrategy}
        >
          {lists
            .sort((a, b) => a.level - b.level)
            .map((list) => (
              <BoardSortableList key={list.id} {...list} />
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
  );
};

export default BoardContent;
