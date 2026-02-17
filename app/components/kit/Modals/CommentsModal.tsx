import { useCardStore } from "@/store/useCardStore";
import Modal from "@/app/components/ui/Modal/Modal";
import styles from "./CommentsModal.module.scss";
import Textarea from "@/app/components/ui/Textarea/Textarea";
import Button from "@/app/components/ui/Button/Button";
import { useListStore } from "@/store/useListStore";
import { toLocaleString } from "@/utils/helper";
import { useAddComment } from "@/hooks/useAddComment";

const CommentsModal = () => {
  const { showComments, onShowComments } = useCardStore();
  const { lists } = useListStore();
  const { handleAddComment, comment, setComment } = useAddComment();

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
