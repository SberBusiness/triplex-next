import React from "react";
import clsx from "clsx";
import styles from "./styles/PullerInput.module.less";

/** Свойства компонента PullerInput. */
export interface IPullerInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/** Поле ввода для шапки Puller. */
export const PullerInput = React.forwardRef<HTMLInputElement, IPullerInputProps>(({ className, ...restProps }, ref) => (
    <input className={clsx(styles.pullerInput, className)} {...restProps} ref={ref} />
));

PullerInput.displayName = "PullerInput";
