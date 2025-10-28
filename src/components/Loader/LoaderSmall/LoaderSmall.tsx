import React from "react";
import clsx from "clsx";
import styles from "./styles/LoaderSmall.module.less";
import { ELoaderSmallSize, ELoaderSmallTheme } from "./enum";

export interface ILoaderSmallProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Тема. */
    theme: ELoaderSmallTheme;
    /** Размер. */
    size: ELoaderSmallSize;
}

const getLoaderSmallThemeCssClass = (theme: ELoaderSmallTheme) => {
    switch (theme) {
        case ELoaderSmallTheme.BRAND:
            return styles.brand;
        case ELoaderSmallTheme.NEUTRAL:
            return styles.neutral;
    }
};

const getLoaderSmallSizeCssClass = (size: ELoaderSmallSize) => {
    switch (size) {
        case ELoaderSmallSize.SM:
            return styles.sm;
        case ELoaderSmallSize.MD:
            return styles.md;
        case ELoaderSmallSize.LG:
            return styles.lg;
    }
};

export const LoaderSmall: React.FC<ILoaderSmallProps> = ({ className, theme, size, ...restProps }) => {
    return (
        <span
            className={clsx(
                styles.loaderSmall,
                getLoaderSmallSizeCssClass(size),
                getLoaderSmallThemeCssClass(theme),
                className,
            )}
            role="status"
            aria-label="loading"
            {...restProps}
        >
            <span className={clsx(getLoaderSmallThemeCssClass(theme), styles.dot, styles.dot1)} />
            <span className={clsx(getLoaderSmallThemeCssClass(theme), styles.dot, styles.dot2)} />
            <span className={clsx(getLoaderSmallThemeCssClass(theme), styles.dot, styles.dot3)} />
        </span>
    );
};

LoaderSmall.displayName = "LoaderSmall";
