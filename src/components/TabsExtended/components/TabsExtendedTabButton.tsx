import React, { useContext } from "react";
import clsx from "clsx";
import { tabsExtendedTypeToClassNameMap, tabsExtendedSizeToTextSizeMap } from "../utils";
import { TabsExtendedContext } from "../TabsExtendedContext";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { Badge } from "../../Badge/Badge";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import styles from "../styles/TabsExtendedTabButton.module.less";

/** Свойства компонента TabsExtendedTabButton. */
export interface ITabsExtendedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Выбранное состояние. */
    selected?: boolean;
    /** Размер компонента. */
    size?: EComponentSize;
    /** Флаг отображения значка новых уведомлений. */
    showNotificationIcon?: boolean;
}

/**
 * Кнопка таба.
 * Если используется кастомный компонент кнопки, желательно, чтобы он рендерил html-элемент button, иначе выбор с клавиатуры может работать не корректно.
 */
export const TabsExtendedTabButton = React.forwardRef<HTMLButtonElement, ITabsExtendedButtonProps>(
    ({ children, className, selected, size = EComponentSize.MD, showNotificationIcon, ...rest }, ref) => {
        const { type } = useContext(TabsExtendedContext);

        const classNames = clsx(
            styles.tabsExtendedTabButton,
            styles[size],
            tabsExtendedTypeToClassNameMap[type],
            { [styles.selected]: !!selected },
            className,
        );

        return (
            <button type="button" className={classNames} role="tab" aria-selected={selected} ref={ref} {...rest}>
                <Text size={tabsExtendedSizeToTextSizeMap[size]} className={styles.tabButtonText}>
                    {children}
                </Text>
                {showNotificationIcon && <Badge.Dot size={size} className={styles.notificationIcon} />}
            </button>
        );
    },
);

TabsExtendedTabButton.displayName = "TabsExtendedTabButton";
