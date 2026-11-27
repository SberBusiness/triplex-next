/** Пресет анимации SmartSpot. */
export enum ESmartSpotAnimation {
    /** Медленный дрейф фигуры по эллипсу. */
    DRIFT = "drift",
    /** Пульсация размера фигуры. */
    BREATHING = "breathing",
    /** Без анимации. */
    NONE = "none",
}

/** Форма пятна SmartSpot. */
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
