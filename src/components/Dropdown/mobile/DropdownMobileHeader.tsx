import React from "react";
import clsx from "clsx";
import { IDropdownMobileHeaderProps } from "@sberbusiness/triplex-next/components/Tooltip/types";
import styles from "../styles/DropdownMobile.module.less";

/** Заголовок мобильной версии Dropdown. */
export const DropdownMobileHeader = React.forwardRef<HTMLDivElement, IDropdownMobileHeaderProps>(
    ({ children, className, closeButton, ...htmlAttributes }, ref) => (
        <div className={clsx(styles.dropdownMobileHeader, className)} {...htmlAttributes} ref={ref}>
            {children}
            {closeButton?.()}
        </div>
    ),
);

DropdownMobileHeader.displayName = "DropdownMobileHeader";
