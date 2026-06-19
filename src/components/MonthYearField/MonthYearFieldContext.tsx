import React from "react";
import { IMonthYearFieldProps } from "./types";

/** Свойства контекста компонента MonthYearField. */
interface IMonthYearFieldContext extends Pick<IMonthYearFieldProps, "onChange"> {}

/** Контекст компонента MonthYearField. */
export const MonthYearFieldContext = React.createContext<IMonthYearFieldContext>({
    onChange: () => {},
});
