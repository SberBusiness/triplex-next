import { ISliderExtendedDot, ISliderExtendedStep } from "./SliderExtendedContext";

interface ISliderExtendedUtils {
    /**
     * Возвращает нормализованное(от 0 до 100) значение позиции курсора.
     */
    getNormalizedCursorValue: (params: { cursorXPosition: number; railNode: HTMLDivElement }) => number;
    /**
     * Возвращает ближайшую точку.
     */
    getNearestDotByValue: (params: { value: number; dots: ISliderExtendedDot[] }) => ISliderExtendedDot;
    /**
     * Возвращает ближайший шаг.
     */
    getNearestStep: (params: { normalizedValue: number; steps: ISliderExtendedStep[] }) => ISliderExtendedStep;
    /**
     * Возвращает нормализованное(от 0 до 100) value.
     */
    getNormalizedValue: (params: { max: number; min: number; value: number }) => number;
    /**
     * Возвращает индекс значения в массиве steps.
     */
    getStepIndexByNormalizedValue: (params: { normalizedValue: number; steps: ISliderExtendedStep[] }) => number;
}

export const SliderExtendedUtils: ISliderExtendedUtils = {
    getNearestDotByValue: ({ value, dots }) => {
        let nearestDot: ISliderExtendedDot = dots[0];
        let delta = Infinity;

        dots.forEach((dot) => {
            const thisDelta = Math.abs(dot.value - value);

            if (thisDelta < delta) {
                delta = thisDelta;
                nearestDot = dot;
            }
        });

        return nearestDot;
    },
    getNearestStep: ({ normalizedValue, steps }) => {
        // Ближайший шаг.
        let nearestStep = steps[0];
        // Разница между шагом и текущим положением Dot.
        let nearestStepDelta = 100;

        steps.forEach((s) => {
            const stepDelta = Math.abs(normalizedValue - s.normalizedValue);
            if (stepDelta < nearestStepDelta) {
                nearestStepDelta = stepDelta;
                nearestStep = s;
            }
        });

        return nearestStep;
    },

    getNormalizedCursorValue: ({ cursorXPosition, railNode }) =>
        ((cursorXPosition - railNode.getBoundingClientRect().left) * 100) / railNode.offsetWidth,
    getNormalizedValue: ({ max, min, value }) => {
        const valuesLength = max - min;
        const valueMinDelta = value - min;
        const normalizedValue = (valueMinDelta * 100) / valuesLength;

        return Math.min(100, Math.max(0, normalizedValue));
    },
    getStepIndexByNormalizedValue: ({ normalizedValue, steps }) => {
        let index = 0;

        steps.some((step, i) => {
            if (step.normalizedValue === normalizedValue) {
                index = i;
                return true;
            }
        });

        return index;
    },
};
