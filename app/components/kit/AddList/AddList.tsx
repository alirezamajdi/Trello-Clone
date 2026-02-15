"use client";
import { FC, useState } from "react";
import styles from "./AddList.module.scss";
import Input from "@/app/components/ui/Input/Input";
import Button from "@/app/components/ui/Button/Button";
import Close from "@/assets/icons/Close";

interface IProps {}
const AddList: FC<IProps> = (props) => {
  const [addList, setAddList] = useState(false);
  const handleAdd = () => {};
  return (
    <div className={styles["addList"]}>
      {addList ? (
        <div className={styles["addList__form"]}>
          <Input placeholder="Enter a list title..." />
          <div>
            <Button onClick={handleAdd} variant="success">
              Add list
            </Button>
            <button
              className={styles["addList__form-close"]}
              onClick={() => setAddList(false)}
            >
              <Close width="17" height="17" />
            </button>
          </div>
        </div>
      ) : (
        <button
          className={styles["addList__button"]}
          onClick={() => setAddList(true)}
        >
          + Add another list
        </button>
      )}
    </div>
  );
};

export default AddList;
