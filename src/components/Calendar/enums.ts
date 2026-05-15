/** Вариант выбора даты в календаре. */
export enum ECalendarPickType {
    DATE = "date",
    MONTH_YEAR = "month_year",
}

/** Режим отображения календаря. */
export enum ECalendarViewMode {
    DAYS = "days",
    MONTHS = "months",
    YEARS = "years",
}

/** Тип отметки даты календаря. */
export enum ECalendarDateMarkType {
    BASIC,
    STANDARD,
    ATTENTION,
    CRITICAL,
}
