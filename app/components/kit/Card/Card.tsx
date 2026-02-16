import { FC } from "react";
import styles from "./Card.module.scss";
import { useCardStore } from "@/store/useCardStore";

interface IProps {
  content: string;
  comments: IComment[];
  id: number;
  listId: number;
}
const Card: FC<IProps> = (props) => {
  const { comments, content, id, listId } = props;
  const { onShowComments } = useCardStore();

  return (
    <div className={styles["card"]}>
      <h3 className={styles["card__content"]}>{content}</h3>
      <div className={styles["card__footer"]}>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onShowComments({ listId: listId, cardId: id })}
          className={styles["card__button"]}
        >
          Comments ({comments.length})
        </button>
      </div>
    </div>
  );
};

export default Card;
