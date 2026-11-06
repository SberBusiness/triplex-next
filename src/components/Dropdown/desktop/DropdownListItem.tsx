import React from "react";
import clsx from "clsx";
import { TestProps } from "../../../types/CoreTypes";
import { EComponentSize } from "../../../enums";
import { Badge } from "../../Badge/Badge";
import styles from "../styles/DropdownDesktopList.module.less";

/** Свойства компонента DropdownListItem. */
export interface IDropdownListItemProps extends React.HTMLAttributes<HTMLDivElement>, TestProps {
    /** Флаг активного элемента при навигации с клавиатуры. Свойство передается из DropdownList. */
    active?: boolean;
    /** Идентификатор элемента. */
    id: string;
    /** Обработчик выбора текущего элемента. Вызывается по клику, а когда элемент активен — по клавишам keyCodesForSelection. */
    onSelect?: () => void;
    /** Флаг - текущий элемент выбран. */
    selected?: boolean;
    /** Коды клавиш для выбора элемента с помощью клавиатуры. По умолчанию [SPACE, ENTER]. Обрабатывает DropdownList. */
    keyCodesForSelection?: number[];
    /** Флаг отображения значка новых уведомлений. */
    showNotificationIcon?: boolean;
    /** Размер списка. */
    size?: EComponentSize;
}

/**
 * Элемент выпадающего списка. Выбирается по клику, с клавиатуры — через DropdownList.
 */
export const DropdownListItem = React.forwardRef<HTMLDivElement, IDropdownListItemProps>(
    (
        {
            active,
            // Клавиши выбора читает DropdownList, в DOM они не передаются.
            keyCodesForSelection,
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
