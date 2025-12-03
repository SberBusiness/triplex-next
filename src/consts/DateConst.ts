import moment from "moment";
import { IDateLimitRange } from "@sberbusiness/triplex-next/types/DateTypes";

/** Количество дней недели. */
export const WEEKDAYS_SET: number[] = [0, 1, 2, 3, 4, 5, 6];

/** Количество недель месяца. */
export const WEEKS_SET: number[] = [0, 1, 2, 3, 4, 5];

/** Количество месяцев года. */
export const MONTHS_SET: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

/** Формат даты, отображаемый в заголовке. */
export const headerDateFormat = "MMMM YYYY";

/** Транспортный (backend) формат даты. */
export const dateFormatYYYYMMDD = "YYYYMMDD";

/** Глобальный ограничитель для выбора дат. */
export const globalLimitRange: IDateLimitRange = {
    dateFrom: moment(new Date("1900-01-01")),
    dateTo: moment(new Date("2199-12-31")),
};
