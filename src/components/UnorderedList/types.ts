import React from "react";
import { IUnorderedListExtendedProps, IUnorderedListExtendedItemProps } from "../UnorderedListExtended";
import { DataAttributes } from "../../types";

/** Свойства компонента UnorderedList. */
export interface IUnorderedListProps extends Omit<IUnorderedListExtendedProps, "children"> {
    /**
     * Массив конфигурации элементов списка. Содержимое элемента задаётся его свойством children.
     * React-ключ элемента берётся из key, при его отсутствии — из id, затем из индекса в массиве.
     */
    items?: IUnorderedListItemProps[];
}

/** Свойства компонента UnorderedListItem. */
export interface IUnorderedListItemProps extends IUnorderedListExtendedItemProps, DataAttributes {
    /** Кастомный маркер для элемента списка. По умолчанию — маркер-точка. */
    marker?: React.ReactNode;
}
