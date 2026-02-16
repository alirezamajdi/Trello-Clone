"use client";
import styles from "./Board.module.scss";
import List from "@/app/components/kit/List/List";
import AddList from "@/app/components/kit/AddList/AddList";
import { useCardStore } from "@/store/useCardStore";
import dynamic from "next/dynamic";

const CommentsModal = dynamic(
  () => import("@/app/components/kit/Modals/comments/CommentsModal"),
  {
    ssr: false,
  },
);

const Board = () => {
  const { showComments } = useCardStore();
  return (
    <>
      <div className={styles["board"]}>
        <div className={styles["board__header"]}>
          <h1 className={styles["board__title"]}>Demo Board</h1>
        </div>
        <div className={styles["board__lists"]}>
          {[...new Array(4)].map((item, i) => (
            <List title="Todo" id={i.toString()} />
          ))}
          <AddList />
        </div>
      </div>
      {showComments && <CommentsModal />}
    </>
  );
};

export default Board;
