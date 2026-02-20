import React from "react";
import clsx from "clsx";
import styles from "./styles/BadgePrefix.module.less";

/** Префикс Badge. */
export const BadgePrefix: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, className, ...restProps }) => (
    <span className={clsx(styles.badgePrefix, className)} {...restProps}>
        {children}
    </span>
);

BadgePrefix.displayName = "BadgePrefix";
