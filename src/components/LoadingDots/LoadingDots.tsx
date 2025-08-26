import React from "react";
import clsx from "clsx";
import styles from "./styles/LoadingDots.module.less";
import { ELoadingDotsSize, ELoadingDotsTheme } from "./enum";

export interface ILoadingDotsProps {
    theme: ELoadingDotsTheme;
    size: ELoadingDotsSize;
}

const getLoadingDotsThemeCssClass = (theme: ELoadingDotsTheme) => {
    switch (theme) {
        case ELoadingDotsTheme.GENERAL:
            return styles.general;
        case ELoadingDotsTheme.SECONDARY:
            return styles.secondary;
    }
};

const getLoadingDotsSizeCssClass = (size: ELoadingDotsSize) => {
    switch (size) {
        case ELoadingDotsSize.SM:
            return styles.sm;
        case ELoadingDotsSize.MD:
            return styles.md;
        case ELoadingDotsSize.LG:
            return styles.lg;
    }
};

export const LoadingDots: React.FC<ILoadingDotsProps> = ({ theme, size }) => {
    return (
        <span
            className={clsx(styles.loadingDots, getLoadingDotsSizeCssClass(size), getLoadingDotsThemeCssClass(theme))}
        >
            <span className={clsx(getLoadingDotsThemeCssClass(theme), styles.dot, styles.dot1)} />
            <span className={clsx(getLoadingDotsThemeCssClass(theme), styles.dot, styles.dot2)} />
            <span className={clsx(getLoadingDotsThemeCssClass(theme), styles.dot, styles.dot3)} />
        </span>
    );
};

LoadingDots.displayName = "LoadingDots";
