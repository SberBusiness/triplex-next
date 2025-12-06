import React from "react";
import moment from "moment";
import { dateFormatYYYYMMDD, globalLimitRange } from "@sberbusiness/triplex-next/consts/DateConst";
import { ECalendarPickType, ECalendarViewMode } from "@sberbusiness/triplex-next/components/Calendar/enums";
import { ICalendarCommonProps } from "@sberbusiness/triplex-next/components/Calendar/types";

/** Свойства контекста CalendarView. */
export interface ICalendarContext
    extends Pick<ICalendarCommonProps, "format" | "markedDays" | "disabledDays">,
        Required<Pick<ICalendarCommonProps, "pickType" | "limitRange" | "onPageChange" | "onViewChange">> {
    /** Дата, являющая курсором для навигации по интерфейсу. */
    viewDate: moment.Moment;
    /** Вид отображения. */
    viewMode: ECalendarViewMode;
    /** Уникальный идентификатор для связи периода с таблицей. */
    periodId: string;
    /** Функция, вызывающаяся при выборе даты. */
    onDateSelect: (date: moment.Moment) => void;
}

/** Контекст компонента Calendar. */
export const CalendarContext = React.createContext<ICalendarContext>({
    format: dateFormatYYYYMMDD,
    limitRange: globalLimitRange,
    pickType: ECalendarPickType.datePick,
    viewDate: moment().startOf("day"),
    viewMode: ECalendarViewMode.DAYS,
    periodId: "",
    onDateSelect: () => {},
    onPageChange: () => {},
    onViewChange: () => {},
});
