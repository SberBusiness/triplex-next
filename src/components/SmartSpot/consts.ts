import { ESmartSpotType } from "./enums";

/** Размытие слоя пятен по умолчанию, px. */
export const DEFAULT_BLUR = 60;

/**
 * Геометрия пятна. Координаты — левый верхний угол квадрата, в который вписано пятно,
 * относительно центра верхней грани родителя, px.
 */
export interface ISmartSpotSpot {
    /** Сдвиг по горизонтали от центра верхней грани, px. */
    x: number;
    /** Сдвиг по вертикали от верхней грани, px. */
    y: number;
    /** Диаметр, px. */
    diameter: number;
    /** Прозрачность, 0..1. */
    opacity: number;
}

/** Пятна по типам в порядке отрисовки. Цвет пятна задаётся в LESS по его порядковому номеру. */
export const SPOTS_BY_TYPE: Record<ESmartSpotType, ISmartSpotSpot[]> = {
    [ESmartSpotType.SUCCESS]: [
        { x: -110, y: -194, diameter: 294, opacity: 0.5 },
        { x: -183, y: -60, diameter: 281, opacity: 1 },
        { x: -130, y: -47, diameter: 200, opacity: 0.53 },
        { x: -130, y: -47, diameter: 145, opacity: 0.53 },
    ],
    [ESmartSpotType.WARNING]: [
        { x: -189, y: -59, diameter: 281, opacity: 1 },
        { x: -135, y: -91, diameter: 324, opacity: 0.4 },
        { x: -117, y: -47, diameter: 175, opacity: 1 },
        { x: -117, y: -47, diameter: 205, opacity: 0.54 },
    ],
    [ESmartSpotType.ERROR]: [
        { x: -183, y: -59, diameter: 281, opacity: 1 },
        { x: -129, y: -91, diameter: 312, opacity: 0.53 },
        { x: -111, y: -47, diameter: 181, opacity: 1 },
        { x: -111, y: -47, diameter: 205, opacity: 0.24 },
    ],
    [ESmartSpotType.WAITING]: [
        { x: -110, y: -194, diameter: 294, opacity: 0.5 },
        { x: -183, y: -60, diameter: 318, opacity: 1 },
        { x: -129, y: -48, diameter: 203, opacity: 0.5 },
        { x: -145, y: -62, diameter: 175, opacity: 0.7 },
    ],
};

/** Пресет Drift: слой пятен движется по эллипсу. */
export interface ISmartSpotDriftPreset {
    /** Радиус эллипса по горизонтали, px. */
    distance: number;
    /** Отношение радиуса по вертикали к радиусу по горизонтали. */
    ratioY: number;
    /** Длительность цикла, мс. */
    duration: number;
    /** Начальный угол, рад. */
    startAngle: number;
    /** Направление: 1 — по часовой стрелке на экране, -1 — против. */
    direction: 1 | -1;
}

/** Пресет Breathing: масштаб каждого пятна пульсирует, слой на месте. */
export interface ISmartSpotBreathingPreset {
    /** Длительность цикла (min → max → min), мс. */
    duration: number;
    /** Минимальный масштаб пятна. */
    minScale: number;
    /** Максимальный масштаб пятна. */
    maxScale: number;
}

/** Пресет анимации Drift по умолчанию. */
export const DRIFT_PRESET: ISmartSpotDriftPreset = {
    distance: 50,
    ratioY: 0.5,
    duration: 6000,
    startAngle: Math.PI / 2,
    direction: -1,
};

/** Пресет анимации Breathing по умолчанию. */
export const BREATHING_PRESET: ISmartSpotBreathingPreset = {
    duration: 6000,
    minScale: 0.9,
    maxScale: 1.1,
};
