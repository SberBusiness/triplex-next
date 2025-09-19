import React from "react";
import clsx from "clsx";
import styles from "../../styles/HeaderSubheader.module.less";

/** Свойства компонента HeaderSubheader. */
export interface IHeaderSubheaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Свойство отключающее padding. */
    withoutPaddings?: boolean;
}

/** Третий уровень Header. Содержит в себе произвольный контент. */
export const HeaderSubheader = React.forwardRef<HTMLDivElement, IHeaderSubheaderProps>(
    ({ children, className, withoutPaddings, ...rest }, ref) => (
        <div
            className={clsx(styles.headerSubheader, { [styles.withoutPaddings]: Boolean(withoutPaddings) }, className)}
            {...rest}
            ref={ref}
        >
            {children}
        </div>
    ),
);

HeaderSubheader.displayName = "HeaderSubheader";
