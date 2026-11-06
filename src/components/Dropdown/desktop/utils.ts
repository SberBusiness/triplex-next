import React from "react";
import { IDropdownListItemProps } from "./DropdownListItem";

/** Отступ между краем списка и элементом при автоматической прокрутке, px. */
const SCROLL_OFFSET = 4;

/**
 * Возвращает props элемента списка с индексом index (нумерация как у React.Children.map).
 * Если index не задан или под ним не React-элемент, возвращается undefined.
 */
export const getListItemProps = (
    children: React.ReactNode,
    index: number | undefined,
): IDropdownListItemProps | undefined => {
    let itemProps: IDropdownListItemProps | undefined;

    React.Children.forEach(children, (child, childIndex) => {
        if (childIndex === index && React.isValidElement<IDropdownListItemProps>(child)) {
            itemProps = child.props;
        }
    });

    return itemProps;
};

/**
 * Возвращает индекс элемента, который становится активным при переходе к следующему (ArrowDown)
 * или предыдущему (ArrowUp) элементу (нумерация как у React.Children.map). Переход идёт по кругу
 * и пропускает children, которые не являются React-элементами (null, false, строки).
 * Если активный индекс не задан или не указывает на элемент, следующим становится первый элемент, предыдущим — последний.
 * Если элементов нет, возвращается undefined.
 */
export const getNextActiveListItemIndex = (
    children: React.ReactNode,
    activeIndex: number | undefined,
    direction: "next" | "previous",
): number | undefined => {
    const itemIndexes: number[] = [];

    React.Children.forEach(children, (child, index) => {
        if (React.isValidElement(child)) {
            itemIndexes.push(index);
        }
    });

    if (itemIndexes.length === 0) {
        return undefined;
    }

    const position = activeIndex === undefined ? -1 : itemIndexes.indexOf(activeIndex);

    if (position === -1) {
        return direction === "next" ? itemIndexes[0] : itemIndexes[itemIndexes.length - 1];
    }

    const step = direction === "next" ? 1 : -1;

    return itemIndexes[(position + step + itemIndexes.length) % itemIndexes.length];
};

/**
 * Возвращает индекс выбранного (selected) элемента списка.
 * Если выбранных элементов несколько, возвращается индекс последнего из них.
 * Если выбранных элементов нет, возвращается undefined.
 */
export const getSelectedListItemIndex = (children: React.ReactNode): number | undefined => {
    let selectedIndex: number | undefined;

    React.Children.forEach(children, (child, index) => {
        if (React.isValidElement<IDropdownListItemProps>(child) && child.props.selected) {
            selectedIndex = index;
        }
    });

    return selectedIndex;
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
