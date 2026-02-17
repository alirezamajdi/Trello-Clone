import Ellipsis from "@/assets/icons/Ellipsis";
import { FC, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import styles from "./List.module.scss";
import { useListStore } from "@/store/useListStore";
import { useBoardStorage } from "@/hooks/useBoardStorage";

const ListAction = dynamic(() => import("./ListAction"), { ssr: false });

interface IProps {
  title: string;
  id: number;
  dragHandleProps?: any;
}

const ListHeader: FC<IProps> = (props) => {
  const { title, id, dragHandleProps } = props;
  const actionRef = useRef(null);
  const [openAction, setOpenAction] = useState(false);
  const [customTitle, setCustomTitle] = useState(title);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const { lists } = useListStore();
  const { setAllLists } = useBoardStorage();

  useOnClickOutside(actionRef, () => setOpenAction(false));

  const handleBlur = () => {
    const newLists = lists.map((list) => {
      if (list.id !== id) return list;

      return {
        ...list,
        title: customTitle,
      };
    });
    setAllLists(newLists);
    setIsEditTitle(false);
  };

  return (
    <div className={styles["list__header"]} {...dragHandleProps}>
      {isEditTitle ? (
        <input
          value={customTitle}
          autoFocus
          onChange={(e) => setCustomTitle(e.target.value)}
          onBlur={handleBlur}
          className={styles["list__header-input"]}
        />
      ) : (
        <h2
          className={styles["list__title"]}
          onClick={() => setIsEditTitle(true)}
        >
          {customTitle}
        </h2>
      )}

      <div ref={actionRef} className="relative">
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setOpenAction(true)}
        >
          <Ellipsis width="20" height="20" />
        </button>

        {openAction && <ListAction id={id} setOpenAction={setOpenAction} />}
      </div>
    </div>
  );
};
export default ListHeader;
