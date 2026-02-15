"use client";
import React from "react";
import styles from "./Board.module.scss";
import List from "@/app/components/kit/List/List";
import AddList from "@/app/components/kit/AddList/AddList";

const Board = () => {
  return (
    <div className={styles["board"]}>
      <div className={styles["board__header"]}>
        <h1 className={styles["board__title"]}>Demo Board</h1>
      </div>
      <div className={styles["board__lists"]}>
        {[...new Array(4)].map((item) => (
          <List title="Todo" />
        ))}
        <AddList />
      </div>
    </div>
  );
};

export default Board;
