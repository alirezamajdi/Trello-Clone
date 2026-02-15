import { FC } from "react";
import styles from "./Card.module.scss";

interface IProps {
  content: string;
  comments: { date: string; comment: string }[];
}
const Card: FC<IProps> = (props) => {
  const { comments, content } = props;
  return (
    <div className={styles["card"]}>
      <h3 className={styles["card__content"]}>{content}</h3>
      <div className={styles["card__footer"]}>
        <button className={`btn ${styles["card__button"]} `}>
          Comments ({comments.length})
        </button>
      </div>
    </div>
  );
};

export default Card;
