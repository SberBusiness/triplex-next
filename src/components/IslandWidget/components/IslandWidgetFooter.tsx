import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetFooter.module.less";

/** Свойства компонента IslandWidgetFooter. */
export interface IIslandWidgetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetFooter: React.FC<IIslandWidgetFooterProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div {...htmlDivAttributes} className={clsx(className, styles.islandWidgetFooter)}>
        {children}
    </div>
);

IslandWidgetFooter.displayName = "IslandWidgetFooter";
