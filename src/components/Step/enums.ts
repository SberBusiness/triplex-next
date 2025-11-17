/** Статус шага. */
export enum EStepStatus {
    SUCCESS = "success",
    WAIT = "wait",
    // ERROR = "error",
    // WARNING = "warning",
}

/** Позиция шага, относительно других. */
export enum EStepPosition {
    /** Обычная позиция. */
    Default = "Default",
    /** Первый по оси X. */
    XFirst = "XFirst",
    /** Последний по оси X. */
    XLast = "XLast",
}
