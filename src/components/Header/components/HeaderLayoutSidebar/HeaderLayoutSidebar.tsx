import React from "react";
import clsx from "clsx";
import { HeaderLayoutSidebarContent } from "./HeaderLayoutSidebarContent";
import { HeaderLayoutSidebarSidebar } from "./HeaderLayoutSidebarSidebar";
import styles from "../../styles/HeaderLayoutSidebar.module.less";

/** Свойства компонента HeaderLayoutSidebar. */
export interface IHeaderLayoutSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Layout для Header с sidebar. */
export const HeaderLayoutSidebar = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderLayoutSidebarProps>(function HeaderLayoutSidebar(
        { children, className, ...rest },
        ref,
    ) {
        return (
            <div className={clsx(styles.headerLayoutSidebar, className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Content: HeaderLayoutSidebarContent,
        Sidebar: HeaderLayoutSidebarSidebar,
    },
);

HeaderLayoutSidebar.displayName = "HeaderLayoutSidebar";
