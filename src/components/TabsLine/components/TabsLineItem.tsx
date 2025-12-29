import React, { useState } from "react";
import { TestProps } from "../../../types/CoreTypes";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { NotificationIcon } from "../../NotificationIcon/NotificationIcon";
import styles from "../styles/TabsLine.module.less";
import { Text } from "../../Typography/Text";
import { tabsLineSizeToTextSizeMap } from "../utils";
import { EFontType } from "../../Typography/enums";

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
    (
        {
            id,
            label,
            selected,
            showNotificationIcon,
            size = EComponentSize.MD,
            onFocus,
            onBlur,
            onMouseEnter,
            onMouseLeave,
            ...htmlButtonAttributes
        },
        ref,
    ) => {
        const [focused, setFocused] = useState(false);
        const [hovered, setHovered] = useState(false);

        const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
            setFocused(true);
            onFocus?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
            setFocused(false);
            onBlur?.(e);
        };

        return (
            <button
                type="button"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                {...htmlButtonAttributes}
                key={id}
                className={clsx(styles.tab, sizeToClassNameMap[size], { [styles.active]: Boolean(selected) })}
                role="tab"
                aria-selected={selected}
                ref={ref}
            >
                <Text
                    size={tabsLineSizeToTextSizeMap[size]}
                    type={selected || focused || hovered ? EFontType.PRIMARY : EFontType.SECONDARY}
                >
                    {label}
                </Text>
                {showNotificationIcon && <NotificationIcon className={styles.notificationIcon} />}
            </button>
        );
    },
);

TabsLineItem.displayName = "TabsLineItem";
