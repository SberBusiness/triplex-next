import React from "react";
import clsx from "clsx";
import styles from "../styles/DropdownMobile.module.less";

/** Свойства компонента DropdownMobileFooter. */
export interface IDropdownMobileFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер мобильной версии Dropdown. */
export const DropdownMobileFooter = React.forwardRef<HTMLDivElement, IDropdownMobileFooterProps>(
    ({ children, className, ...htmlAttributes }, ref) => (
        <div className={clsx(styles.dropdownMobileFooter, className)} ref={ref} {...htmlAttributes}>
            {children}
        </div>
    )
);

DropdownMobileFooter.displayName = "DropdownMobileFooter";
