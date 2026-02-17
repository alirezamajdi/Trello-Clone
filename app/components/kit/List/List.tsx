"use client";

import { FC, useState } from "react";
import styles from "./List.module.scss";
import ListHeader from "./ListHeader";
import ListContent from "./ListContent";
import AddCard from "../Shared/AddCard/AddCard";
import { useCardReorder } from "@/hooks/useCardReorder";

interface Props extends IList {
  dragHandleProps?: any;
}

const List: FC<Props> = ({ id, title, cards, dragHandleProps }) => {
  const [openAddCard, setOpenAddCard] = useState(false);
  
  return (
    <div className={styles["list"]}>
      <ListHeader id={id} title={title} dragHandleProps={dragHandleProps} />
      <ListContent cards={cards} listId={id} />

      {openAddCard ? (
        <AddCard listId={id} setOpenAddCard={setOpenAddCard} />
      ) : (
        <button
          onClick={() => setOpenAddCard(true)}
          className={styles["list__footer"]}
        >
          + Add another card
        </button>
      )}
    </div>
  );
};

export default List;

