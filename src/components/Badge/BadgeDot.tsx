import React from "react";
import clsx from "clsx";
import { IBadgeDotProps } from "./types";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";
import styles from "./styles/BadgeDot.module.less";

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/** Индикатор статуса или уведомления в виде точки. */
export const BadgeDot = React.forwardRef<HTMLSpanElement, IBadgeDotProps>(({ className, size, ...restProps }, ref) => (
    <span className={clsx(styles.badgeDot, SIZE_TO_CLASS_NAME_MAP[size], className)} {...restProps} ref={ref} />
));

BadgeDot.displayName = "BadgeDot";
