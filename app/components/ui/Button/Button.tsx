import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";

interface IProps {
  variant: "danger" | "success";
  onClick: () => void;
  children: ReactNode;
}
const Button: FC<IProps> = (props) => {
  const { variant, onClick, children } = props;
  return (
    <button
      onClick={onClick}
      className={`${styles["button"]} ${styles["button--" + variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
