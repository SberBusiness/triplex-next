import clsx from "clsx";
import React from "react";
import styles from "./styles/Divider.module.less";

/** Возможные размеры отступов Divider, в пикселях. */
export type TDividerMarginSize = 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;

/** Свойства компонента Divider. */
export interface IDividerProps extends Omit<React.HTMLAttributes<HTMLHRElement>, "children"> {
    /** Отступ сверху, в пикселях. По умолчанию отступа нет. */
    marginTopSize?: TDividerMarginSize;
    /** Отступ снизу, в пикселях. По умолчанию отступа нет. */
    marginBottomSize?: TDividerMarginSize;
}

/** Разделитель. Горизонтальная линия между блоками контента с опциональными отступами сверху и снизу. */
export const Divider = React.forwardRef<HTMLHRElement, IDividerProps>(
    ({ className, marginTopSize, marginBottomSize, ...restProps }, ref) => (
        <hr
            className={clsx(
                styles.divider,
                marginTopSize && styles[`marginTopSize-${marginTopSize}`],
                marginBottomSize && styles[`marginBottomSize-${marginBottomSize}`],
                className,
            )}
            {...restProps}
            ref={ref}
        />
    ),
);

Divider.displayName = "Divider";
