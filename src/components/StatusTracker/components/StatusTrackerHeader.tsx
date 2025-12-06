import React from "react";
import clsx from "clsx";
import { StatusTrackerDescription } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerDescription";
import { StatusTrackerTitle } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerTitle";
import { StatusTrackerSum } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerSum";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";

/** Свойства компонента StatusTrackerHeader. */
export interface IStatusTrackerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок заголовка статус-трекера. */
export const StatusTrackerHeader = Object.assign(
    React.forwardRef<HTMLDivElement, IStatusTrackerHeaderProps>(function StatusTrackerHeader(
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
        Title: StatusTrackerTitle,
        Sum: StatusTrackerSum,
        Description: StatusTrackerDescription,
    },
);

StatusTrackerHeader.displayName = "StatusTrackerHeader";
