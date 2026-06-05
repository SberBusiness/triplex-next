import React from "react";
import clsx from "clsx";
import { StatusTrackerAlert } from "./StatusTrackerAlert";
import { StatusTrackerStatus } from "./StatusTrackerStatus";
import { StatusTrackerStatusGroup } from "./StatusTrackerStatusGroup";
import styles from "../styles/StatusTracker.module.less";

/** Свойства компонента StatusTrackerBody. */
export interface IStatusTrackerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

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
