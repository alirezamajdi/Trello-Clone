import styles from "./Board.module.scss";

const BoardHeader = () => {
  return (
    <div className={styles.board__header}>
      <h1 className={styles.board__title}>Demo Board</h1>
    </div>
  );
};

export default BoardHeader;
