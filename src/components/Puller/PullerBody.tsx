import React from "react";
import clsx from "clsx";
import styles from "./styles/Puller.module.less";

/** Свойства компонента PullerBody. */
export interface IPullerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Скроллируемое тело Puller. */
export const PullerBody = React.forwardRef<HTMLDivElement, IPullerBodyProps>(
    ({ children, className, ...restProps }, ref) => (
        <div className={clsx(styles.pullerBody, className)} {...restProps} ref={ref}>
            {children}
        </div>
    ),
);

PullerBody.displayName = "PullerBody";
