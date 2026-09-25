import React from "react";
import clsx from "clsx";
import { StatusTrackerAlert } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerAlert";
import { StatusTrackerStatus } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerStatus";
import { StatusTrackerStatusGroup } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerStatusGroup";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";

/** Свойства компонента StatusTrackerBody. */
export interface IStatusTrackerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Содержимое блока: StatusTracker.Body.Status, .StatusGroup, .Alert. */
    children?: React.ReactNode;
}

/** Блок с основным контентом статус-трекера. */
export const StatusTrackerBody = Object.assign(
    React.forwardRef<HTMLDivElement, IStatusTrackerBodyProps>(function StatusTrackerBody(
        { children, className, ...restProps },
        ref,
    ) {
        return (
            <div className={clsx(styles.statusTrackerChild, className)} {...restProps} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Alert: StatusTrackerAlert,
        Status: StatusTrackerStatus,
        StatusGroup: StatusTrackerStatusGroup,
    },
);

StatusTrackerBody.displayName = "StatusTrackerBody";
