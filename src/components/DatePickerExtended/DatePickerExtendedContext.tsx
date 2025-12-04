import React from "react";

/** Свойства контекста компонента DatePickerExtended. */
interface IDatePickerExtendedContext {
    dropdownOpen: boolean;
    mouseUsedRef: React.MutableRefObject<boolean>;
    setDropdownOpen: (open: boolean) => void;
}

/** Контекст компонента DatePickerExtended. */
export const DatePickerExtendedContext = React.createContext<IDatePickerExtendedContext>({
    dropdownOpen: false,
    mouseUsedRef: { current: false },
    setDropdownOpen: () => {},
});
