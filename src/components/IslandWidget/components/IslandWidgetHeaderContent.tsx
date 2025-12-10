import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetHeader.module.less";

/** Свойства компонента IslandWidgetHeaderContent. */
interface IIslandWidgetHeaderContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetHeaderContent: React.FC<IIslandWidgetHeaderContentProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div {...htmlDivAttributes} className={clsx(styles.islandWidgetHeaderContent, className)}>
        {children}
    </div>
);

IslandWidgetHeaderContent.displayName = "IslandWidgetHeaderContent";
