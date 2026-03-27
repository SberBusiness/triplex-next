import React, { useContext } from "react";
import clsx from "clsx";
import { TABS_EXTENDED_TYPE_TO_CLASS_NAME_MAP, TABS_EXTENDED_SIZE_TO_TEXT_SIZE_MAP } from "../utils";
import { TabsExtendedContext } from "../TabsExtendedContext";
import { Text, EFontType } from "../../Typography";
import { Badge } from "../../Badge";
import { EComponentSize } from "../../../enums";
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
            TABS_EXTENDED_TYPE_TO_CLASS_NAME_MAP[type],
            { [styles.selected]: !!selected },
            className,
        );

        return (
            <button type="button" className={classNames} role="tab" aria-selected={selected} ref={ref} {...rest}>
                <Text
                    className={styles.tabsExtendedTabButtonTextDefault}
                    size={TABS_EXTENDED_SIZE_TO_TEXT_SIZE_MAP[size]}
                    type={EFontType.SECONDARY}
                >
                    {children}
                </Text>
                <Text
                    className={styles.tabsExtendedTabButtonTextHover}
                    size={TABS_EXTENDED_SIZE_TO_TEXT_SIZE_MAP[size]}
                >
                    {children}
                </Text>
                {showNotificationIcon && <Badge.Dot size={size} className={styles.notificationIcon} />}
            </button>
        );
    },
);

TabsExtendedTabButton.displayName = "TabsExtendedTabButton";
