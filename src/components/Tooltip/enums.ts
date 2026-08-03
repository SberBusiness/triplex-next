/**
 * Параметры размера.
 *
 * H Высота.
 * W Ширина.
 */
export enum ETooltipSizeParameter {
    H = "h",
    W = "w",
}

/**
 * Начало координат (первые координаты).
 *
 * X икс.
 * Y игрек.
 */
export enum ETooltipStartCoordinates {
    X = "x",
    Y = "y",
}

/**
 * Конец координат (конечные координаты).
 *
 * X икс.
 * Y игрек.
 */
export enum ETooltipEndCoordinates {
    X = "x2",
    Y = "y2",
}

/**
 * Enum типов осей.
 *
 * MAIN Главная ось.
 * CROSS Вспомогательная, поперечная, перекрестная.
 */
export enum ETooltipAxesType {
    MAIN = "main",
    CROSS = "cross",
}

/**
 * Enum типов расположения элементов (flow) для flex.
 *
 * COLUMN Столбец.
 * ROW Ряд.
 */
export enum ETooltipFlowTypes {
    COLUMN = "column",
    ROW = "row",
}

/**
 * Enum типов настроек позиционирования.
 *
 * SIDE Выравнивание подсказки вдоль основной оси зоны.
 * STANDING Положение подсказки относительно целевого элемента.
 * FLOW Расположение элементов (направление flex).
 */
export enum ETooltipTypeName {
    SIDE = "side",
    STANDING = "standing",
    FLOW = "flow",
}

/**
 * Предпочитаемое место для поповера.
 *
 * ABOVE Сверху.
 * BELOW Снизу.
 * RIGHT Справа.
 * LEFT Слева.
 */
export enum ETooltipPreferPlace {
    ABOVE = "above",
    BELOW = "below",
    RIGHT = "right",
    LEFT = "left",
}

/**
 * Выравнивание указателя (стрелочки) подсказки относительно целевого элемента.
 *
 * END В конце.
 * CENTER По центру.
 * START В начале.
 */
export enum ETooltipAlign {
    END = "end",
    CENTER = "center",
    START = "start",
}

/**
 * Направление указателя поповера.
 *
 * UP Сверху.
 * DOWN Снизу.
 * RIGHT Справа.
 * LEFT Слева.
 */
export enum ETooltipDirection {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right",
}

/**
 * Размер подсказки (ширина тела в десктопной версии).
 *
 * SM Узкая подсказка, 192px.
 * LG Широкая подсказка, 384px.
 */
export enum ETooltipSize {
    SM = "sm",
    LG = "lg",
}
