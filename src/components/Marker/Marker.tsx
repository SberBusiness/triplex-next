import React from "react";
import clsx from "clsx";
import { Badge } from "../Badge";
import { IBadgeDotProps } from "../Badge/types";
import { EMarkerStatus } from "./enums";
import { statusToClassNameMap } from "./utils";
import styles from "./styles/Marker.module.less";

/** Свойства компонента Marker. */
export interface IMarkerProps extends IBadgeDotProps {
    /** Статус, задающий цвет точки. Обязательный, значения по умолчанию нет. */
    status: EMarkerStatus;
}

/**
 * Точка-индикатор статуса.
 * Обёртка над Badge.Dot: добавляет цвет по статусу, всё остальное (размер, разметка, ref) — от Badge.Dot.
 * */
export const Marker = React.forwardRef<HTMLSpanElement, IMarkerProps>(({ className, status, ...restProps }, ref) => (
    <Badge.Dot className={clsx(styles.marker, statusToClassNameMap[status], className)} {...restProps} ref={ref} />
));

Marker.displayName = "Marker";
