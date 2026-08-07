import React from "react";

/** Свойства контекста CalendarView. */
export interface ICalendarViewContext {
    /** Признак того, что фокус находится на одной из ячеек текущего вида календаря. */
    viewItemFocusedRef: React.MutableRefObject<boolean>;
}

/** Контекст компонента CalendarView. */
export const CalendarViewContext = React.createContext<ICalendarViewContext>({
    viewItemFocusedRef: { current: false },
});
