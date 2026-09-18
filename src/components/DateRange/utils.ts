import moment from "moment";
import { dateFormatYYYYMMDD } from "../../consts/DateConst";
import { EDateRangeShiftUnit } from "./enums";
import { TDateRangeValue } from "./types";

/** Сдвигает дату в формате YYYYMMDD на указанную величину. */
const shiftDate = (date: string, amount: number, unit: EDateRangeShiftUnit): string =>
    moment(date, dateFormatYYYYMMDD).add(amount, unit).format(dateFormatYYYYMMDD);

/**
 * Сдвигает обе границы диапазона дат на указанную величину.
 * Положительная величина сдвигает диапазон вперёд, отрицательная — назад.
 * Обе даты ожидаются непустыми, в формате YYYYMMDD.
 */
export const shiftDateRange = (
    [start, end]: TDateRangeValue,
    amount: number,
    unit: EDateRangeShiftUnit,
): TDateRangeValue => [shiftDate(start, amount, unit), shiftDate(end, amount, unit)];
