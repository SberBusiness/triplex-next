/** Вариант выбора даты в календаре. */
export enum ECalendarPickType {
    datePick,
    monthYearPick,
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
