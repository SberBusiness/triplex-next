import React from "react";
import clsx from "clsx";
import styles from "./styles/SliderExtendedMarks.module.less";

/** Свойства компонента SliderExtendedMarks. */
export interface ISliderExtendedMarksProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Компонент SliderExtendedMarks — контейнер меток под полосой слайдера.
 * Содержимое — набор SliderExtended.Mark; первая и последняя метки прижимаются к краям полосы.
 */
export const SliderExtendedMarks = React.forwardRef<HTMLDivElement, ISliderExtendedMarksProps>(
    ({ className, ...htmlDivAttributes }, ref) => (
        <div className={clsx(styles.sliderExtendedMarks, className)} {...htmlDivAttributes} ref={ref} />
    ),
);

SliderExtendedMarks.displayName = "SliderExtendedMarks";
