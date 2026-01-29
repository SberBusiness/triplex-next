import React from "react";
import clsx from "clsx";
import styles from "./styles/LightBoxLeftSidebar.module.less";

export interface ILightBoxLeftSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    fixed?: boolean;
}

/** Контейнер левой боковой панели. */
export const LightBoxLeftSidebar: React.FC<ILightBoxLeftSidebarProps> = ({
    children,
    className,
    fixed = false,
    ...htmlDivAttributes
}) => (
    <div className={clsx(className, styles.lightBoxLeftSidebar, { [styles.fixed]: fixed })} {...htmlDivAttributes}>
        <div className={styles.lightBoxLeftSidebarInner}>{children}</div>
    </div>
);

LightBoxLeftSidebar.displayName = "LightBoxLeftSidebar";
