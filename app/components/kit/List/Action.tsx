"use client";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Close from "@/assets/icons/Close";
import Left from "@/assets/icons/Left";
import styles from "./List.module.scss";
import Button from "@/app/components/ui/Button/Button";

interface IProps {
  setOpenAction: Dispatch<SetStateAction<boolean>>;
}
const Action: FC<IProps> = (props) => {
  const { setOpenAction } = props;
  const [actionState, setActionState] = useState<
    "delete-all-cards" | "delete-list" | null
  >(null);
  return (
    <div className={styles["list__action"]}>
      <div className={styles["list__action-header"]}>
        <button onClick={() => setActionState(null)}>
          {actionState && <Left width="20" height="20" fill="#6b778c" />}
        </button>
        <h3>
          {actionState ? actionState.split("-").join(" ") : " List Actions"}
        </h3>
        <button onClick={() => setOpenAction(false)}>
          <Close width="18" height="18" fill="#6b778c" />
        </button>
      </div>
      <div className={styles["list__action-content"]}>
        {actionState && (
          <div className={styles["list__action-subContent"]}>
            {actionState == "delete-list" && (
              <>
                <p>
                  All actions will be removed from the activity feed and you
                  won’t be able to re-open the list. There is no undo.
                </p>
                <Button onClick={() => {}} variant="danger">
                  Delete list
                </Button>
              </>
            )}
            {actionState == "delete-all-cards" && (
              <>
                <p>
                  This will remove all the cards in this list from the board.
                </p>
                <Button onClick={() => {}} variant="danger">
                  Delete all
                </Button>
              </>
            )}
          </div>
        )}
        {!actionState && (
          <ul>
            <li>
              <button
                onClick={() => setActionState("delete-list")}
                className={styles["list__action-item"]}
              >
                Delete List
              </button>
            </li>
            <li>
              <button
                onClick={() => setActionState("delete-all-cards")}
                className={styles["list__action-item"]}
              >
                Delete All Cards
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Action;
