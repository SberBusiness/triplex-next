import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetHeader.module.less";

/** Свойства компонента IslandWidgetHeaderDescription. */
interface IIslandWidgetHeaderDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetHeaderDescription: React.FC<IIslandWidgetHeaderDescriptionProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div {...htmlDivAttributes} className={clsx(styles.islandWidgetHeaderDescription, className)}>
        {children}
    </div>
);

IslandWidgetHeaderDescription.displayName = "IslandWidgetHeaderDescription";
