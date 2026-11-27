/** Размытие фигуры по умолчанию, px. */
export const DEFAULT_BLUR = 60;

/** Пресет Drift: фигура движется по эллипсу. */
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

/** Пресет Breathing: масштаб фигуры пульсирует на месте. */
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
