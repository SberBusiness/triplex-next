import React from "react";
import clsx from "clsx";
import styles from "./styles/BadgePostfix.module.less";

/**
 * Обёртка постфикса Badge. Внутренний компонент, из barrel не экспортируется.
 * Имеет `display: contents`, поэтому не создаёт собственного бокса и не влияет на раскладку.
 * */
export const BadgePostfix: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
    children,
    className,
    ...restProps
}) => (
    <span className={clsx(styles.badgePostfix, className)} {...restProps}>
        {children}
    </span>
);

BadgePostfix.displayName = "BadgePostfix";
