import React from "react";
import clsx from "clsx";
import styles from "./styles/SliderExtendedMarks.module.less";

export interface ISliderExtendedMarksProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Компонент SliderExtendedMarks.
 */
export const SliderExtendedMarks: React.FC<ISliderExtendedMarksProps> = ({ className, ...htmlDivAttributes }) => (
    <div className={clsx(styles.sliderExtendedMarks, className)} {...htmlDivAttributes} />
);

SliderExtendedMarks.displayName = "SliderExtendedMarks";
