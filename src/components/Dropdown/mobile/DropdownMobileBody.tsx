import React from "react";
import clsx from "clsx";
import styles from "../styles/DropdownMobile.module.less";
/** Свойства компонента DropdownMobileBody. */
export interface IDropdownMobileBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Тело мобильной версии Dropdown. */
export const DropdownMobileBody = React.forwardRef<HTMLDivElement, IDropdownMobileBodyProps>(
    ({ children, className, ...htmlAttributes }, ref) => (
        <div className={clsx(styles.dropdownMobileContent, className)} ref={ref} {...htmlAttributes}>
            {children}
        </div>
    ),
);

DropdownMobileBody.displayName = "DropdownMobileBody";
