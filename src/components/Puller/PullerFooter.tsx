import React from "react";
import clsx from "clsx";
import styles from "./styles/Puller.module.less";

/** Свойства компонента PullerFooter. */
export interface IPullerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер Puller. */
export const PullerFooter = React.forwardRef<HTMLDivElement, IPullerFooterProps>(
    ({ children, className, ...restProps }, ref) => (
        <div className={clsx(styles.pullerFooter, className)} {...restProps} ref={ref}>
            {children}
        </div>
    ),
);

PullerFooter.displayName = "PullerFooter";
