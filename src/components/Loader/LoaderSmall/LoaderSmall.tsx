import React from "react";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { ELoaderSmallTheme } from "./enum";
import styles from "./styles/LoaderSmall.module.less";

/** Свойства компонента LoaderSmall. */
export interface ILoaderSmallProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Тема: BRAND — для светлых поверхностей, NEUTRAL — для тёмных и цветных. */
    theme: ELoaderSmallTheme;
    /** Размер: SM (16×16) / MD (24×24) / LG (32×32). */
    size: EComponentSize;
}

/** Соответствие темы имени класса. */
const THEME_TO_CLASS_NAME_MAP = {
    [ELoaderSmallTheme.BRAND]: styles.brand,
    [ELoaderSmallTheme.NEUTRAL]: styles.neutral,
};

/** Соответствие размера имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/**
 * Горизонтальный загрузчик из трёх анимированных точек.
 * Индикатор загрузки для кнопок, полей ввода и списков.
 */
export const LoaderSmall: React.FC<ILoaderSmallProps> = ({ className, theme, size, ...restProps }) => {
    return (
        <span
            className={clsx(
                styles.loaderSmall,
                THEME_TO_CLASS_NAME_MAP[theme],
                SIZE_TO_CLASS_NAME_MAP[size],
                className,
            )}
            role="status"
            aria-label="loading"
            {...restProps}
        >
            <span className={clsx(styles.dot, styles.dot1)} />
            <span className={clsx(styles.dot, styles.dot2)} />
            <span className={clsx(styles.dot, styles.dot3)} />
        </span>
    );
};

LoaderSmall.displayName = "LoaderSmall";
