import moment from "moment";
import { TPickedDate } from "../Calendar/types";
import { IDateLimitRange } from "../../types/DateTypes";
import { inputDateFormat } from "./constants";
import { isDayDisabled } from "../Calendar/utils";

/** Значения DatePicker. */
interface IDatePickerValues {
    inputString: string;
    calendarDate: TPickedDate;
}

/** Утилиты для компонента DateField. */
export const DateFieldUtils = {
    /** Получить значения пикера. */
    getPickerValues: (
        value: string,
        format: string,
        limitRange: IDateLimitRange,
        disabledDays?: string[],
    ): IDatePickerValues => {
        if (value.length === 0) {
            return { calendarDate: null, inputString: "" };
        }

        const date = DateFieldUtils.getCalendarDate(value, format, limitRange, disabledDays);

        if (date === null) {
            return { calendarDate: null, inputString: "" };
        }

        return { calendarDate: date, inputString: date.format(inputDateFormat) };
    },

    /** Получить календарную дату. */
    getCalendarDate: (value: string, format: string, limitRange: IDateLimitRange, disabledDays?: string[]) => {
        const date = moment(value, format, true);

        if (!date.isValid() || !DateFieldUtils.isAvailableDate(date, value, limitRange, disabledDays)) {
            return null;
        }

        return date;
    },

    /** Является ли дата доступной. */
    isAvailableDate: (date: moment.Moment, value: string, limitRange: IDateLimitRange, disabledDays?: string[]) => {
        return !(
            date.isBefore(limitRange.dateFrom, "day") ||
            date.isAfter(limitRange.dateTo, "day") ||
            isDayDisabled(value, disabledDays)
        );
    },
};
