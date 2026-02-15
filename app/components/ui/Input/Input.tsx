import React from "react";
import styles from "./Input.module.scss";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
const Input = ({ ...props }) => {
  return <input className={styles["input"]} {...props} />;
};

export default Input;
