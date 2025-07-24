import React from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}


export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(({ className, ...restProps }, ref) => {
    return <button className={clsx(styles.button, className)} ref={ref} {...restProps} />;
});

Button.displayName = "Button";
