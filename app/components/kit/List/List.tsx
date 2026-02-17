"use client";

import { FC, useState } from "react";
import styles from "./List.module.scss";
import ListHeader from "./ListHeader";
import ListContent from "./ListContent";
import AddCard from "../Shared/AddCard/AddCard";
import { useListStore } from "@/store/useListStore";
interface Props extends IList {
  dragHandleProps?: any;
}

const List: FC<Props> = ({ id, title, cards, dragHandleProps }) => {
  const { activeAddCard, onActiveAddCard } = useListStore();

  return (
    <div className={styles["list"]}>
      <ListHeader id={id} title={title} dragHandleProps={dragHandleProps} />
      <ListContent cards={cards} listId={id} />

      {activeAddCard === +id ? (
        <AddCard listId={id} />
      ) : (
        <button
          onClick={() => onActiveAddCard(id)}
          className={styles["list__footer"]}
        >
          + Add another card
        </button>
      )}
    </div>
  );
};

export default List;
