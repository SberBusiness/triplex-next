import React from "react";
import clsx from "clsx";
import { HeaderLayoutSidebarContent } from "./HeaderLayoutSidebarContent";
import { HeaderLayoutSidebarSidebar } from "./HeaderLayoutSidebarSidebar";
import styles from "../../styles/HeaderLayoutSidebar.module.less";

/** Свойства компонента HeaderLayoutSidebar. */
export interface IHeaderLayoutSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Содержимое раскладки. Обычно составные HeaderLayoutSidebar.Content и HeaderLayoutSidebar.Sidebar. */
    children?: React.ReactNode;
}

/**
 * Layout для Header с sidebar. Раскладывает `HeaderLayoutSidebar.Content`
 * и `HeaderLayoutSidebar.Sidebar` в строку; на ширине экрана до 767px sidebar скрывается.
 */
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
