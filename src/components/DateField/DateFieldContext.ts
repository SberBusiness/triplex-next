import React from "react";
import { IDateFieldProps } from "./types";

/** Свойства контекста компонента DateField. */
interface IDateFieldContext extends Pick<IDateFieldProps, "onChange"> {
    /** Находится ли поле ввода в фокусе. */
    inputFocusedRef: React.MutableRefObject<boolean | null>;
    /** Зафиксировать введённое в поле значение: вызвать onChange либо откатить поле к последнему валидному значению. */
    triggerChangeFromInput: () => void;
}

/** Контекст компонента DateField. */
export const DateFieldContext = React.createContext<IDateFieldContext>({
    inputFocusedRef: { current: null },
    onChange: () => {},
    triggerChangeFromInput: () => {},
});
