import React from "react";
import clsx from "clsx";
import { IBadgeProps } from "./types";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";
import { BadgeDot } from "./BadgeDot";
import { BadgeContent } from "./components/BadgeContent";
import { BadgePrefix } from "./components/BadgePrefix";
import { BadgePostfix } from "./components/BadgePostfix";
import styles from "./styles/Badge.module.less";

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/**
 * Индикатор статуса или уведомления.
 * Может содержать префикс, контент и постфикс.
 * Для отображения точки используется компонент BadgeDot.
 * */
export const Badge = Object.assign(
    React.forwardRef<HTMLSpanElement, IBadgeProps>(
        ({ children, className, size, prefix, postfix, ...restProps }, ref) => (
            <span className={clsx(styles.badge, SIZE_TO_CLASS_NAME_MAP[size], className)} {...restProps} ref={ref}>
                {prefix ? <BadgePrefix>{prefix}</BadgePrefix> : null}

                {children ? (
                    <BadgeContent size={size} noPaddingLeft={Boolean(prefix)} noPaddingRight={Boolean(postfix)}>
                        {children}
                    </BadgeContent>
                ) : null}

                {postfix ? <BadgePostfix>{postfix}</BadgePostfix> : null}
            </span>
        ),
    ),
    {
        Dot: BadgeDot,
    },
);

Badge.displayName = "Badge";
