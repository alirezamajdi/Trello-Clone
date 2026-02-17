import Ellipsis from "@/assets/icons/Ellipsis";
import { FC, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import styles from "./List.module.scss";

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

  useOnClickOutside(actionRef, () => setOpenAction(false));

  return (
    <div className={styles["list__header"]} {...dragHandleProps}>
      <h2 className={styles["list__title"]}>{title}</h2>

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
