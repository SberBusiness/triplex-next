import { ESmartSpotAnimation } from "./enums";

/** Кадр анимации: сдвиг слоя пятен и масштаб каждого пятна. */
export interface ISmartSpotFrame {
    x: number;
    y: number;
    scale: number;
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
    const phase = 2 * Math.PI * ((t % period) / period);
    const theta = startAngle + direction * phase;
    // Смещение слоя пятен по эллипсу, px. Масштаб не меняется.
    return { x: Math.cos(theta) * radiusX, y: Math.sin(theta) * radiusY, scale: 1 };
};

/**
 * Возвращает кадр анимации в момент t (мс).
 * Drift, Wave и Orbit двигают слой пятен целиком, Breathing масштабирует каждое пятно.
 */
export const getSmartSpotFrame = (animation: ESmartSpotAnimation, t: number): ISmartSpotFrame => {
    switch (animation) {
        case ESmartSpotAnimation.DRIFT:
            return getEllipseFrame(t, 8000, 50, 25, Math.PI / 2, -1);
        case ESmartSpotAnimation.WAVE:
            return getEllipseFrame(t, 3000, 30, 9, Math.PI / 2, -1);
        case ESmartSpotAnimation.ORBIT:
            return getEllipseFrame(t, 10000, 250, 250, 0, 1);
        case ESmartSpotAnimation.BREATHING: {
            // Масштаб 0.9 → 1.1 за 4000 мс и обратно за 4000 мс, слой на месте.
            const q = (t % 8000) / 4000;
            const k = q <= 1 ? q : 2 - q;
            return { x: 0, y: 0, scale: 0.9 + 0.2 * k };
        }
        default:
            return { x: 0, y: 0, scale: 1 };
    }
};
