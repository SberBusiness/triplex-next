import React from "react";
import { IUnorderedListExtendedProps, IUnorderedListExtendedItemProps } from "../UnorderedListExtended";
import { DataAttributes } from "../../types";

/** Свойства компонента UnorderedList. */
export interface IUnorderedListProps extends Omit<IUnorderedListExtendedProps, "children"> {
    /** Массив конфигурации элементов списка. */
    items?: IUnorderedListItemProps[];
}

/** Свойства компонента UnorderedListItem. */
export interface IUnorderedListItemProps extends IUnorderedListExtendedItemProps, DataAttributes {
    /** Кастомный маркер для элемента списка. */
    marker?: React.ReactNode;
}
