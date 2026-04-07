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
    /** Применить display: contents (обёртка не участвует в layout). */
    displayContents?: boolean;
}

/**
 * Обёртка для иконок из @sberbusiness/icons-next.
 * Добавляет классы hoverable/active/disabled, которые управляют цветом иконки при взаимодействии.
 */
export const IconWrapper = React.forwardRef<HTMLSpanElement, IIconWrapperProps>(
    ({ className, active, disabled, disablePointerEvents, displayContents, ...rest }, ref) => (
        <span
            className={clsx(
                "hoverable",
                {
                    active: !!active,
                    disabled: !!disabled,
                    [styles.disablePointerEvents]: !!disablePointerEvents,
                    [styles.displayContents]: !!displayContents,
                },
                className,
            )}
            ref={ref}
            {...rest}
        />
    ),
);

IconWrapper.displayName = "IconWrapper";
