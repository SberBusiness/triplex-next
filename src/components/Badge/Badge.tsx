import React from "react";
import clsx from "clsx";
import { IBadgeProps } from "./types";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";
import styles from "./styles/Badge.module.less";

// Соответствие размера имени класса.
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/** Индикатор статуса или уведомления. */
export const Badge = React.forwardRef<HTMLSpanElement, IBadgeProps>(
    ({ children, className, size, ...restProps }, ref) => (
        <span className={clsx(styles.badge, SIZE_TO_CLASS_NAME_MAP[size], className)} {...restProps} ref={ref}>
            {children}
        </span>
    ),
);

Badge.displayName = "Badge";
