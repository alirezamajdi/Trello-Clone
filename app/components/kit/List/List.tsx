"use client";
import { FC, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./List.module.scss";
import Ellipsis from "@/assets/icons/Ellipsis";
import Card from "@/app/components/kit/Card/Card";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import AddCard from "@/app/components/kit/AddCard/AddCard";

const Action = dynamic(() => import("./Action"), {
  ssr: false,
});

interface IProps {
  title: string;
  id: string;
}

const List: FC<IProps> = (props) => {
  const { title, id } = props;
  const actionRef = useRef(null);
  const [openAction, setOpenAction] = useState(false);
  const [openAddCard, setOpenAddCard] = useState(false);

  useOnClickOutside(actionRef, () => setOpenAction(false));

  return (
    <>
      <div className={styles["list"]}>
        <div className={styles["list__header"]}>
          <h2 className={styles["list__title"]}>{title}</h2>

          <div ref={actionRef} className="relative">
            <button onClick={() => setOpenAction(true)}>
              <Ellipsis width="20" height="20" />
            </button>

            {openAction && <Action setOpenAction={setOpenAction} />}
          </div>
        </div>

        <div className={styles["list__content"]}>
          {[...new Array(2)].map((_, index) => (
            <Card
              listId={id}
              id={String(index)}
              key={index}
              content="Create interview Kanban"
              comments={[{ date: "", comment: "" }]}
            />
          ))}
        </div>

        {openAddCard ? (
          <AddCard setOpenAddCard={setOpenAddCard} />
        ) : (
          <button
            onClick={() => setOpenAddCard(true)}
            className={styles["list__footer"]}
          >
            + Add another card
          </button>
        )}
      </div>
    </>
  );
};

export default List;
