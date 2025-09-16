import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента DropdownMobileBody. */
export interface IDropdownMobileBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Тело мобильной версии Dropdown. */
export const DropdownMobileBody = React.forwardRef<HTMLDivElement, IDropdownMobileBodyProps>(
    ({ children, className, ...htmlAttributes }, ref) => (
        <div className={classnames("cssClass[dropdownMobileContent]", className)} ref={ref} {...htmlAttributes}>
            {children}
        </div>
    )
);

DropdownMobileBody.displayName = "DropdownMobileBody";
