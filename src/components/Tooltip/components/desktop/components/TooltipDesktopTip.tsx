import React from "react";
import { ETooltipDirection } from "@sberbusiness/triplex-next/components/Tooltip/enums";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/Tooltip/styles/TooltipDesktop.module.less";

/** Свойства компонента TooltipDesktopTip. */
interface ITooltipDesktopTipProps {
    /** Направление, на которое смотрит указатель "стрелочки" (треугольника). */
    direction: ETooltipDirection;
    /** Дочерние элементы. */
    children?: never;
}

/** Компонент "стрелочка" (треугольник) Tooltip'а. */
export const TooltipDesktopTip = React.forwardRef<HTMLDivElement, ITooltipDesktopTipProps>((props, ref) => {
    const { direction } = props;

    let directionClass;

    switch (direction) {
        case ETooltipDirection.UP:
            directionClass = styles.up;
            break;
        case ETooltipDirection.DOWN:
            directionClass = styles.down;
            break;
        case ETooltipDirection.LEFT:
            directionClass = styles.left;
            break;
        case ETooltipDirection.RIGHT:
            directionClass = styles.right;
            break;
    }

    return <div className={clsx(styles.tooltipDesktopTip, directionClass)} ref={ref} />;
});

TooltipDesktopTip.displayName = "TooltipDesktopTip";
