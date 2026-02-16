import React from "react";
import styles from "./Textarea.module.scss";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Input: React.FC<IProps> = ({ ...props }) => {
  return (
    <textarea className={`${styles["input"]} ${props.className}`} {...props} />
  );
};

export default Input;
