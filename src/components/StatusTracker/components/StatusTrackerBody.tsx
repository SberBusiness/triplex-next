import React from "react";
import clsx from "clsx";
import { StatusTrackerStatus } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerStatus";
import { StatusTrackerAlert } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerAlert";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";

/** Свойства компонента StatusTrackerBody. */
export interface IStatusTrackerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок с основным контентом статус-трекера. */
export const StatusTrackerBody = Object.assign(
    React.forwardRef<HTMLDivElement, IStatusTrackerBodyProps>(function StatusTrackerBody(
        { children, className, ...rest },
        ref,
    ) {
        return (
            <div className={clsx(styles.statusTrackerChild, className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Alert: StatusTrackerAlert,
        Status: StatusTrackerStatus,
    },
);

StatusTrackerBody.displayName = "StatusTrackerBody";
