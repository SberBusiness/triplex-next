import React, { useCallback, useContext, useState } from "react";
import clsx from "clsx";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { SliderExtendedContext } from "../../SliderExtendedContext";
import { setForwardedRef } from "../../utils";
import styles from "./styles/SliderExtendedTooltip.module.less";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Половина ширины уголка тултипа, px. */
const TIP_HALF_WIDTH = 8;

/** Минимальный отступ тултипа от края полосы слайдера, px. */
const OFFSET_FROM_SIDE = 16;

/**
 * Возвращает сдвиг тела тултипа по горизонтали, px.
 * У краёв полосы тултип сдвигается к центру, чтобы не выходить за её границы, в середине сдвиг равен нулю.
 */
const getTooltipBodyOffset = ({
    contentWidth,
    max,
    min,
    value,
}: {
    contentWidth: number;
    max: number;
    min: number;
    value?: number;
}): number => {
    if (value === undefined || max === min) {
        return 0;
    }

    const normalizedValue = (value - min) / (max - min);

    return (contentWidth / 2 - TIP_HALF_WIDTH - OFFSET_FROM_SIDE) * (1 - 2 * normalizedValue);
};

/** Свойства компонента SliderExtendedTooltip. */
export interface ISliderExtendedTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Значение позиции ползунка, над которым показан тултип. Нужно для сдвига тултипа у краёв полосы. */
    value?: number;
}

/**
 * Компонент SliderExtendedTooltip — подсказка над ползунком.
 * Рендерится внутри SliderExtended.Dot и видима, пока ползунок в фокусе или под курсором.
 */
export const SliderExtendedTooltip = React.forwardRef<HTMLDivElement, ISliderExtendedTooltipProps>(
    ({ children, className, value, ...htmlDivAttributes }, ref) => {
        // Узел тултипа в состоянии, а не в ref: его ширина нужна во время рендера для расчёта сдвига.
        const [contentNode, setContentNode] = useState<HTMLDivElement | null>(null);
        const { min, max, size } = useContext(SliderExtendedContext);

        const setRef = useCallback(
            (instance: HTMLDivElement | null) => {
                setContentNode(instance);
                setForwardedRef(ref, instance);
            },
            [ref],
        );

        const offset = getTooltipBodyOffset({ contentWidth: contentNode?.clientWidth ?? 0, max, min, value });

        return (
            <div
                className={clsx(styles.sliderExtendedTooltipOverlay, sizeToClassNameMap[size], className)}
                {...htmlDivAttributes}
                ref={setRef}
            >
                <div className={styles.tooltipBody} style={{ left: `${offset}px` }}>
                    {children}
                </div>
                <div className={styles.tooltipTip} />
            </div>
        );
    },
);

SliderExtendedTooltip.displayName = "SliderExtendedTooltip";
