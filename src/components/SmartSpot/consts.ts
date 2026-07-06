import { ESmartSpotStatus } from "./enums";

/** Размытие по умолчанию, px. */
export const DEFAULT_BLUR = 200;

/** Параметры пятна. Координаты — левый верхний угол квадрата, в который вписан пятно, от левого верхнего угла родительского элемента, px. */
export interface ISmartSpotSpotConfig {
    x: number;
    y: number;
    /** Диаметр, px. */
    diameter: number;
    /** Прозрачность пятна, 0..1. */
    opacity: number;
}

/** Пятна в порядке отрисовки. */
export interface ISmartSpotStatusConfig {
    spots: ISmartSpotSpotConfig[];
}

/** Пятна по статусам. */
export const STATUS_CONFIG: Record<ESmartSpotStatus, ISmartSpotStatusConfig> = {
    [ESmartSpotStatus.SUCCESS]: {
        spots: [
            { x: -75, y: -389, diameter: 587, opacity: 0.5 },
            { x: -220, y: -120, diameter: 562, opacity: 1 },
            { x: -114, y: -95, diameter: 400, opacity: 0.53 },
            { x: -114, y: -95, diameter: 290, opacity: 0.53 },
        ],
    },
    [ESmartSpotStatus.WARNING]: {
        spots: [
            { x: -222, y: -119, diameter: 562, opacity: 1 },
            { x: -114, y: -183, diameter: 647, opacity: 0.4 },
            { x: -79, y: -95, diameter: 350, opacity: 1 },
            { x: -79, y: -95, diameter: 409, opacity: 0.54 },
        ],
    },
    [ESmartSpotStatus.ERROR]: {
        spots: [
            { x: -222, y: -119, diameter: 562, opacity: 1 },
            { x: -114, y: -183, diameter: 623, opacity: 0.53 },
            { x: -79, y: -95, diameter: 362, opacity: 1 },
            { x: -79, y: -95, diameter: 410, opacity: 0.24 },
        ],
    },
    [ESmartSpotStatus.WAITING]: {
        spots: [
            { x: -75, y: -389, diameter: 587, opacity: 0.5 },
            { x: -222, y: -120, diameter: 635, opacity: 1 },
            { x: -114, y: -96, diameter: 406, opacity: 0.5 },
            { x: -145, y: -125, diameter: 350, opacity: 0.7 },
        ],
    },
};
