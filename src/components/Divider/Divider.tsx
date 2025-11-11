import clsx from "clsx";
import React from "react";
import styles from "./styles/Divider.module.less";

/** Возможные размеры отступов. */
export type TDividerMarginSize = 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;

/** Свойства компонента Divider. */
export interface IDividerProps extends React.HTMLAttributes<HTMLHRElement> {
    /** Отступ сверху. */
    marginTopSize?: TDividerMarginSize;
    /** ОТступ снизу. */
    marginBottomSize?: TDividerMarginSize;
}

/** Разделитель. */
export const Divider: React.FC<IDividerProps> = (props) => {
    const { className, marginTopSize, marginBottomSize, ...htmlDivAttributes } = props;
    const classNames = clsx(
        styles.divider,
        marginTopSize && styles[`marginTopSize-${marginTopSize}`],
        marginBottomSize && styles[`marginBottomSize-${marginBottomSize}`],
        className,
    );

    return <hr className={classNames} {...htmlDivAttributes} />;
};

Divider.displayName = "Divider";
