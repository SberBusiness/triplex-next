import React from "react";
import clsx from "clsx";
import styles from "./styles/Row.module.less";
import { EComponentSize } from "../../enums/EComponentSize";
import { RowContext } from "./RowContext";

/** Свойства компонента Row. */
export interface IRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Вертикальный нижний отступ. */
    paddingBottom?: boolean;
    /** Размер отступа между колонками. */
    gridHorizontalGap?: EComponentSize.SM | EComponentSize.MD;
}

const GRID_HORIZONTAL_GAP_TO_CLASS_NAME_MAP = {
    [EComponentSize.SM]: styles.SM,
    [EComponentSize.MD]: styles.MD,
};

/**
 * Строка с нижним отступом, принимающая в children только колонки Col.
 */
export const Row: React.FC<IRowProps> = ({
    children,
    className,
    gridHorizontalGap = EComponentSize.SM,
    paddingBottom = true,
    ...htmlDivAttributes
}) => {
    const cn = clsx(className, styles.row, GRID_HORIZONTAL_GAP_TO_CLASS_NAME_MAP[gridHorizontalGap], {
        [styles.noPaddingBottom]: !paddingBottom,
    });

    return (
        <RowContext.Provider value={{ gridHorizontalGap }}>
            <div className={cn} {...htmlDivAttributes}>
                {children}
            </div>
        </RowContext.Provider>
    );
};

Row.displayName = "Row";
