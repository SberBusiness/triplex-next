import React from "react";
import clsx from "clsx";
import styles from "./Button.module.less";

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(({ className, ...restProps }, ref) => {
    return <button className={clsx(styles.button, className)} {...restProps} ref={ref} />;
});

Button.displayName = "Button";
