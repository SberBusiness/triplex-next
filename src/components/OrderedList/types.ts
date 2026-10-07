import React from "react";

/** Свойства компонента OrderedList. */
export interface IOrderedListProps extends React.OlHTMLAttributes<HTMLOListElement> {
    /** Элементы списка. Обычно OrderedList.Item. */
    children?: React.ReactNode;
    /** Дополнительный CSS-класс корневого элемента. */
    className?: React.OlHTMLAttributes<HTMLOListElement>["className"];
    /** Начальный номер списка. По умолчанию 1. */
    start?: React.OlHTMLAttributes<HTMLOListElement>["start"];
    /** Пользовательские стили списка. При заданном start начальный номер имеет приоритет. */
    style?: React.OlHTMLAttributes<HTMLOListElement>["style"];
}

/** Свойства компонента OrderedListItem. */
export interface IOrderedListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}
