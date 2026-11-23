import React from "react";
import clsx from "clsx";
import styles from "./styles/Puller.module.less";

/** Свойства компонента PullerHeader. */
export interface IPullerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Кнопки действия в правой части шапки (например, PullerClose). */
    controlButtons?: React.ReactNode;
}

/** Шапка Puller. */
export const PullerHeader = React.forwardRef<HTMLDivElement, IPullerHeaderProps>(
    ({ children, className, controlButtons, ...restProps }, ref) => (
        <div className={clsx(styles.pullerHeader, className)} {...restProps} ref={ref}>
            <div className={styles.pullerHeaderContent}>{children}</div>
            <div className={styles.pullerHeaderControls}>{controlButtons}</div>
        </div>
    ),
);

PullerHeader.displayName = "PullerHeader";
