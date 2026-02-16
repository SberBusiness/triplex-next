import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetExtraFooter.module.less";
import { ExpandAnimation } from "../../ExpandAnimation/ExpandAnimation";
import { IslandWidgetLayoutContext } from "../IslandWidgetLayoutContext";

/** Свойства компонента IslandWidgetExtraFooter. */
export interface IIslandWidgetExtraFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Контролируемое состояние открытости. */
    open?: boolean;
}

export const IslandWidgetExtraFooter: React.FC<IIslandWidgetExtraFooterProps> = ({
    children,
    className,
    open = false,
    ...htmlDivAttributes
}) => {
    const { setHasExtraFooter } = useContext(IslandWidgetLayoutContext);

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
