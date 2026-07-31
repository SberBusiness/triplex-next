import React, { useEffect } from "react";
import clsx from "clsx";
import { TestProps } from "../../../types/CoreTypes";
import { EComponentSize } from "../../../enums";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { Badge } from "../../Badge/Badge";
import styles from "../styles/DropdownDesktopList.module.less";

/** Свойства компонента DropdownListItem. */
export interface IDropdownListItemProps extends React.HTMLAttributes<HTMLDivElement>, TestProps {
    /** Флаг активного элемента при навигации с клавиатуры. Свойство передается из DropdownList. */
    active?: boolean;
    /** Идентификатор элемента. */
    id: string;
    /** Обработчик выбора текущего элемента. Выбор осуществляется по клику либо при нажатии на пробел. */
    onSelect?: () => void;
    /** Флаг - текущий элемент выбран. */
    selected?: boolean;
    /** Коды клавиш для выбора элемента с помощью клавиатуры. */
    keyCodesForSelection?: number[];
    /** Флаг отображения значка новых уведомлений. */
    showNotificationIcon?: boolean;
    /** Размер списка. */
    size?: EComponentSize;
}

const KEY_CODES_FOR_SELECTION_DEFAULT = [EVENT_KEY_CODES.SPACE, EVENT_KEY_CODES.ENTER];

/**
 * Элемент выпадающего списка.
 * Пока элемент активен (active), слушает клавиатуру документа и вызывает onSelect
 * при нажатии клавиш из keyCodesForSelection.
 */
export const DropdownListItem = React.forwardRef<HTMLDivElement, IDropdownListItemProps>(
    (
        {
            active,
            keyCodesForSelection = KEY_CODES_FOR_SELECTION_DEFAULT,
            children,
            className,
            onClick,
            onSelect,
            selected,
            showNotificationIcon,
            size = EComponentSize.MD,
            ...htmlDivAttributes
        },
        ref,
    ) => {
        const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
            onSelect?.();
            onClick?.(event);
        };

        // Подписка на ввод с клавиатуры для выбора активного пункта.
        useEffect(() => {
            if (!active) {
                return;
            }

            const handleKeyDown = (event: KeyboardEvent) => {
                // По умолчанию при нажатии Enter или Space выбирается текущий пункт.
                if (keyCodesForSelection.includes(event.keyCode)) {
                    event.preventDefault();
                    onSelect?.();
                }
            };

            document.addEventListener("keydown", handleKeyDown);

            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }, [active, keyCodesForSelection, onSelect]);

        return (
            <div
                className={clsx(
                    styles.dropdownDesktopListItem,
                    { [styles.active]: !!active, [styles.selected]: !!selected },
                    className,
                )}
                title={typeof children === "string" ? children : undefined}
                role="option"
                aria-selected={!!selected}
                {...htmlDivAttributes}
                onClick={handleClick}
                ref={ref}
            >
                {children}
                {showNotificationIcon && <Badge.Dot size={size} className={styles.notificationIcon} />}
            </div>
        );
    },
);

DropdownListItem.displayName = "DropdownListItem";
