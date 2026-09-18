import React, { useState } from "react";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { TestProps } from "../../../types/CoreTypes";
import { Badge } from "../../Badge/Badge";
import { Text } from "../../Typography/Text";
import { EFontType } from "../../Typography/enums";
import { tabsLineSizeToTextSizeMap } from "../utils";
import styles from "../styles/TabsLine.module.less";

/** Свойства компонента TabsLineItem. */
export interface ITabsLineItemProps extends React.HTMLAttributes<HTMLButtonElement>, TestProps {
    /** Таб выбран. По умолчанию false. */
    selected?: boolean;
    /** Идентификатор таба. Сопоставляется с selectedId и приходит в onChangeTab. В DOM не попадает. */
    id: string;
    /** Отображаемое значение. */
    label: string;
    /** Флаг отображения значка новых уведомлений. По умолчанию false. */
    showNotificationIcon?: boolean;
    /** Размер таба. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
}

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/** Кнопка одного таба TabsLine: текст и опциональный значок новых уведомлений. */
export const TabsLineItem = React.forwardRef<HTMLButtonElement, ITabsLineItemProps>(
    (
        {
            className,
            // id — идентификатор таба в модели данных, а не DOM-атрибут: на <button> он намеренно не уходит.
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

        const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
            setFocused(true);
            onFocus?.(event);
        };

        const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
            setFocused(false);
            onBlur?.(event);
        };

        const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
            setHovered(true);
            onMouseEnter?.(event);
        };

        const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
            setHovered(false);
            onMouseLeave?.(event);
        };

        return (
            <button
                type="button"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...htmlButtonAttributes}
                className={clsx(
                    styles.tab,
                    SIZE_TO_CLASS_NAME_MAP[size],
                    { [styles.active]: Boolean(selected) },
                    className,
                )}
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
                {showNotificationIcon && <Badge.Dot size={size} className={styles.notificationIcon} />}
            </button>
        );
    },
);

TabsLineItem.displayName = "TabsLineItem";
