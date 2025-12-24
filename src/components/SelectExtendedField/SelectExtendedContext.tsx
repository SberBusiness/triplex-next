import React from "react";

/** Свойства контекста компонента SelectExtendedField. */
interface ISelectExtendedFieldContext {
    dropdownOpen: boolean;
    setDropdownOpen: (open: boolean) => void;
}

/** Контекст компонента SelectExtendedField. */
export const SelectExtendedFieldContext = React.createContext<ISelectExtendedFieldContext>({
    dropdownOpen: false,
    setDropdownOpen: () => {},
});
