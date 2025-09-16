import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента DropdownMobileFooter. */
export interface IDropdownMobileFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер мобильной версии Dropdown. */
export const DropdownMobileFooter = React.forwardRef<HTMLDivElement, IDropdownMobileFooterProps>(
    ({ children, className, ...htmlAttributes }, ref) => (
        <div className={classnames("cssClass[dropdownMobileFooter]", className)} ref={ref} {...htmlAttributes}>
            {children}
        </div>
    )
);

DropdownMobileFooter.displayName = "DropdownMobileFooter";
