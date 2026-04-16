import React from "react";
import clsx from "clsx";
import styles from "./styles/IconWrapper.module.less";

/** Свойства компонента IconWrapper. */
export interface IIconWrapperProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    /** Активное состояние иконки. */
    active?: boolean;
    /** Отключённое состояние иконки. */
    disabled?: boolean;
    /** Отключить взаимодействие с иконкой. Например, чтобы иконка могла быть тусклой в состоянии disabled и не реагировать на hover, если по клику на нее не должно быть действий. */
    disableInteraction?: boolean;
    /** Отобразить элемент со свойством display: contents. */
    displayContents?: boolean;
}

/**
 * Обёртка для иконок из @sberbusiness/icons-next.
 * Добавляет классы hoverable/active/disabled, которые управляют цветом иконки при взаимодействии.
 */
export const IconWrapper = React.forwardRef<HTMLSpanElement, IIconWrapperProps>(
    ({ children, className, active, disabled, disableInteraction, displayContents, ...props }, ref) => (
        <span
            ref={ref}
            className={clsx("hoverable", className, {
                active: !!active,
                disabled: !!disabled,
                [styles.disableInteraction]: !!disableInteraction,
                [styles.displayContents]: !!displayContents,
            })}
            {...props}
        >
            {children}
        </span>
    ),
);

IconWrapper.displayName = "IconWrapper";
