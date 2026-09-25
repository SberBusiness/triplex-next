import React from "react";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";

/** Свойства компонента StatusTrackerMedia. */
export interface StatusTrackerMediaProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Содержимое блока: как правило, статусная иконка размера 84. */
    children?: React.ReactNode;
}

/** Контейнер для иконки StatusTracker. */
export const StatusTrackerMedia = React.forwardRef<HTMLDivElement, StatusTrackerMediaProps>(function StatusTrackerMedia(
    { children, className, ...rest },
    ref,
) {
    return (
        <div className={clsx(styles.statusTrackerChild, className)} {...rest} ref={ref}>
            {children}
        </div>
    );
});

StatusTrackerMedia.displayName = "StatusTrackerMedia";
