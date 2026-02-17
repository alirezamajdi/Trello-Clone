import React, { forwardRef } from "react";
import styles from "./Textarea.module.scss";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      ref={ref}
      className={`${styles["input"]} ${props.className}`}
      {...props}
    />
  );
});

export default Textarea;
