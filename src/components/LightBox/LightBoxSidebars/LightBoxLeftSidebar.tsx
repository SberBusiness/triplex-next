import React from "react";
import clsx from "clsx";
import styles from "./styles/LightBoxLeftSidebar.module.less";

export interface ILightBoxLeftSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер левой боковой панели. */
export const LightBoxLeftSidebar: React.FC<ILightBoxLeftSidebarProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div className={clsx(className, styles.lightBoxLeftSidebar)} {...htmlDivAttributes}>
        <div className={styles.lightBoxLeftSidebarInner}>{children}</div>
    </div>
);

LightBoxLeftSidebar.displayName = "LightBoxLeftSidebar";
