import React from "react";
import clsx from "clsx";
import styles from "../../styles/HeaderLayoutSidebar.module.less";

/** Свойства компонента HeaderLayoutSidebarContent. */
export interface IHeaderLayoutSidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок контента для Header с sidebar. */
export const HeaderLayoutSidebarContent = React.forwardRef<HTMLDivElement, IHeaderLayoutSidebarContentProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={clsx(styles.headerLayoutSidebarContent, className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

HeaderLayoutSidebarContent.displayName = "HeaderLayoutSidebarContent";
