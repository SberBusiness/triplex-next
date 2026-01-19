import React from "react";
import clsx from "clsx";
import styles from "./styles/LightBoxRightSidebar.module.less";

export interface ILightBoxRightSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер правой боковой панели. */
export const LightBoxRightSidebar: React.FC<ILightBoxRightSidebarProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div className={clsx(className, styles.lightBoxRightSidebar)} {...htmlDivAttributes}>
        <div className={styles.lightBoxRightSidebarInner}>{children}</div>
    </div>
);

LightBoxRightSidebar.displayName = "LightBoxRightSidebar";
