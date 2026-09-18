import moment from "moment";
import { dateFormatYYYYMMDD } from "../../consts/DateConst";
import { EDateRangeShiftUnit } from "./enums";

/** Сдвигает дату в формате YYYYMMDD на указанную величину. */
const shiftDate = (date: string, amount: number, unit: EDateRangeShiftUnit): string =>
    moment(date, dateFormatYYYYMMDD).add(amount, unit).format(dateFormatYYYYMMDD);

/**
 * Сдвигает обе границы диапазона дат (`TDateRangeValue`) на указанную величину.
 * Положительная величина сдвигает диапазон вперёд, отрицательная — назад.
 * Обе даты ожидаются непустыми, в формате YYYYMMDD.
 *
 * Тип диапазона описан структурно, а не импортом `TDateRangeValue` из `DateRange.tsx`:
 * импорт замкнул бы цикл модулей, который ловит `npm run deps:cycles`.
 */
export const shiftDateRange = (
    [start, end]: [string, string],
    amount: number,
    unit: EDateRangeShiftUnit,
): [string, string] => [shiftDate(start, amount, unit), shiftDate(end, amount, unit)];
