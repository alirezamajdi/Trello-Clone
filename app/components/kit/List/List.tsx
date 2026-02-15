"use client";
import { FC, useRef, useState } from "react";
import styles from "./List.module.scss";
import Ellipsis from "@/assets/icons/Ellipsis";
import Card from "@/app/components/kit/Card/Card";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Action from "./Action";
interface IProps {
  title: string;
}
const List: FC<IProps> = (props) => {
  const actionRef = useRef(null);
  const [openAction, setOpenAction] = useState(false);

  useOnClickOutside(actionRef, () => setOpenAction(false));

  const { title } = props;

  return (
    <div className={styles["list"]}>
      <div className={styles["list__header"]}>
        <h2 className={styles["list__title"]}>{title}</h2>

        <div ref={actionRef} className="relative">
          <button onClick={() => setOpenAction(true)}>
            <Ellipsis width="20" height="20" />
          </button>

          {openAction && <Action setOpenAction={setOpenAction} />}
        </div>
      </div>
      <div className={styles["list__content"]}>
        {[...new Array(2)].map((item) => (
          <Card
            content="Create interview Kanban"
            comments={[{ date: "", comment: "" }]}
          />
        ))}
      </div>
      <button className={styles["list__footer"]}>+ Add another card</button>
    </div>
  );
};

export default List;
