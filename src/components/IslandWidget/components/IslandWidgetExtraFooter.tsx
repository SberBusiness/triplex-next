import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetExtraFooter.module.less";
import { ExpandAnimation } from "../../ExpandAnimation/ExpandAnimation";
import { IslandWidgetContext } from "../IslandWidgetContext";

/** Свойства компонента IslandWidgetExtraFooter. */
export interface IIslandWidgetExtraFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    open?: boolean;
}

export const IslandWidgetExtraFooter: React.FC<IIslandWidgetExtraFooterProps> = ({
    children,
    className,
    open = false,
    ...htmlDivAttributes
}) => {
    const { setHasExtraFooter } = useContext(IslandWidgetContext);

    useEffect(() => {
        setHasExtraFooter(open);
    }, [open]);

    return (
        <div {...htmlDivAttributes} className={clsx(className, styles.islandWidgetExtraFooter)}>
            <ExpandAnimation expanded={open}>{children}</ExpandAnimation>
        </div>
    );
};

IslandWidgetExtraFooter.displayName = "IslandWidgetExtraFooter";
