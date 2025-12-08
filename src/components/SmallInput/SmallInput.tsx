import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента SmallInput. */
export interface ISmallInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/** Уменьшенное поле ввода, используется в HeaderPage. */
export const SmallInput = React.forwardRef<HTMLInputElement, ISmallInputProps>(({ className, ...rest }, ref) => (
    <input className={classnames("cssClass[smallInput]", className)} {...rest} type="text" ref={ref} />
));

SmallInput.displayName = "SmallInput";
