import { useCardStore } from "@/store/useCardStore";
import Modal from "@/app/components/ui/Modal/Modal";
import styles from "./CommentsModal.module.scss";
import Textarea from "@/app/components/ui/Textarea/Textarea";
import Button from "@/app/components/ui/Button/Button";
import { useState } from "react";
import { useListStore } from "@/store/useListStore";
import { useBoardStorage } from "@/hooks/useBoardStorage";
import { toLocaleString } from "@/utils/helper";

const CommentsModal = () => {
  const { showComments, onShowComments } = useCardStore();
  const [comment, setComment] = useState("");
  const { lists, setLists } = useListStore();
  const { setAllLists } = useBoardStorage();

  const handleAddComment = () => {
    if (!showComments || !comment) return;

    const newLists = lists.map((list) => {
      if (list.id !== showComments.listId) return list;

      return {
        ...list,
        cards: list.cards.map((card) => {
          if (card.id !== showComments.cardId) return card;

          return {
            ...card,
            comments: [
              ...card.comments,
              {
                title: comment,
                date: new Date().toISOString(),
              },
            ],
          };
        }),
      };
    });
    setLists(newLists);
    setAllLists(newLists);
    setComment("");
  };

  const selectedList = lists.find((item) => item.id == showComments?.listId);
  const selectedCard = selectedList?.cards.find(
    (item) => item.id == showComments?.cardId,
  );

  const isEmpty = selectedCard?.comments?.length == 0;

  return (
    <Modal
      title={`Comments for "${selectedCard?.title}" `}
      isOpen={!!showComments}
      onClose={() => onShowComments(null)}
    >
      <div className={styles["commentsModal"]}>
        {isEmpty ? (
          <p className={styles["commentsModal__empty"]}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <ul>
            {selectedCard?.comments?.map((comment) => (
              <Comment key={comment.date} {...comment} />
            ))}
          </ul>
        )}
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <div className={styles["commentsModal__footer"]}>
          <Button variant="success" onClick={handleAddComment}>
            Add Comment
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CommentsModal;

const Comment = ({ title, date }: IComment) => {
  return (
    <li className={styles["comment"]}>
      <div className={styles["comment__header"]}>
        You: {toLocaleString(date)}
      </div>
      <div>{title}</div>
    </li>
  );
};
