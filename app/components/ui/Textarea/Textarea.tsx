import React, { forwardRef } from "react";
import styles from "./Textarea.module.scss";

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
