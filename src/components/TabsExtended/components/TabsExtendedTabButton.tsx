import React from "react";
import styles from "../styles/TabsExtendedTabButton.module.less";
import clsx from "clsx";
import { Text } from "../../Typography/Text";
import { ETextSize } from "../../Typography/enums";
import { ETabsExtendedTabButtonSize } from "../enums";

/** Свойства компонента TabsExtendedTabButton. */
export interface ITabsExtendedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Выбранное состояние. */
    selected?: boolean;
    /** Размер компонента. */
    size?: ETabsExtendedTabButtonSize;
}

/**
 * Кнопка таба.
 * Если используется кастомный компонент кнопки, желательно, чтобы он рендерил html-элемент button, иначе выбор с клавиатуры может работать не корректно.
 */
export const TabsExtendedTabButton = React.forwardRef<HTMLButtonElement, ITabsExtendedButtonProps>(
    ({ children, className, selected, size = ETabsExtendedTabButtonSize.MD, ...rest }, ref) => {
        const getTabsExtendedTabButtonSizeCssClass = (size: ETabsExtendedTabButtonSize) => {
            switch (size) {
                case ETabsExtendedTabButtonSize.LG:
                    return styles.lg;
                case ETabsExtendedTabButtonSize.MD:
                    return styles.md;
                case ETabsExtendedTabButtonSize.SM:
                    return styles.sm;
            }
        };

        const getTabsExtendedTabButtonSizeTextSize = (size: ETabsExtendedTabButtonSize) => {
            switch (size) {
                case ETabsExtendedTabButtonSize.LG:
                    return ETextSize.B2;
                case ETabsExtendedTabButtonSize.MD:
                    return ETextSize.B3;
                case ETabsExtendedTabButtonSize.SM:
                    return ETextSize.B4;
            }
        };

        const classNames = clsx(
            styles.tabsExtendedTabButton,
            getTabsExtendedTabButtonSizeCssClass(size),
            { [styles.selected]: !!selected },
            className,
        );

        return (
            <button className={classNames} role="tab" aria-selected={selected} ref={ref} {...rest}>
                <Text className={styles.tabsExtendedTabButtonInner} size={getTabsExtendedTabButtonSizeTextSize(size)}>
                    {children}
                </Text>
            </button>
        );
    },
);

TabsExtendedTabButton.displayName = "TabsExtendedTabButton";
