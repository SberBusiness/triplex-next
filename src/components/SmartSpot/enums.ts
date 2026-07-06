/** Статус SmartSpot. Задаёт цвет фона и набор пятен. */
export enum ESmartSpotStatus {
    /** Успешное завершение. */
    SUCCESS = "success",
    /** Предупреждение. */
    WARNING = "warning",
    /** Ошибка. */
    ERROR = "error",
    /** Ожидание, системный статус. */
    WAITING = "waiting",
}

/** Пресет анимации SmartSpot. */
export enum ESmartSpotAnimation {
    /** Медленный дрейф слоя пятен по эллипсу. */
    DRIFT = "drift",
    /** Быстрое покачивание слоя пятен по узкому эллипсу. */
    WAVE = "wave",
    /** Движение слоя пятен по окружности. */
    ORBIT = "orbit",
    /** Пульсация размера каждого пятна. */
    BREATHING = "breathing",
    /** Без анимации. */
    NONE = "none",
}
