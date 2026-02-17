import Ellipsis from "@/assets/icons/Ellipsis";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import styles from "./List.module.scss";

const ListAction = dynamic(() => import("./ListAction"), { ssr: false });

interface Props {
  title: string;
  id: number;
  dragHandleProps?: any;
}

export default function ListHeader({ title, id, dragHandleProps }: Props) {
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
}
