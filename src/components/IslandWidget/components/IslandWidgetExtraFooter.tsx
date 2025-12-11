import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetExtraFooter.module.less";
import { ExpandAnimation } from "../../ExpandAnimation/ExpandAnimation";

/** Свойства компонента IslandWidgetExtraFooter. */
export interface IIslandWidgetExtraFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    open?: boolean;
}

export const IslandWidgetExtraFooter: React.FC<IIslandWidgetExtraFooterProps> = ({
    children,
    className,
    open = false,
    ...htmlDivAttributes
}) => (
    <div {...htmlDivAttributes} className={clsx(className, styles.islandWidgetExtraFooter)}>
        <ExpandAnimation expanded={open}>{children}</ExpandAnimation>
    </div>
);

IslandWidgetExtraFooter.displayName = "IslandWidgetExtraFooter";
