import clsx from "clsx";
import { EMarkerStatus } from "./enums";
import React from "react";
import styles from "./styles/Marker.module.less";
import { statusToClassNameMap } from "./utils";
import { EComponentSize } from "../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";

export interface IMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
    status: EMarkerStatus;
    size?: EComponentSize.MD | EComponentSize.LG;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

export const Marker: React.FC<IMarkerProps> = ({
    className,
    status,
    size = EComponentSize.MD,
    ...htmlDivAttributes
}) => {
    const classNames = clsx(styles.marker, sizeToClassNameMap[size], statusToClassNameMap[status], className);

    return <div className={classNames} {...htmlDivAttributes} />;
};

Marker.displayName = "Marker";
