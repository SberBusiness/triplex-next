import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetBody.module.less";

/** Свойства компонента IslandWidgetBody. */
export interface IIslandWidgetBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetBody: React.FC<IIslandWidgetBodyProps> = ({ children, className, ...htmlDivAttributes }) => {
    return (
        <div {...htmlDivAttributes} className={clsx(styles.islandWidgetBody, className)}>
            {children}
        </div>
    );
};

IslandWidgetBody.displayName = "IslandWidgetBody";
