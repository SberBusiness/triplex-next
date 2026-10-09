import { ANIMATION_PRESETS } from "./consts";
import { ESmartSpotAnimation } from "./enums";

/** Кадр анимации: сдвиг слоя пятен и масштаб каждого пятна. */
export interface ISmartSpotFrame {
    x: number;
    y: number;
    scale: number;
}

/** Параметры движения, переопределяющие значения пресета. */
export interface ISmartSpotMotion {
    /** Дистанция движения (радиус по горизонтали), px. */
    distance?: number;
    /** Длительность одного цикла, мс. */
    duration?: number;
}

/**
 * Сдвиг слоя пятен по эллипсу для анимаций Drift, Wave и Orbit.
 */
const getEllipseFrame = (
    t: number,
    period: number,
    radiusX: number,
    radiusY: number,
    startAngle: number,
    // Направление движения: 1 — по часовой стрелке на экране (ось y вниз), -1 — против.
    direction: 1 | -1,
): ISmartSpotFrame => {
    // Фаза цикла в радианах: 0 в начале, 2π в конце, затем снова 0.
    const phase = period > 0 ? 2 * Math.PI * ((t % period) / period) : 0;
    const theta = startAngle + direction * phase;
    // Смещение слоя пятен по эллипсу, px. Масштаб не меняется.
    return { x: Math.cos(theta) * radiusX, y: Math.sin(theta) * radiusY, scale: 1 };
};

/**
 * Длительность цикла анимации, мс: переданная или значение пресета. Для None — 0.
 */
export const getSmartSpotDuration = (animation: ESmartSpotAnimation, duration?: number): number =>
    animation === ESmartSpotAnimation.NONE ? 0 : (duration ?? ANIMATION_PRESETS[animation].duration);

/**
 * Возвращает кадр анимации в момент t (мс).
 * Drift, Wave и Orbit двигают слой пятен целиком, Breathing масштабирует каждое пятно.
 * distance и duration переопределяют значения пресета; пропорции эллипса сохраняются.
 */
export const getSmartSpotFrame = (
    animation: ESmartSpotAnimation,
    t: number,
    { distance, duration }: ISmartSpotMotion = {},
): ISmartSpotFrame => {
    switch (animation) {
        case ESmartSpotAnimation.DRIFT:
        case ESmartSpotAnimation.WAVE:
        case ESmartSpotAnimation.ORBIT: {
            const preset = ANIMATION_PRESETS[animation];
            const radiusX = distance ?? preset.distance;
            const radiusY = radiusX * preset.ratioY;
            return getEllipseFrame(
                t,
                duration ?? preset.duration,
                radiusX,
                radiusY,
                preset.startAngle,
                preset.direction,
            );
        }
        case ESmartSpotAnimation.BREATHING: {
            // Масштаб 0.9 → 1.1 за половину цикла и обратно за вторую половину, слой на месте.
            const period = duration ?? ANIMATION_PRESETS[animation].duration;
            const q = period > 0 ? (t % period) / (period / 2) : 0;
            const k = q <= 1 ? q : 2 - q;
            return { x: 0, y: 0, scale: 0.9 + 0.2 * k };
        }
        default:
            return { x: 0, y: 0, scale: 1 };
    }
};
