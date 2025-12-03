import moment from "moment";
import { TPickedDate } from "../Calendar/types";
import { IDateLimitRange } from "../../types/DateTypes";
import { inputMonthYearFormat } from "./const";

/** Значения MonthYearPicker. */
interface IMonthYearPickerValues {
    inputString: string;
    calendarDate: TPickedDate;
}

/** Утилиты для компонента MonthYearPicker. */
export const MonthYearPickerUtils = {
    /** Получить значения пикера. */
    getPickerValues: (value: string, format: string, limitRange: IDateLimitRange): IMonthYearPickerValues => {
        if (value.length === 0) {
            return { calendarDate: null, inputString: "" };
        }

        const date = MonthYearPickerUtils.getCalendarDate(value, format, limitRange);

        if (date === null) {
            return { calendarDate: null, inputString: "" };
        }

        return { calendarDate: date, inputString: date.format(inputMonthYearFormat) };
    },

    /** Получить календарную дату. */
    getCalendarDate: (value: string, format: string, limitRange: IDateLimitRange) => {
        const date = moment(value, format, true);

        if (!date.isValid() || !MonthYearPickerUtils.isAvailableDate(date, value, limitRange)) {
            return null;
        }

        return date;
    },

    /** Является ли дата доступной. */
    isAvailableDate: (date: moment.Moment, value: string, limitRange: IDateLimitRange) => {
        return !(date.isBefore(limitRange.dateFrom, "day") || date.isAfter(limitRange.dateTo, "day"));
    },
};
