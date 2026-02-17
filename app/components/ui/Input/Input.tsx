import React, { FC } from "react";
import styles from "./Input.module.scss";

const Input: FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return <input className={styles["input"]} {...props} />;
};

export default Input;
