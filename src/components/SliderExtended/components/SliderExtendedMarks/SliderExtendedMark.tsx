import React from "react";
import { SliderExtendedContext } from "../../SliderExtendedContext";
import { SliderExtendedMarkActions } from "./SliderExtendedMarkActions";
import clsx from "clsx";
import styles from "./styles/SliderExtendedMarks.module.less";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Свойства компонента SliderExtendedMark. */
export interface ISliderExtendedMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
    value: number;
}

/** Компонент SliderExtendedMark. */
export const SliderExtendedMark: React.FC<ISliderExtendedMarkProps> = ({
    children,
    className,
    value,
    ...htmlSpanAttributes
}) => {
    const { disabled, dots, min, max, reverse, size } = React.useContext(SliderExtendedContext);

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
            style={SliderExtendedMarkActions.getStyle({ max, min, reverse, value })}
        >
            <span
                className={clsx(styles.sliderExtendedMarkDot, {
                    [styles.inSelectedRange]: SliderExtendedMarkActions.isInSelectedRange({ dots, min, value }),
                })}
                onClick={handleClick}
            />
            <Text className={clsx(styles.sliderExtendedMarkText)} size={textSize} onClick={handleClick}>
                {children}
            </Text>
        </span>
    );
};

SliderExtendedMark.displayName = "SliderExtendedMark";
