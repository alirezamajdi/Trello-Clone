"use client";
import styles from "./Board.module.scss";
import { useCardStore } from "@/store/useCardStore";
import dynamic from "next/dynamic";
import BoardContent from "./BoardContent";
import BoardHeader from "./BoardHeader";

const CommentsModal = dynamic(
  () => import("@/app/components/kit/Modals/CommentsModal"),
  { ssr: false },
);

const Board = () => {
  const { showComments } = useCardStore();

  return (
    <>
      <div className={styles["board"]}>
        <BoardHeader />
        <BoardContent />
      </div>

      {showComments && <CommentsModal />}
    </>
  );
};

export default Board;
