import React from "react";
import clsx from "clsx";
import styles from "../styles/StatusTrackerStatusGroup.module.less";

/** Свойства компонента StatusTrackerStatusGroup. */
export interface IStatusTrackerStatusGroup extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер для группировки StatusTrackerStatus. */
export const StatusTrackerStatusGroup = React.forwardRef<HTMLDivElement, IStatusTrackerStatusGroup>(
    ({ children, className, ...restProps }, ref) => (
        <div className={clsx(styles.statusTrackerStatusGroup, className)} {...restProps} ref={ref}>
            {children}
        </div>
    ),
);

StatusTrackerStatusGroup.displayName = "StatusTrackerStatusGroup";
