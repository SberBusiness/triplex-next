import React from "react";
import clsx from "clsx";
import styles from "./styles/BadgePrefix.module.less";

/**
 * Обёртка префикса Badge. Внутренний компонент, из barrel не экспортируется.
 * Имеет `display: contents`, поэтому не создаёт собственного бокса и не влияет на раскладку.
 * */
export const BadgePrefix: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, className, ...restProps }) => (
    <span className={clsx(styles.badgePrefix, className)} {...restProps}>
        {children}
    </span>
);

BadgePrefix.displayName = "BadgePrefix";
