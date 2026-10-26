/** Тип SmartSpot. Задаёт цвета и набор пятен. */
export enum ESmartSpotType {
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
    /** Пульсация размера каждого пятна. */
    BREATHING = "breathing",
    /** Без анимации. */
    NONE = "none",
}

/** Форма пятен SmartSpot. */
export enum ESmartSpotShape {
    /** Круг. */
    CIRCLE = "circle",
    /** Овал, вытянутый по горизонтали. */
    OVAL = "oval",
    /** Квадрат. */
    SQUARE = "square",
    /** Треугольник. */
    TRIANGLE = "triangle",
}
