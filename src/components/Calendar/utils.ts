import moment from "moment";
import { headerDateFormat, globalLimitRange } from "@sberbusiness/triplex-next/consts/DateConst";
import { ECalendarViewMode } from "@sberbusiness/triplex-next/components/Calendar/enums";
import { TPickedDate, TPickedDateProp } from "@sberbusiness/triplex-next/components/Calendar/types";
import { IDateLimitRange } from "@sberbusiness/triplex-next/types/DateTypes";

/**
 * Приведение даты к типу Moment.
 * @param value Значение.
 * @param [format] Формат для значения.
 */
export function parsePickedDate(value: TPickedDateProp | undefined, format?: string): TPickedDate {
    if (!value) {
        return null;
    } else if (typeof value === "string") {
        return moment(value, format);
    } else {
        return value;
    }
}

/**
 * Получить актуальный заголовок.
 * @param {TPickedDate} pickedDate Выбранная дата в формате Moment.
 * @param {Moment} [date] Дата для построения заголовка.
 */
export function getHeader(pickedDate: TPickedDate, date?: moment.Moment): string {
    let currentDate;

    if (date && date.isValid()) {
        currentDate = date;
    } else if (pickedDate && pickedDate.isValid()) {
        currentDate = pickedDate;
    } else {
        currentDate = moment();
    }

    return currentDate.format(headerDateFormat);
}

/**
 * Получить текст заголовка из текущей даты.
 * @param viewDate Отображаемая дата.
 * @param viewMode Текущая вкладка.
 */
export function formatDate(viewDate: TPickedDate, viewMode: ECalendarViewMode): string {
    const checkedDate = viewDate ? viewDate : moment();

    switch (viewMode) {
        case ECalendarViewMode.DAYS:
            return getHeader(checkedDate);
        case ECalendarViewMode.MONTHS:
            return checkedDate.clone().format("YYYY");
        case ECalendarViewMode.YEARS: {
            const yearFrom = checkedDate.clone().add(-5, "y").format("YYYY");
            const yearTo = checkedDate.clone().add(6, "y").format("YYYY");

            return `${yearFrom} - ${yearTo}`;
        }
    }
}

/** Проверяет, выходит ли дата за разрешённый период. */
export function isDateOutOfRange(date: moment.Moment, limitRange: IDateLimitRange, unit: "day" | "month" | "year") {
    const dateFrom = limitRange.dateFrom || globalLimitRange.dateFrom;
    const dateTo = limitRange.dateTo || globalLimitRange.dateTo;

    return date.isBefore(dateFrom, unit) || date.isAfter(dateTo, unit);
}

/** Проверяет, является ли день недоступным для выбора. */
export function isDayDisabled(day: string, disabledDays: string[] | undefined) {
    if (disabledDays === undefined) {
        return false;
    }

    return disabledDays.includes(day);
}
