import React from "react";
import { SliderExtendedContext } from "../../SliderExtendedContext";
import clsx from "clsx";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import styles from "./styles/SliderExtendedTooltip.module.less";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Свойства компонента SliderExtendedTooltip. */
export interface ISliderExtendedTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
}

export const SliderExtendedTooltip: React.FC<ISliderExtendedTooltipProps> = ({
    value,
    children,
    ...htmlAttributes
}) => {
    const tooltipContentRef = React.useRef<HTMLDivElement | null>(null);
    const { min, max, size } = React.useContext(SliderExtendedContext);

    const calculateOffset = () => {
        if (!tooltipContentRef.current || value === undefined) {
            return 0;
        }

        const tipHalfWidth = 8;
        const offsetFromSide = 16;
        const contentWidth = tooltipContentRef.current?.clientWidth || 0;
        const normalizedValue = (value - min) / (max - min);

        return (contentWidth / 2 - tipHalfWidth - offsetFromSide) * (1 - 2 * normalizedValue);
    };

    return (
        <div
            ref={tooltipContentRef}
            className={clsx(styles.sliderExtendedTooltipOverlay, sizeToClassNameMap[size])}
            {...htmlAttributes}
        >
            {/* eslint-disable-next-line react-hooks/refs */}
            <div className={clsx(styles.tooltipBody)} style={{ left: `${calculateOffset()}px` }}>
                {children}
            </div>
            <div className={clsx(styles.tooltipTip)} />
        </div>
    );
};
