import React, { useContext } from "react";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { SliderExtendedContext } from "../../SliderExtendedContext";
import { SliderExtendedMarkActions } from "./SliderExtendedMarkActions";
import styles from "./styles/SliderExtendedMarks.module.less";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Свойства компонента SliderExtendedMark. */
export interface ISliderExtendedMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Значение, на котором стоит метка. Должно быть в диапазоне от min до max. */
    value: number;
}

/**
 * Компонент SliderExtendedMark — метка под полосой слайдера.
 * Клик по метке перемещает ближайший SliderExtended.Dot на её значение.
 */
export const SliderExtendedMark = React.forwardRef<HTMLSpanElement, ISliderExtendedMarkProps>(
    ({ children, className, style, value, ...htmlSpanAttributes }, ref) => {
        const { disabled, dots, min, max, reverse, size } = useContext(SliderExtendedContext);

        const handleClick = () => SliderExtendedMarkActions.moveNearestDot({ dots, value });
        const textSize = size === EComponentSize.LG ? ETextSize.B3 : ETextSize.B4;

        return (
            <span
                className={clsx(styles.sliderExtendedMark, sizeToClassNameMap[size], className, {
                    // Одна из SliderExtended.Dot, находится на текущей позиции.
                    [styles.active]: SliderExtendedMarkActions.isActive({ dots, value }) && !disabled,
                    [styles.disabled]: disabled,
                    [styles.reverse]: reverse,
                })}
                {...htmlSpanAttributes}
                style={{ ...style, ...SliderExtendedMarkActions.getStyle({ max, min, reverse, value }) }}
                ref={ref}
            >
                <span
                    className={clsx(styles.sliderExtendedMarkDot, {
                        [styles.inSelectedRange]: SliderExtendedMarkActions.isInSelectedRange({ dots, min, value }),
                    })}
                    onClick={handleClick}
                />
                <Text className={styles.sliderExtendedMarkText} size={textSize} onClick={handleClick}>
                    {children}
                </Text>
            </span>
        );
    },
);

SliderExtendedMark.displayName = "SliderExtendedMark";
