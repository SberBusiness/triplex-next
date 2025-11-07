import React from "react";
import clsx from "clsx";
import styles from "./styles/Ellipsis.module.less";

export interface IEllipsisProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Количество строк, после которых происходит сворачивание в многоточие. */
    maxLines: number;
}
export const Ellipsis = React.forwardRef<HTMLDivElement, IEllipsisProps>(
    ({ children, maxLines, className, ...rest }, ref) => {
        const classNames = clsx(styles.ellipsisLineClamp, { [styles.oneLine]: maxLines === 1 }, className);

        return (
            <div
                className={classNames}
                style={{ "--ellipsis-line-clamp": maxLines } as React.CSSProperties}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                {children}
            </div>
        );
    },
);

Ellipsis.displayName = "Ellipsis";
