import React, { FC, Dispatch, SetStateAction } from "react";
import styles from "./AddCard.module.scss";
import Textarea from "@/app/components/ui/Textarea/Textarea";
import Button from "@/app/components/ui/Button/Button";
import Close from "@/assets/icons/Close";

interface IProps {
  setOpenAddCard: Dispatch<SetStateAction<boolean>>;
}
const AddCard: FC<IProps> = (props) => {
  const { setOpenAddCard } = props;
  const handleAdd = () => {};
  return (
    <div className={styles["addCard"]}>
      <Textarea placeholder="Enter a card title..." />
      <div>
        <Button onClick={handleAdd} variant="success">
          Create card
        </Button>
        <button
          className={styles["addCard-close"]}
          onClick={() => setOpenAddCard(false)}
        >
          <Close width="17" height="17" />
        </button>
      </div>
    </div>
  );
};

export default AddCard;
