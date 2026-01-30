import React from "react";
import clsx from "clsx";
import styles from "./styles/LightBoxRightSidebar.module.less";

export interface ILightBoxRightSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    fixed?: boolean;
}

/** Контейнер правой боковой панели. */
export const LightBoxRightSidebar: React.FC<ILightBoxRightSidebarProps> = ({
    children,
    className,
    fixed,
    ...htmlDivAttributes
}) => (
    <div className={clsx(className, styles.lightBoxRightSidebar, { [styles.fixed]: fixed })} {...htmlDivAttributes}>
        <div className={styles.lightBoxRightSidebarInner}>{children}</div>
    </div>
);

LightBoxRightSidebar.displayName = "LightBoxRightSidebar";
