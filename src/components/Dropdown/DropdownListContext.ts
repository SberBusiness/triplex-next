import React, { createContext } from "react";

/** Обработчик клавиатуры открытого списка. Возвращает true, если клавиша обработана списком. */
export type TDropdownListKeyDownHandler = (event: React.KeyboardEvent) => boolean;

/**
 * Контекст вложенного списка. Связывает DropdownList с управляющим элементом, на котором остаётся фокус.
 * Значение создаётся хуком useDropdownListKeyboard.
 */
export interface IDropdownListContext {
    /** Текущий активный элемент (его идентификатор). */
    activeDescendant: string | undefined;
    /** Установить текущий активный элемент (его идентификатор). */
    setActiveDescendant: (id?: string) => void;
    /**
     * Зарегистрировать обработчик клавиатуры открытого списка. Вызывается DropdownList.
     * Возвращает функцию снятия: она снимает обработчик, только если позже не зарегистрирован другой.
     */
    registerKeyDownHandler: (handler: TDropdownListKeyDownHandler) => () => void;
}

export const DropdownListContext = createContext<IDropdownListContext>({
    activeDescendant: undefined,
    setActiveDescendant: () => {},
    registerKeyDownHandler: () => () => {},
});
