import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetFooter.module.less";

/** Свойства компонента IslandWidgetFooterContent. */
export interface IIslandWidgetFooterContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Содержимое подвала виджета — занимает свободное место слева от блока управления. */
export const IslandWidgetFooterContent: React.FC<IIslandWidgetFooterContentProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div {...htmlDivAttributes} className={clsx(styles.islandWidgetFooterContent, className)}>
        {children}
    </div>
);

IslandWidgetFooterContent.displayName = "IslandWidgetFooterContent";
