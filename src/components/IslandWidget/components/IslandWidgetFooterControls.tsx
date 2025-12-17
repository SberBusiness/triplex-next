import React from "react";
import styles from "../styles/IslandWidgetFooter.module.less";

interface IIslandWidgetFooterControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetFooterControls: React.FC<IIslandWidgetFooterControlsProps> = ({
    children,
    ...htmlDivAttributes
}) => (
    <div {...htmlDivAttributes} className={styles.islandWidgetFooterControls}>
        {children}
    </div>
);

IslandWidgetFooterControls.displayName = "IslandWidgetFooterControls";
