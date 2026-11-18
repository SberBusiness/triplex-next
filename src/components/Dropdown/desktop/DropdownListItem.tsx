import React, { useContext } from "react";
import clsx from "clsx";
import { TestProps } from "../../../types/CoreTypes";
import { EComponentSize } from "../../../enums";
import { Badge } from "../../Badge/Badge";
import { DropdownListItemsContext } from "./DropdownListItemsContext";
import styles from "../styles/DropdownDesktopList.module.less";

/** Свойства компонента DropdownListItem. */
export interface IDropdownListItemProps extends React.HTMLAttributes<HTMLDivElement>, TestProps {
    /** Идентификатор элемента. */
    id: string;
    /**
     * Обработчик выбора текущего элемента. Вызывается по клику, а когда элемент активен — по клавишам
     * keyCodesForSelection.
     */
    onSelect?: () => void;
    /** Флаг - текущий элемент выбран. */
    selected?: boolean;
    /**
     * Коды клавиш для выбора элемента с помощью клавиатуры. По умолчанию [SPACE, ENTER]. Обрабатывает DropdownList.
     * Если клавиши приходят из поля ввода, задайте [ENTER], иначе пробел выберет элемент вместо ввода.
     */
    keyCodesForSelection?: number[];
    /** Флаг отображения значка новых уведомлений. */
    showNotificationIcon?: boolean;
}

/**
 * Элемент выпадающего списка. Выбирается по клику, с клавиатуры — через DropdownList.
 * Активность и размер берёт из DropdownList, наведением курсора делает себя активным.
 * Вне DropdownList не подсвечивается и имеет размер MD.
 */
export const DropdownListItem = React.forwardRef<HTMLDivElement, IDropdownListItemProps>(
    (
        {
            // Клавиши выбора читает DropdownList, в DOM они не передаются.
            keyCodesForSelection,
            children,
            className,
            id,
            onClick,
            onMouseEnter,
            onMouseLeave,
            onSelect,
            selected,
            showNotificationIcon,
            ...htmlDivAttributes
        },
        ref,
    ) => {
        const listContext = useContext(DropdownListItemsContext);
        const active = listContext?.activeId === id;
        const size = listContext?.size ?? EComponentSize.MD;

        const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
            onSelect?.();
            onClick?.(event);
        };

        // mouseenter / mouseleave не всплывают: переход курсора на вложенную разметку пункта не меняет активность.
        const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
            listContext?.setActiveId(id);
            onMouseEnter?.(event);
        };

        const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
            // Снимается только своя активность: клавиатура могла уже перевести её на другой пункт.
            if (active) {
                listContext?.setActiveId(undefined);
            }
            onMouseLeave?.(event);
        };

        return (
            <div
                className={clsx(
                    styles.dropdownDesktopListItem,
                    { [styles.active]: active, [styles.selected]: !!selected },
                    className,
                )}
                id={id}
                title={typeof children === "string" ? children : undefined}
                role="option"
                aria-selected={!!selected}
                {...htmlDivAttributes}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
            >
                {children}
                {showNotificationIcon && <Badge.Dot size={size} className={styles.notificationIcon} />}
            </div>
        );
    },
);

DropdownListItem.displayName = "DropdownListItem";
