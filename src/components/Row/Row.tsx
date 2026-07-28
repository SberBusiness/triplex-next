import React from "react";
import clsx from "clsx";
import styles from "./styles/Row.module.less";
import { EComponentSize } from "../../enums/EComponentSize";
import { RowContext } from "./RowContext";

/** Свойства компонента Row. */
export interface IRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Вертикальный нижний отступ. По умолчанию true. */
    paddingBottom?: boolean;
    /** Размер отступа между колонками. По умолчанию EComponentSize.SM. */
    gridHorizontalGap?: EComponentSize.SM | EComponentSize.MD;
}

const GRID_HORIZONTAL_GAP_TO_CLASS_NAME_MAP = {
    [EComponentSize.SM]: styles.SM,
    [EComponentSize.MD]: styles.MD,
};

/**
 * Строка сетки с нижним отступом, принимающая в children только колонки Col.
 * Передаёт размер отступа между колонками в Col через RowContext.
 */
export const Row = React.forwardRef<HTMLDivElement, IRowProps>(
    (
        { children, className, gridHorizontalGap = EComponentSize.SM, paddingBottom = true, ...htmlDivAttributes },
        ref,
    ) => {
        const contextValue = React.useMemo(() => ({ gridHorizontalGap }), [gridHorizontalGap]);

        return (
            <RowContext.Provider value={contextValue}>
                <div
                    className={clsx(
                        styles.row,
                        GRID_HORIZONTAL_GAP_TO_CLASS_NAME_MAP[gridHorizontalGap],
                        { [styles.noPaddingBottom]: !paddingBottom },
                        className,
                    )}
                    {...htmlDivAttributes}
                    ref={ref}
                >
                    {children}
                </div>
            </RowContext.Provider>
        );
    },
);

Row.displayName = "Row";
