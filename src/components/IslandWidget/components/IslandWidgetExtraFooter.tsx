import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetFooter.module.less";

/** Свойства компонента IslandWidgetExtraFooter. */
export interface IIslandWidgetExtraFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetExtraFooter: React.FC<IIslandWidgetExtraFooterProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div {...htmlDivAttributes} className={clsx(className, styles.islandWidgetExtraFooter)}>
        {children}
    </div>
);

IslandWidgetExtraFooter.displayName = "IslandWidgetExtraFooter";
