import React from "react";
import clsx from "clsx";
import styles from "./styles/Ellipsis.module.less";

export interface IEllipsisProps extends React.HTMLProps<HTMLDivElement> {
    /** Текст, который нужно свернуть в многоточие. */
    children: React.ReactNode;
    /** Количество строк, после которых происходит сворачивание в многоточие. */
    maxLine: number;
}
export const Ellipsis: React.FC<IEllipsisProps> = ({ children, maxLine, className, ...rest }) => {
    const classNames = clsx(styles.ellipsisLineClamp, { [styles.oneLine]: maxLine === 1 }, className);

    return (
        <div
            className={classNames}
            style={{ "--ellipsis-line-clamp": maxLine } as React.CSSProperties}
            {...rest}
            data-tx={process.env.npm_package_version}
        >
            {children}
        </div>
    );
};
Ellipsis.displayName = "Ellipsis";
