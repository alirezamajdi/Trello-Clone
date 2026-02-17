"use client";

import { FC, useState } from "react";
import styles from "./List.module.scss";
import { useListStore } from "@/store/useListStore";
import { useLists } from "@/hooks/useLists";

import ListHeader from "./ListHeader";
import ListCards from "./ListCards";
import AddCard from "../Shared/AddCard/AddCard";
import { useCardReorder } from "@/hooks/useCardReorder";

interface Props extends IList {
  dragHandleProps?: any;
}

const List: FC<Props> = ({ id, title, cards, dragHandleProps }) => {
  const [openAddCard, setOpenAddCard] = useState(false);
  const { lists, setLists } = useListStore();
  const { setAllLists } = useLists();

  const { handleDragEnd } = useCardReorder({
    listId: id,
    lists,
    onUpdate: (updated) => {
      setLists(updated);
      setAllLists(updated);
    },
  });

  return (
    <div className={styles["list"]}>
      <ListHeader id={id} title={title} dragHandleProps={dragHandleProps} />

      <ListCards cards={cards} listId={id} onDragEnd={handleDragEnd} />

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
