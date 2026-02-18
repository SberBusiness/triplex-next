import React from "react";
import clsx from "clsx";
import styles from "./styles/BadgePostfix.module.less";

/** Постфикс Badge. */
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
