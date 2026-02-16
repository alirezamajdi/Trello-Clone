import { FC, ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "danger" | "success";
  children: ReactNode;
}

const Button: FC<IProps> = ({
  variant = "success",
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={`
        ${styles["button"]}
        ${styles["button--" + variant]}
        ${className ?? ""}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
