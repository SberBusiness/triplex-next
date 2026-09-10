import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetFooter.module.less";

/** Свойства компонента IslandWidgetFooterControls. */
export interface IIslandWidgetFooterControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок управления подвала виджета — прижимается к правому краю, в адаптиве переносится на новую строку. */
export const IslandWidgetFooterControls: React.FC<IIslandWidgetFooterControlsProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div {...htmlDivAttributes} className={clsx(styles.islandWidgetFooterControls, className)}>
        {children}
    </div>
);

IslandWidgetFooterControls.displayName = "IslandWidgetFooterControls";
