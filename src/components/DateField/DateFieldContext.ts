import React from "react";
import { IDateFieldProps } from "./types";

/** Свойства контекста компонента DatePickerExtended. */
interface IDateFieldContext extends Pick<IDateFieldProps, "onChange"> {
    inputFocusedRef: React.MutableRefObject<boolean | null>;
    triggerChangeFromInput: () => void;
}

/** Контекст компонента MonthYearField. */
export const DateFieldContext = React.createContext<IDateFieldContext>({
    inputFocusedRef: { current: null },
    onChange: () => {},
    triggerChangeFromInput: () => {},
});
