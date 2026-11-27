import React from "react";
import { EVENT_KEY_CODES } from "../../utils/keyboard";
import { TDropdownListKeyDownHandler } from "./DropdownListContext";

/** Клавиши выбора активного элемента, если у элемента не задан keyCodesForSelection. */
const KEY_CODES_FOR_SELECTION_DEFAULT = [EVENT_KEY_CODES.SPACE, EVENT_KEY_CODES.ENTER];

/** Props элемента списка, которые читает клавиатурный обработчик списка. */
export interface IListItemKeyboardProps {
    id: string;
    onSelect?: () => void;
    keyCodesForSelection?: number[];
}

/**
 * Состояние активного элемента списка: идентификатор элемента, null — первый элемент списка,
 * undefined — активного элемента нет.
 */
export type TActiveListItemId = string | null | undefined;

/**
 * Возвращает props элементов списка в порядке children.
 * Пропускает children, которые не являются React-элементами (null, false, строки), и элементы без id.
 */
export const getListItemsProps = <T extends { id: string }>(children: React.ReactNode): T[] => {
    const itemsProps: T[] = [];

    React.Children.forEach(children, (child) => {
        if (React.isValidElement<T>(child) && child.props.id) {
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
 * Создаёт клавиатурный обработчик списка для DropdownListContext.registerKeyDownHandler.
 * ArrowUp / ArrowDown перемещают активный элемент по кругу: onNavigate получает id нового активного элемента
 * (прокрутка и обновление state — на стороне списка). Клавиши keyCodesForSelection активного элемента
 * вызывают его onSelect. У обработанной клавиши вызывается preventDefault; в списке без элементов
 * стрелки остаются управляющему элементу.
 */
export const createListKeyDownHandler =
    (
        itemsProps: IListItemKeyboardProps[],
        activeId: string | undefined,
        onNavigate: (nextActiveId: string) => void,
    ): TDropdownListKeyDownHandler =>
    (event) => {
        if (event.keyCode === EVENT_KEY_CODES.ARROW_DOWN || event.keyCode === EVENT_KEY_CODES.ARROW_UP) {
            const nextActiveId = getNextActiveListItemId(
                itemsProps.map(({ id }) => id),
                activeId,
                event.keyCode === EVENT_KEY_CODES.ARROW_DOWN ? "next" : "previous",
            );

            if (nextActiveId === undefined) {
                return false;
            }

            event.preventDefault();
            onNavigate(nextActiveId);

            return true;
        }

        const activeItemProps = itemsProps.find(({ id }) => id === activeId);

        if (!activeItemProps) {
            return false;
        }

        if ((activeItemProps.keyCodesForSelection ?? KEY_CODES_FOR_SELECTION_DEFAULT).includes(event.keyCode)) {
            event.preventDefault();
            activeItemProps.onSelect?.();

            return true;
        }

        return false;
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
    return Array.from(container.querySelectorAll<HTMLElement>("[id]")).find((node) => node.id === id) ?? null;
};
