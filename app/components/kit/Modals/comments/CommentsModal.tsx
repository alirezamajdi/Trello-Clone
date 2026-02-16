import { useCardStore } from "@/store/useCardStore";
import Modal from "@/app/components/ui/Modal/Modal";
import styles from "./CommentsModal.module.scss";
import Textarea from "@/app/components/ui/Textarea/Textarea";
import Button from "@/app/components/ui/Button/Button";

const CommentsModal = () => {
  const { showComments, onShowComments, comments } = useCardStore();
  const isEmpty = comments.length == 0;

  return (
    <Modal
      title='Comments for "Review Drag & Drop"'
      isOpen={!!showComments}
      onClose={() => onShowComments(null)}
    >
      <div className={styles["commentsModal"]}>
        {!isEmpty ? (
          <p className={styles["commentsModal__empty"]}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <ul>
            <Comment />
          </ul>
        )}
        <Textarea placeholder="Write a comment..." />
        <div className={styles["commentsModal__footer"]}>
          <Button variant="success" onClick={() => {}}>
            Add Comment
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CommentsModal;

const Comment = () => {
  return (
    <li className={styles["comment"]}>
      <div className={styles["comment__header"]}>
        You . 2/16/2026, 1:13:40 PM
      </div>
      <div>This is test</div>
    </li>
  );
};
