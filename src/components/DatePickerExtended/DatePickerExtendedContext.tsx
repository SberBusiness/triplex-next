import React from "react";

/** Свойства контекста компонента DatePickerExtended. */
interface IDatePickerExtendedContext {
    /** Выпадающий календарь открыт. */
    dropdownOpen: boolean;
    /** Флаг взаимодействия пользователя мышью. Управляет поведением FocusTrap выпадающего календаря. */
    mouseUsedRef: React.MutableRefObject<boolean>;
    /** Открывает и закрывает выпадающий календарь. */
    setDropdownOpen: (open: boolean) => void;
}

/**
 * Контекст компонента DatePickerExtended.
 * Через него целевой элемент (renderTarget) управляет открытостью выпадающего календаря.
 */
export const DatePickerExtendedContext = React.createContext<IDatePickerExtendedContext>({
    dropdownOpen: false,
    mouseUsedRef: { current: false },
    setDropdownOpen: () => {},
});
