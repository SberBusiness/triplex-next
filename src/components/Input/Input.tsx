import React from "react";
import clsx from "clsx";
import styles from "./Input.module.less";

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(({ className, ...restProps }, ref) => {
    return <input className={clsx(styles.input, className)} {...restProps} ref={ref} />;
});

Input.displayName = "Input";
