import React from "react";
import clsx from "clsx";
import styles from "../styles/DropdownMobile.module.less";

/** Свойства компонента DropdownMobileHeader. */
export interface IDropdownMobileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Кнопка закрытия мобильной версии Dropdown. */
    closeButton?: () => JSX.Element;
}

/** Заголовок мобильной версии Dropdown. */
export const DropdownMobileHeader = React.forwardRef<HTMLDivElement, IDropdownMobileHeaderProps>(
    ({ children, className, closeButton, ...htmlAttributes }, ref) => (
        <div className={clsx(styles.dropdownMobileHeader, className)} ref={ref} {...htmlAttributes}>
            {children}
            {closeButton?.()}
        </div>
    )
);

DropdownMobileHeader.displayName = "DropdownMobileHeader";
