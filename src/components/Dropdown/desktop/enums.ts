/** Варианты направления Dropdown. */
export enum EDropdownDirection {
    AUTO = "auto",
    BOTTOM = "bottom",
    TOP = "top",
}

/** Варианты выравнивания Dropdown. */
export enum EDropdownAlignment {
    AUTO = "auto",
    LEFT = "left",
    RIGHT = "right",
}

/** Варианты расчёта ширины Dropdown. */
export enum EDropdownWidth {
    /** Ширина определяется контентом. */
    CONTENT = "content",
    /** Ширина равна ширине управляющего элемента. */
    TARGET = "target",
    /** Минимальная ширина ограничена шириной управляющего элемента. */
    MIN_TARGET = "min-target",
}
