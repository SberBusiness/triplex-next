import React from "react";

/**
 * Свойства компонента OrderedList.
 * Кроме start принимает стандартные атрибуты <ol>.
 */
export interface IOrderedListProps extends React.OlHTMLAttributes<HTMLOListElement> {
    /** Начальный номер списка. По умолчанию 1. */
    start?: number;
}

/** Свойства компонента OrderedListItem. */
export interface IOrderedListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}
