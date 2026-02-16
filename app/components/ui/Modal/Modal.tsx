"use client";
import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import Close from "@/assets/icons/Close";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: FC<IProps> = (props) => {
  const { isOpen, onClose, children, title } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className={styles["modal"]} onClick={onClose}>
      <div
        className={styles["modal__inner"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["modal__header"]}>
          <h4>{title}</h4>
          <button onClick={onClose}>
            <Close width="18" height="18" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};
export default Modal;
