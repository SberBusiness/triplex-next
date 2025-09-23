import React from "react";
import styles from "../styles/TabsExtendedTabButton.module.less";
import clsx from "clsx";
import { Text } from "../../Typography/Text";
import { ETabsExtendedTabButtonSize } from "../enums";
import { tabsExtendedSizeToCssClassMap, tabsExtendedSizeToTextSizeMap } from "../TabsExtendedUtils";

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
        const classNames = clsx(
            styles.tabsExtendedTabButton,
            tabsExtendedSizeToCssClassMap[size],
            { [styles.selected]: !!selected },
            className,
        );

        return (
            <button className={classNames} role="tab" aria-selected={selected} ref={ref} {...rest}>
                <Text className={styles.tabsExtendedTabButtonInner} size={tabsExtendedSizeToTextSizeMap[size]}>
                    {children}
                </Text>
            </button>
        );
    },
);

TabsExtendedTabButton.displayName = "TabsExtendedTabButton";
