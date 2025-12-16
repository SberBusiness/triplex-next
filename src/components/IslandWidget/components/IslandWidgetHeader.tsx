import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetHeader.module.less";
import { IslandWidgetHeaderContent } from "./IslandWidgetHeaderContent";
import { IslandWidgetHeaderDescription } from "./IslandWidgetHeaderDescription";

/** Свойства компонента IslandWidgetHeader. */
export interface IIslandWidgetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export type TIslandWidgetHeader = React.FC<IIslandWidgetHeaderProps> & {
    Content: typeof IslandWidgetHeaderContent;
    Description: typeof IslandWidgetHeaderDescription;
};

export const IslandWidgetHeader: TIslandWidgetHeader = ({ children, className, ...htmlDivAttributes }) => (
    <div {...htmlDivAttributes} className={clsx(className, styles.islandWidgetHeader)}>
        {children}
    </div>
);

IslandWidgetHeader.Content = IslandWidgetHeaderContent;
IslandWidgetHeader.Description = IslandWidgetHeaderDescription;
IslandWidgetHeader.displayName = "IslandWidgetHeader";
