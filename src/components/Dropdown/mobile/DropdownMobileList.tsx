import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента DropdownMobileList. */
export interface IDropdownMobileListProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Список мобильной версии Dropdown. */
export const DropdownMobileList = React.forwardRef<HTMLDivElement, IDropdownMobileListProps>(
    ({ children, className, ...htmlAttributes }, ref) => (
        <div
            className={classnames("cssClass[dropdownMobileList]", className)}
            ref={ref}
            role="listbox"
            {...htmlAttributes}
        >
            {children}
        </div>
    )
);

DropdownMobileList.displayName = "DropdownMobileList";
