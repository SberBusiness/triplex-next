import React from "react";
import { IDropdownListItemProps } from "./DropdownListItem";

/** Отступ между краем списка и элементом при автоматической прокрутке, px. */
const SCROLL_OFFSET = 4;

/**
 * Состояние активного элемента списка: идентификатор элемента, null — первый элемент списка,
 * undefined — активного элемента нет.
 */
export type TActiveListItemId = string | null | undefined;

/**
 * Возвращает props элементов списка в порядке children.
 * Пропускает children, которые не являются React-элементами (null, false, строки), и элементы без id.
 */
export const getListItemsProps = (children: React.ReactNode): IDropdownListItemProps[] => {
    const itemsProps: IDropdownListItemProps[] = [];

    React.Children.forEach(children, (child) => {
        if (React.isValidElement<IDropdownListItemProps>(child) && child.props.id) {
            itemsProps.push(child.props);
        }
    });

    return itemsProps;
};

/**
 * Возвращает идентификатор фактически активного элемента.
 * null и идентификатор, которого нет среди элементов (элемент пропал при фильтрации или подгрузке опций),
 * указывают на первый элемент; у пустого списка активного элемента нет.
 */
export const resolveActiveListItemId = (itemIds: string[], activeId: TActiveListItemId): string | undefined => {
    if (activeId === undefined) {
        return undefined;
    }

    return activeId !== null && itemIds.includes(activeId) ? activeId : itemIds[0];
};

/**
 * Возвращает идентификатор элемента, который становится активным при переходе к следующему (ArrowDown)
 * или предыдущему (ArrowUp) элементу. Переход идёт по кругу.
 * Если активный элемент не задан или его нет среди элементов, следующим становится первый элемент,
 * предыдущим — последний.
 * Если элементов нет, возвращается undefined.
 */
export const getNextActiveListItemId = (
    itemIds: string[],
    activeId: string | undefined,
    direction: "next" | "previous",
): string | undefined => {
    if (itemIds.length === 0) {
        return undefined;
    }

    const position = activeId === undefined ? -1 : itemIds.indexOf(activeId);

    if (position === -1) {
        return direction === "next" ? itemIds[0] : itemIds[itemIds.length - 1];
    }

    const step = direction === "next" ? 1 : -1;

    return itemIds[(position + step + itemIds.length) % itemIds.length];
};

/**
 * Возвращает DOM-элемент пункта с идентификатором id внутри контейнера списка либо null.
 * Ищет только внутри контейнера: id опций задаёт потребитель, и элемент с тем же id в другом месте
 * страницы не должен скрывать пункт списка.
 */
export const getListItemElement = (container: HTMLElement | null, id: string | undefined): HTMLElement | null => {
    if (!container || id === undefined) {
        return null;
    }

    // Сравнение по свойству id, а не селектор #id: id может содержать символы, недопустимые в CSS-селекторе.
    const element = Array.from(container.querySelectorAll<HTMLElement>("[id]")).find((node) => node.id === id);

    return element ?? null;
};

/** Прокручивает контейнер списка к началу. */
export const scrollListToTop = (container: HTMLElement | null): void => {
    if (container) {
        container.scrollTop = 0;
    }
};

/**
 * Прокручивает контейнер списка так, чтобы элемент целиком попал в видимую область.
 * Если элемент уже видим полностью, прокрутка не выполняется.
 */
export const scrollListToItem = (container: HTMLElement | null, item: HTMLElement | null): void => {
    if (!container || !item) {
        return;
    }

    const { top: containerTop, bottom: containerBottom } = container.getBoundingClientRect();
    const { top: itemTop, bottom: itemBottom } = item.getBoundingClientRect();

    if (containerTop > itemTop) {
        container.scrollTop = container.scrollTop - containerTop + itemTop - SCROLL_OFFSET;
    } else if (itemBottom > containerBottom) {
        container.scrollTop = container.scrollTop + itemBottom - containerBottom + SCROLL_OFFSET;
    }
};
