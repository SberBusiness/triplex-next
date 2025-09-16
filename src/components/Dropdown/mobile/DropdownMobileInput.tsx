import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента DropdownMobileInput. */
export interface IDropdownMobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/** Поле ввода мобильной версии Dropdown. */
export const DropdownMobileInput = React.forwardRef<HTMLInputElement, IDropdownMobileInputProps>(
    ({ className, ...rest }, ref) => (
        <input className={classnames("cssClass[dropdownMobileInput]", className)} {...rest} ref={ref} />
    )
);

DropdownMobileInput.displayName = "DropdownMobileInput";
