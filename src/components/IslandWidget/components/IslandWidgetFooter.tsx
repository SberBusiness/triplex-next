import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetFooter.module.less";
import { IslandWidgetFooterContent } from "./IslandWidgetFooterContent";
import { IslandWidgetFooterControls } from "./IslandWidgetFooterControls";

/** Свойства компонента IslandWidgetFooter. */
export interface IIslandWidgetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export type TIslandWidgetFooter = React.FC<IIslandWidgetFooterProps> & {
    Content: typeof IslandWidgetFooterContent;
    Controls: typeof IslandWidgetFooterControls;
};

export const IslandWidgetFooter: TIslandWidgetFooter = ({ children, className, ...htmlDivAttributes }) => {
    return (
        <div {...htmlDivAttributes} className={clsx(className, styles.islandWidgetFooter)}>
            {children}
        </div>
    );
};

IslandWidgetFooter.Content = IslandWidgetFooterContent;
IslandWidgetFooter.Controls = IslandWidgetFooterControls;
IslandWidgetFooter.displayName = "IslandWidgetFooter";
