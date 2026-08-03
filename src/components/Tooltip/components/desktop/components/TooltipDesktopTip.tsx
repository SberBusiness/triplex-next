import React from "react";
import { ETooltipDirection } from "@sberbusiness/triplex-next/components/Tooltip/enums";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/Tooltip/styles/TooltipDesktop.module.less";

/** Класс модификатора для каждого направления указателя. */
const DIRECTION_CLASS_NAMES: Record<ETooltipDirection, string> = {
    [ETooltipDirection.UP]: styles.up,
    [ETooltipDirection.DOWN]: styles.down,
    [ETooltipDirection.LEFT]: styles.left,
    [ETooltipDirection.RIGHT]: styles.right,
};

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

    return <div className={clsx(styles.tooltipDesktopTip, DIRECTION_CLASS_NAMES[direction])} ref={ref} />;
});

TooltipDesktopTip.displayName = "TooltipDesktopTip";
