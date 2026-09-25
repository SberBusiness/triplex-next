import React from "react";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/StatusTracker/styles/StatusTrackerStatusGroup.module.less";

/** Свойства компонента StatusTrackerStatusGroup. */
export interface IStatusTrackerStatusGroup extends React.HTMLAttributes<HTMLDivElement> {
    /** Список статусов: StatusTracker.Body.Status. */
    children?: React.ReactNode;
}

/**
 * Контейнер для группировки StatusTrackerStatus.
 * Выстраивает статусы в колонку и центрирует блок целиком, оставляя подписи выровненными по левому краю.
 */
export const StatusTrackerStatusGroup = React.forwardRef<HTMLDivElement, IStatusTrackerStatusGroup>(
    function StatusTrackerStatusGroup({ children, className, ...restProps }, ref) {
        return (
            <div className={clsx(styles.statusTrackerStatusGroup, className)} {...restProps} ref={ref}>
                {children}
            </div>
        );
    },
);

StatusTrackerStatusGroup.displayName = "StatusTrackerStatusGroup";
