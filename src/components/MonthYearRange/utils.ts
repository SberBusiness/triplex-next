import moment from "moment";
import { EMonthYearRangeShiftUnit } from "./enums";
import { TMonthYearRangeValue } from "./types";

/**
 * Сдвигает обе границы диапазона месяцев на указанную величину.
 * Положительная величина сдвигает диапазон вперёд, отрицательная — назад.
 * Обе даты строго парсятся в формате format. Если хотя бы одна невалидна, возвращает null.
 */
export const shiftMonthYearRange = (
    [start, end]: TMonthYearRangeValue,
    amount: number,
    unit: EMonthYearRangeShiftUnit,
    format: string,
): TMonthYearRangeValue | null => {
    const momentStart = moment(start, format, true);
    const momentEnd = moment(end, format, true);

    if (!momentStart.isValid() || !momentEnd.isValid()) {
        return null;
    }

    return [momentStart.add(amount, unit).format(format), momentEnd.add(amount, unit).format(format)];
};

/**
 * Проверяет, что дата date позже даты other. Обе даты строго парсятся в формате format,
 * поэтому порядок не зависит от расположения дня, месяца и года в строке.
 * Если хотя бы одна дата невалидна, возвращает false.
 */
export const isDateAfter = (date: string, other: string, format: string): boolean =>
    moment(date, format, true).isAfter(moment(other, format, true));
