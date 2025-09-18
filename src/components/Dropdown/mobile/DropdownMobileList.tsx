import React from "react";
import clsx from "clsx";
import styles from "../styles/DropdownMobile.module.less";

/** Свойства компонента DropdownMobileList. */
export interface IDropdownMobileListProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Список мобильной версии Dropdown. */
export const DropdownMobileList = React.forwardRef<HTMLDivElement, IDropdownMobileListProps>(
    ({ children, className, ...htmlAttributes }, ref) => (
        <div
            className={clsx(styles.dropdownMobileList, className)}
            ref={ref}
            role="listbox"
            {...htmlAttributes}
        >
            {children}
        </div>
    )
);

DropdownMobileList.displayName = "DropdownMobileList";
