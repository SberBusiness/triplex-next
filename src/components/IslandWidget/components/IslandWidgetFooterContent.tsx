import React from "react";
import styles from "../styles/IslandWidgetFooter.module.less";

interface IIslandWidgetFooterContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetFooterContent: React.FC<IIslandWidgetFooterContentProps> = ({
    children,
    ...htmlDivAttributes
}) => (
    <div {...htmlDivAttributes} className={styles.islandWidgetFooterContent}>
        {children}
    </div>
);

IslandWidgetFooterContent.displayName = "IslandWidgetFooterContent";
