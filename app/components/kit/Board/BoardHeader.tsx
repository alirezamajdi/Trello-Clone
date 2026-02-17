import { useBoardStorage } from "@/hooks/useBoardStorage";
import styles from "./Board.module.scss";
import { useEffect, useRef, useState } from "react";

const BoardHeader = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { setBoardTitle, title, setTitle } = useBoardStorage();

  const spanRef: any = useRef(null);
  const inputRef: any = useRef(null);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      inputRef.current.style.width = spanRef.current.offsetWidth + 18 + "px";
    }
  }, [title, isEdit]);

  const handleBlur = () => {
    setBoardTitle(title);
    setIsEdit(false);
  };

  return (
    <div className={styles["board__header"]}>
      {!isEdit ? (
        <h1
          className={styles["board__title"]}
          onClick={() => setIsEdit(!isEdit)}
        >
          {title}
        </h1>
      ) : (
        <div>
          <input
            ref={inputRef}
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            className={styles["board__header-input"]}
          />
          <span ref={spanRef} className={styles["board__header-hiddenSpan"]}>
            {title}
          </span>
        </div>
      )}
    </div>
  );
};

export default BoardHeader;
