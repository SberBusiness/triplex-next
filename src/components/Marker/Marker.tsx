import clsx from "clsx";
import { EMarkerStatus } from "./enums";
import React from "react";
import { statusToClassNameMap } from "./utils";
import { Badge } from "../Badge";
import { IBadgeDotProps } from "../Badge/types";
import styles from "./styles/Marker.module.less";

export interface IMarkerProps extends IBadgeDotProps {
    status: EMarkerStatus;
}

export const Marker: React.FC<IMarkerProps> = ({ className, status, ...rest }) => (
    <Badge.Dot className={clsx(styles.marker, statusToClassNameMap[status], className)} {...rest} />
);

Marker.displayName = "Marker";
