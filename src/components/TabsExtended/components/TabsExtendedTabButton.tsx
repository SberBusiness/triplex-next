import React, { useContext } from "react";
import styles from "../styles/TabsExtendedTabButton.module.less";
import clsx from "clsx";
import { ETabsExtendedTabButtonSize } from "../enums";
import { tabsExtendedSizeToCssClassMap, mapTypeToClassName } from "../utils";
import { TabsExtendedContext } from "../TabsExtendedContext";

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
        const { type } = useContext(TabsExtendedContext);

        const classNames = clsx(
            styles.tabsExtendedTabButton,
            tabsExtendedSizeToCssClassMap[size],
            mapTypeToClassName(type, styles),
            { [styles.selected]: !!selected },
            className,
        );

        return (
            <button className={classNames} role="tab" aria-selected={selected} ref={ref} {...rest}>
                <div className={styles.tabButtonText}>{children}</div>
            </button>
        );
    },
);

TabsExtendedTabButton.displayName = "TabsExtendedTabButton";
