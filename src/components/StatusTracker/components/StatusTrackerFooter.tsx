import React from "react";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";
import { StatusTrackerDescription } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerDescription";
import { StatusTrackerButton } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerButton";

/** Свойства компонента StatusTrackerFooter. */
export interface IStatusTrackerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок с набором кнопок для взаимодействия с документом в статус-трекере. */
export const StatusTrackerFooter = Object.assign(
    React.forwardRef<HTMLDivElement, IStatusTrackerFooterProps>(function StatusTrackerFooter(
        { children, className, ...rest },
        ref,
    ) {
        return (
            <div
                className={clsx(styles.statusTrackerChild, styles.statusTrackerFooterWrapper, className)}
                {...rest}
                ref={ref}
            >
                {children}
            </div>
        );
    }),
    {
        Button: StatusTrackerButton,
        Description: StatusTrackerDescription,
    },
);

StatusTrackerFooter.displayName = "StatusTrackerFooter";
