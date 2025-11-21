import React from "react";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTracker.module.less";

/** Свойства компонента StatusTrackerMedia. */
export interface StatusTrackerMediaProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер для иконки StatusTracker. */
export const StatusTrackerMedia: React.FC<StatusTrackerMediaProps> = (props) => {
    const { children, className, ...rest } = props;

    return (
        <div className={clsx(styles.statusTrackerChild, className)} {...rest}>
            {children}
        </div>
    );
};
