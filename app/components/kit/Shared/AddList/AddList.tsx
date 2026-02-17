"use client";
import { FC } from "react";
import styles from "./AddList.module.scss";
import Input from "@/app/components/ui/Input/Input";
import Button from "@/app/components/ui/Button/Button";
import Close from "@/assets/icons/Close";
import { useAddList } from "@/hooks/useAddList";

const AddList: FC = () => {
  const { setAddListOpen, addListOpen, handleAdd, title, setTitle } =
    useAddList();

  return (
    <div className={styles["addList"]}>
      {addListOpen ? (
        <div className={styles["addList__form"]}>
          <Input
            placeholder="Enter a list title..."
            value={title}
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <div>
            <Button onClick={handleAdd} variant="success">
              Add list
            </Button>
            <button
              className={styles["addList__form-close"]}
              onClick={() => setAddListOpen(false)}
            >
              <Close width="17" height="17" />
            </button>
          </div>
        </div>
      ) : (
        <button
          className={styles["addList__button"]}
          onClick={() => setAddListOpen(true)}
        >
          + Add another list
        </button>
      )}
    </div>
  );
};

export default AddList;
