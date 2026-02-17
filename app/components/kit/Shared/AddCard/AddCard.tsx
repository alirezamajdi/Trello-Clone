import React, { FC, Dispatch, SetStateAction, useEffect, useRef } from "react";
import styles from "./AddCard.module.scss";
import Textarea from "@/app/components/ui/Textarea/Textarea";
import Button from "@/app/components/ui/Button/Button";
import Close from "@/assets/icons/Close";
import { useAddCard } from "@/hooks/useAddCard";
import { useListStore } from "@/store/useListStore";
interface IProps {
  listId: number;
}
const AddCard: FC<IProps> = (props) => {
  const { listId } = props;
  const { onActiveAddCard } = useListStore();
  const { cardTitle, setCardTitle, handleAdd } = useAddCard(listId);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (cardTitle === "") {
      textareaRef.current?.focus();
    }
  }, [cardTitle]);

  return (
    <div className={styles["addCard"]}>
      <Textarea
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
        placeholder="Enter a card title..."
        ref={textareaRef}
      />
      <div>
        <Button onClick={handleAdd} variant="success">
          Create card
        </Button>
        <button
          className={styles["addCard-close"]}
          onClick={() => onActiveAddCard(null)}
        >
          <Close width="17" height="17" />
        </button>
      </div>
    </div>
  );
};

export default AddCard;
