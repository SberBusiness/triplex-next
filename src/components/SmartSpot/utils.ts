import { BREATHING_PRESET, DRIFT_PRESET } from "./consts";
import { ESmartSpotAnimation } from "./enums";

/** Кадр анимации: сдвиг слоя пятен и масштаб каждого пятна. */
export interface ISmartSpotFrame {
    /** Сдвиг слоя пятен по горизонтали, px. */
    x: number;
    /** Сдвиг слоя пятен по вертикали, px. */
    y: number;
    /** Масштаб каждого пятна. */
    scale: number;
}

/** Параметры движения, переопределяющие значения пресета. */
export interface ISmartSpotMotion {
    /** Дистанция движения (радиус по горизонтали), px. */
    distance?: number;
    /** Длительность одного цикла, мс. */
    duration?: number;
}

/** Доля пройденного цикла в момент t, 0..1. Для неположительного периода — 0. */
const getCycleProgress = (t: number, period: number): number => (period > 0 ? (t % period) / period : 0);

/**
 * Длительность цикла анимации, мс: переданная или значение пресета. Для None — 0.
 */
export const getSmartSpotDuration = (animation: ESmartSpotAnimation, duration?: number): number => {
    switch (animation) {
        case ESmartSpotAnimation.DRIFT:
            return duration ?? DRIFT_PRESET.duration;
        case ESmartSpotAnimation.BREATHING:
            return duration ?? BREATHING_PRESET.duration;
        default:
            return 0;
    }
};

/**
 * Возвращает кадр анимации в момент t (мс).
 * Drift двигает слой пятен по эллипсу, Breathing масштабирует каждое пятно, None — статичный кадр.
 * distance и duration переопределяют значения пресета; пропорции эллипса сохраняются.
 */
export const getSmartSpotFrame = (
    animation: ESmartSpotAnimation,
    t: number,
    { distance, duration }: ISmartSpotMotion = {},
): ISmartSpotFrame => {
    const progress = getCycleProgress(t, getSmartSpotDuration(animation, duration));

    switch (animation) {
        case ESmartSpotAnimation.DRIFT: {
            const { ratioY, startAngle, direction } = DRIFT_PRESET;
            const radiusX = distance ?? DRIFT_PRESET.distance;
            // Ось y направлена вниз, поэтому положительное direction — движение по часовой стрелке на экране.
            const theta = startAngle + direction * 2 * Math.PI * progress;

            return { x: Math.cos(theta) * radiusX, y: Math.sin(theta) * radiusX * ratioY, scale: 1 };
        }
        case ESmartSpotAnimation.BREATHING: {
            const { minScale, maxScale } = BREATHING_PRESET;
            // Треугольная волна 0 → 1 → 0: первая половина цикла — рост, вторая — уменьшение.
            const wave = 1 - Math.abs(2 * progress - 1);

            return { x: 0, y: 0, scale: minScale + (maxScale - minScale) * wave };
        }
        default:
            return { x: 0, y: 0, scale: 1 };
    }
};
