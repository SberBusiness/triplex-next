import clsx from "clsx";
import { EMarkerStatus, EMarkerSize } from "./enums";
import React from "react";
import styles from "./styles/Marker.module.less";
import { markerSizeToClassNameMap, statusToClassNameMap } from "./utils";

export interface IMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
    status: EMarkerStatus;
    size?: EMarkerSize;
}

export const Marker: React.FC<IMarkerProps> = ({ className, status, size = EMarkerSize.MD, ...htmlDivAttributes }) => {
    const classNames = clsx(
        styles.marker,
        markerSizeToClassNameMap[size](styles),
        statusToClassNameMap[status](styles),
        className,
    );

    return <div className={classNames} {...htmlDivAttributes} />;
};

Marker.displayName = "Marker";
