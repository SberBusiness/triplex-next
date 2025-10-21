/** Перечисление направлений сортировки колонки. (ASC - по возрастанию, DESC - по убыванию) */
export enum EOrderDirection {
    NONE = "none",
    ASC = "asc",
    DESC = "desc",
}

/** Перечисление горизонтального выравнивания ячейки. */
export enum EHorizontalAlign {
    LEFT = "left",
    RIGHT = "right",
    CENTER = "center",
}

/** Перечисление вертикального выравнивания ячейки. */
export enum EVerticalAlign {
    BASELINE = "baseline",
    SUB = "sub",
    SUPER = "super",
    TEXT_TOP = "text-top",
    TEXT_BOTTOM = "text-bottom",
    MIDDLE = "middle",
    TOP = "top",
    BOTTOM = "bottom",
}

/** Перечисление типов ячейки (для внутренних отступов и т.д.). */
export enum ECellType {
    TEXT = "text",
    COMPONENTS = "components",
    CHECKBOX = "checkbox",
}
