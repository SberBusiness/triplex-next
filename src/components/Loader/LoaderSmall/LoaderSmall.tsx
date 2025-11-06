import React from "react";
import clsx from "clsx";
import styles from "./styles/LoaderSmall.module.less";
import { ELoaderSmallTheme } from "./enum";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Свойства компонента LoaderSmall. */
export interface ILoaderSmallProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Тема. */
    theme: ELoaderSmallTheme;
    /** Размер. */
    size: EComponentSize;
}

// Соответствие темы имени класса.
const themeToClassNameMap = {
    [ELoaderSmallTheme.BRAND]: styles.brand,
    [ELoaderSmallTheme.NEUTRAL]: styles.neutral,
};

// Соответствие размера имени класса.
const sizeToClassNameMap = {
    [EComponentSize.SM]: styles.sm,
    [EComponentSize.MD]: styles.md,
    [EComponentSize.LG]: styles.lg,
};

export const LoaderSmall = React.forwardRef<HTMLSpanElement, ILoaderSmallProps>(
    ({ className, theme, size, ...restProps }, ref) => (
        <span
            className={clsx(styles.loaderSmall, themeToClassNameMap[theme], sizeToClassNameMap[size], className)}
            role="status"
            aria-label="loading"
            {...restProps}
            ref={ref}
        >
            <span className={clsx(styles.dot, styles.dot1)} />
            <span className={clsx(styles.dot, styles.dot2)} />
            <span className={clsx(styles.dot, styles.dot3)} />
        </span>
    ),
);

LoaderSmall.displayName = "LoaderSmall";
