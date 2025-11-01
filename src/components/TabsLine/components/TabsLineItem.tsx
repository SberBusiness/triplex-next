import React from "react";
import { TestProps } from "../../../types/CoreTypes";
import clsx from "clsx";
import styles from "../styles/TabsLine.module.less";
import { ETabsSize } from "../enum";

/** Свойства TabsLineItem. */
export interface ITabsLineItemProps extends React.HTMLAttributes<HTMLButtonElement>, TestProps {
    /** Таб выбран. */
    selected?: boolean;
    /** Идентификатор таба. */
    id: string;
    /** Отображаемое значение. */
    label: string;
    /** Флаг отображения значка новых уведомлений. */
    showNotificationIcon?: boolean;
    /** Размер таба. */
    size?: ETabsSize;
}

/** Возвращает CSS класс размера таба. */
const getTabSizeCssClass = (size?: ETabsSize) => {
    switch (size) {
        case ETabsSize.LG:
            return styles.lg;
        case ETabsSize.MD:
            return styles.md;
        case ETabsSize.SM:
            return styles.sm;
    }
};

/** Компонент TabsLineItem. */
export const TabsLineItem = React.forwardRef<HTMLButtonElement, ITabsLineItemProps>(
    ({ id, label, selected, showNotificationIcon, size = ETabsSize.MD, ...htmlButtonAttributes }, ref) => (
        <button
            {...htmlButtonAttributes}
            key={id}
            className={clsx(styles.tab, getTabSizeCssClass(size), { [styles.active]: Boolean(selected) })}
            role="tab"
            aria-selected={selected}
            ref={ref}
        >
            {label}
            {showNotificationIcon && <span className={styles.notificationIcon} />}
        </button>
    ),
);

TabsLineItem.displayName = "TabsLineItem";
