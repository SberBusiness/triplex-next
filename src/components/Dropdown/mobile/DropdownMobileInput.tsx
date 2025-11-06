import React from "react";
import clsx from "clsx";
import styles from "../styles/DropdownMobileInput.module.less";

/** Свойства компонента DropdownMobileInput. */
export interface IDropdownMobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/** Поле ввода мобильной версии Dropdown. */
export const DropdownMobileInput = React.forwardRef<HTMLInputElement, IDropdownMobileInputProps>(
    ({ className, ...rest }, ref) => (
        <input className={clsx(styles.dropdownMobileInput, className)} {...rest} ref={ref} />
    ),
);

DropdownMobileInput.displayName = "DropdownMobileInput";
