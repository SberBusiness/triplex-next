import React from "react";
import clsx from "clsx";
import styles from "./styles/IconWrapper.module.less";

/** Свойства компонента IconWrapper. */
export interface IIconWrapperProps {
    children: React.ReactNode;
    /** Активное состояние иконки. */
    active?: boolean;
    /** Отключённое состояние иконки. */
    disabled?: boolean;
    /** Отключить взаимодействие с иконкой. Например, чтобы иконка могла быть тусклой в состоянии disabled и не реагировать на hover, если по клику на нее не должно быть действий. */
    disableInteraction?: boolean;
}

/**
 * Обёртка для иконок из @sberbusiness/icons-next.
 * Добавляет классы hoverable/active/disabled, которые управляют цветом иконки при взаимодействии.
 */
export const IconWrapper = React.forwardRef<HTMLSpanElement, IIconWrapperProps>(
    ({ children, active, disabled, disableInteraction }, ref) => (
        <span
            ref={ref}
            className={clsx("hoverable", styles.iconWrapper, {
                active: !!active,
                disabled: !!disabled,
                [styles.disableInteraction]: !!disableInteraction,
            })}
        >
            {children}
        </span>
    ),
);

IconWrapper.displayName = "IconWrapper";
