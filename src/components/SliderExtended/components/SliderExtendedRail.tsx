import React, { useCallback, useContext } from "react";
import clsx from "clsx";
import { SliderExtendedContext } from "../SliderExtendedContext";
import { SliderExtendedUtils } from "../SliderExtendedUtils";
import { setForwardedRef } from "../utils";
import styles from "../styles/SliderExtended.module.less";

/** Свойства компонента SliderExtendedRail. */
export interface ISliderExtendedRailProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value"> {
    /** Полоса слайдера не имеет содержимого. */
    children?: never;
}

/**
 * Компонент полосы SliderExtended. Клик по полосе перемещает ближайший SliderExtended.Dot
 * на ближайший к курсору шаг.
 */
export const SliderExtendedRail = React.forwardRef<HTMLDivElement, ISliderExtendedRailProps>(
    ({ className, onClick, ...htmlDivAttributes }, ref) => {
        const { dots, railNode, reverse, setRailNode, steps } = useContext(SliderExtendedContext);

        /** Сохраняет узел полосы в контексте слайдера и пробрасывает его во внешний ref. */
        const setRef = useCallback(
            (instance: HTMLDivElement | null) => {
                setRailNode(instance);
                setForwardedRef(ref, instance);
            },
            [ref, setRailNode],
        );

        const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
            if (railNode) {
                let normalizedValue = SliderExtendedUtils.getNormalizedCursorValue({
                    cursorXPosition: event.clientX,
                    railNode,
                });

                if (reverse) {
                    normalizedValue = 100 - normalizedValue;
                }

                // Ближайшая точка остановки на полосе.
                const nearestStep = SliderExtendedUtils.getNearestStep({ normalizedValue, steps });
                // Ближайший Dot.
                const nearestDot = SliderExtendedUtils.getNearestDotByValue({ dots, value: nearestStep.value });

                nearestDot?.changeValue(nearestStep.value);
            }

            onClick?.(event);
        };

        return (
            <div
                className={clsx(styles.sliderExtendedRail, className)}
                {...htmlDivAttributes}
                onClick={handleClick}
                ref={setRef}
            />
        );
    },
);

SliderExtendedRail.displayName = "SliderExtendedRail";
