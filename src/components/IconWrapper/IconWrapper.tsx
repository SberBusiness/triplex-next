import React from "react";
import clsx from "clsx";
import styles from "./styles/IconWrapper.module.less";

/** Свойства компонента IconWrapper. */
export interface IIconWrapperProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Иконка (или произвольный контент), которую оборачивает компонент. */
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
            {...props}
            ref={ref}
            // Глобальные классы @sberbusiness/icons-next "hoverable", "active" и "disabled" — задают цвет иконки.
            className={clsx("hoverable", className, {
                active,
                disabled,
                [styles.disableInteraction]: disableInteraction,
                [styles.displayContents]: displayContents,
            })}
        >
            {children}
        </span>
    ),
);

IconWrapper.displayName = "IconWrapper";
