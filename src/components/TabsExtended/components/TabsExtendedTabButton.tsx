import React, { useContext } from "react";
import styles from "../styles/TabsExtendedTabButton.module.less";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { tabsExtendedTypeToClassNameMap, tabsExtendedSizeToTextSizeMap } from "../utils";
import { TabsExtendedContext } from "../TabsExtendedContext";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";

/** Свойства компонента TabsExtendedTabButton. */
export interface ITabsExtendedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Выбранное состояние. */
    selected?: boolean;
    /** Размер компонента. */
    size?: EComponentSize;
}

/**
 * Кнопка таба.
 * Если используется кастомный компонент кнопки, желательно, чтобы он рендерил html-элемент button, иначе выбор с клавиатуры может работать не корректно.
 */
export const TabsExtendedTabButton = React.forwardRef<HTMLButtonElement, ITabsExtendedButtonProps>(
    ({ children, className, selected, size = EComponentSize.MD, ...rest }, ref) => {
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
            </button>
        );
    },
);

TabsExtendedTabButton.displayName = "TabsExtendedTabButton";
