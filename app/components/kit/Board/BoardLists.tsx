"use client";
import styles from "./Board.module.scss";
import AddList from "@/app/components/kit/Shared/AddList/AddList";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useListStore } from "@/store/useListStore";
import BoardSortableList from "./BoardSortableList";

const Lists = () => {
  const { lists } = useListStore();

  return (
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
  );
};

export default Lists;
