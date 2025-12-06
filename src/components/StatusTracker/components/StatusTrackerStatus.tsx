import React from "react";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";
import { IMarkerStatusProps, MarkerStatus } from "@sberbusiness/triplex-next/components/MarkerStatus";

/** Компонент статуса для блока с основным контентом статус-трекера. */
export const StatusTrackerStatus: React.FC<IMarkerStatusProps> = (props) => {
    const { children, className, ...rest } = props;

    return (
        <MarkerStatus className={clsx(styles.statusTrackerStatus, className)} {...rest}>
            {children}
        </MarkerStatus>
    );
};
