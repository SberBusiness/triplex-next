/** Статус шага. */
export enum EStepStatus {
    DEFAULT = "default",
    DONE = "done",
    ACTIVE = "active",
    ERROR = "error",
    WARNING = "warning",
    DISABLED = "disabled",
}

/** Позиция шага относительно других. */
export enum EStepPosition {
    /** Обычная позиция. */
    Default = "Default",
    /** Первый по оси X. */
    XFirst = "XFirst",
    /** Последний по оси X. */
    XLast = "XLast",
}
