import React from "react";
import clsx from "clsx";
import styles from "./styles/SmallInput.module.less";

/** Свойства компонента SmallInput. */
export interface ISmallInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/** Уменьшенное поле ввода, используется в HeaderPage. */
export const SmallInput = React.forwardRef<HTMLInputElement, ISmallInputProps>(({ className, ...rest }, ref) => (
    <input className={clsx(styles.smallInput, className)} {...rest} type="text" ref={ref} />
));

SmallInput.displayName = "SmallInput";
