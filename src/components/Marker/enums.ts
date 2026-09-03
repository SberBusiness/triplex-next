/** Статус Marker. Задаёт цвет точки. */
export enum EMarkerStatus {
    /** Успешное завершение. */
    SUCCESS = "success",
    /** Ошибка. */
    ERROR = "error",
    /** Предупреждение. */
    WARNING = "warning",
    /** Ожидание, процесс в работе. */
    WAITING = "waiting",
}
