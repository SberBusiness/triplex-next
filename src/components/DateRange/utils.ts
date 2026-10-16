import moment from "moment";
import { EDateRangeShiftUnit } from "./enums";
import { TDateRangeValue } from "./types";

/**
 * Сдвигает обе границы диапазона дат на указанную величину.
 * Положительная величина сдвигает диапазон вперёд, отрицательная — назад.
 * Обе даты строго парсятся в формате format. Если хотя бы одна невалидна, возвращает null.
 */
export const shiftDateRange = (
    [start, end]: TDateRangeValue,
    amount: number,
    unit: EDateRangeShiftUnit,
    format: string,
): TDateRangeValue | null => {
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
