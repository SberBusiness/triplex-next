import React from "react";
import { TestProps } from "../../../types/CoreTypes";
import clsx from "clsx";
import styles from "../styles/TabsLine.module.less";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";

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
    size?: EComponentSize;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Компонент TabsLineItem. */
export const TabsLineItem = React.forwardRef<HTMLButtonElement, ITabsLineItemProps>(
    ({ id, label, selected, showNotificationIcon, size = EComponentSize.MD, ...htmlButtonAttributes }, ref) => {
        return (
            <button
                {...htmlButtonAttributes}
                key={id}
                className={clsx(styles.tab, sizeToClassNameMap[size], { [styles.active]: Boolean(selected) })}
                role="tab"
                aria-selected={selected}
                ref={ref}
            >
                {label}
                {showNotificationIcon && <span className={styles.notificationIcon} />}
            </button>
        );
    },
);

TabsLineItem.displayName = "TabsLineItem";
