import React from "react";
import clsx from "clsx";
import styles from "../../styles/HeaderLayoutSidebar.module.less";

/** Свойства компонента HeaderLayoutSidebarSidebar. */
export interface IHeaderLayoutSidebarSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Содержимое сайдбара. */
    children?: React.ReactNode;
}

/** Header sidebar. Скрывается на ширине экрана до 767px. */
export const HeaderLayoutSidebarSidebar = React.forwardRef<HTMLDivElement, IHeaderLayoutSidebarSidebarProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={clsx(styles.headerLayoutSidebarSidebar, className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

HeaderLayoutSidebarSidebar.displayName = "HeaderLayoutSidebarSidebar";
