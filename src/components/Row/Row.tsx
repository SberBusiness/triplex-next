import React from "react";
import clsx from "clsx";
import styles from "./styles/Row.module.less";

/** Свойства компонента Row. */
export interface IRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Вертикальный нижний отступ. */
    paddingBottom?: boolean;
}

/**
 * Строка с нижним отступом, принимающая в children только колонки Col.
 */
export const Row: React.FC<IRowProps> = ({ children, className, paddingBottom = true, ...htmlDivAttributes }) => {
    const cn = clsx(className, styles.row, { [styles.noPaddingBottom]: !paddingBottom });

    return (
        <div className={cn} {...htmlDivAttributes}>
            {children}
        </div>
    );
};

Row.displayName = "Row";
