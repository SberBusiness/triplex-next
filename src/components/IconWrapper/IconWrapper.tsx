import React from "react";
import clsx from "clsx";
import styles from "./styles/IconWrapper.module.less";

/** Свойства компонента IconWrapper. */
export interface IIconWrapperProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Активное состояние иконки. */
    active?: boolean;
    /** Отключённое состояние иконки. */
    disabled?: boolean;
    /** Отключить pointer events. */
    disablePointerEvents?: boolean;
}

/**
 * Обёртка для иконок из @sberbusiness/icons-next.
 * Добавляет классы hoverable/active/disabled, которые управляют цветом иконки при взаимодействии.
 */
export const IconWrapper = React.forwardRef<HTMLSpanElement, IIconWrapperProps>(
    ({ className, active, disabled, disablePointerEvents, ...rest }, ref) => (
        <span
            className={clsx(
                styles.iconWrapper,
                "hoverable",
                { active: !!active, disabled: !!disabled, [styles.disablePointerEvents]: !!disablePointerEvents },
                className,
            )}
            ref={ref}
            {...rest}
        />
    ),
);

IconWrapper.displayName = "IconWrapper";
