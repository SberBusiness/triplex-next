import React from "react";
import { IUnorderedListExtendedProps, IUnorderedListExtendedItemProps } from "../UnorderedListExtended";

/** Свойства компонента UnorderedList. */
export interface IUnorderedListProps extends Omit<IUnorderedListExtendedProps, "children"> {
    /** Массив конфигурации элементов списка. */
    items?: IUnorderedListItemProps[];
}

/** Свойства компонента UnorderedListItem. */
export interface IUnorderedListItemProps extends IUnorderedListExtendedItemProps {
    /** Уникальный и стабильный ключ элемента списка. */
    key: React.Key;
    /** Кастомный маркер для элемента списка. */
    marker?: React.ReactNode;
}
