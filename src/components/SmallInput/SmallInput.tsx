import React from "react";
import clsx from "clsx";
import styles from "./styles/SmallInput.module.less";

/** Свойства компонента SmallInput. */
export interface ISmallInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Компактное однострочное поле ввода высотой 20px без лейбла, статусов и обвязки FormField.
 * Рассчитано на инлайн-редактирование в плотной вёрстке — например, номера документа в DocumentNumberEdit.
 */
export const SmallInput = React.forwardRef<HTMLInputElement, ISmallInputProps>(({ className, ...rest }, ref) => (
    // type стоит после ...rest: компонент всегда рендерит текстовое поле, переданный извне type не применяется.
    <input className={clsx(styles.smallInput, className)} {...rest} type="text" ref={ref} />
));

SmallInput.displayName = "SmallInput";
