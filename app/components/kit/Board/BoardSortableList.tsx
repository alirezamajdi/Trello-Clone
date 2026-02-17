"use client";
import styles from "./Board.module.scss";
import List from "@/app/components/kit/List/List";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";

const BoardSortableList: FC<IList> = (props) => {
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
};

export default BoardSortableList;
