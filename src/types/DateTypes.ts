import { Moment } from "moment";

/** Диапазон выбираемых дат. Обе границы опциональны — незаданная сторона периода не ограничивает выбор. */
export interface IDateLimitRange {
    /** Дата начала периода. Если не задана, используется глобальная нижняя граница (`globalLimitRange.dateFrom`). */
    dateFrom?: Moment;
    /** Дата конца периода. Если не задана, используется глобальная верхняя граница (`globalLimitRange.dateTo`). */
    dateTo?: Moment;
}
