import { ISliderExtendedDot, ISliderExtendedStep } from "./SliderExtendedContext";

/** Утилиты расчёта позиций SliderExtended. */
interface ISliderExtendedUtils {
    /**
     * Возвращает нормализованное (от 0 до 100) значение позиции курсора.
     * Значение выходит за пределы диапазона, если курсор находится за границами полосы.
     */
    getNormalizedCursorValue: (params: { cursorXPosition: number; railNode: HTMLDivElement }) => number;
    /**
     * Возвращает ближайшую к value точку. При равном удалении — первую из них.
     * Возвращает undefined, если ни одна точка не зарегистрирована.
     */
    getNearestDotByValue: (params: { value: number; dots: ISliderExtendedDot[] }) => ISliderExtendedDot | undefined;
    /**
     * Возвращает ближайший к normalizedValue шаг. При равном удалении — первый из них.
     * Массив steps непустой: SliderExtended не рендерит содержимое, пока шаги не рассчитаны.
     */
    getNearestStep: (params: { normalizedValue: number; steps: ISliderExtendedStep[] }) => ISliderExtendedStep;
    /**
     * Возвращает нормализованное (от 0 до 100) value, обрезая его по границам диапазона.
     */
    getNormalizedValue: (params: { max: number; min: number; value: number }) => number;
    /**
     * Возвращает индекс шага с указанным normalizedValue. Если такого шага нет, возвращает 0.
     */
    getStepIndexByNormalizedValue: (params: { normalizedValue: number; steps: ISliderExtendedStep[] }) => number;
}

export const SliderExtendedUtils: ISliderExtendedUtils = {
    getNearestDotByValue: ({ value, dots }) =>
        dots.reduce<ISliderExtendedDot | undefined>((nearestDot, dot) => {
            if (!nearestDot) {
                return dot;
            }

            return Math.abs(dot.value - value) < Math.abs(nearestDot.value - value) ? dot : nearestDot;
        }, undefined),
    getNearestStep: ({ normalizedValue, steps }) =>
        steps.reduce(
            (nearestStep, step) =>
                Math.abs(normalizedValue - step.normalizedValue) <
                Math.abs(normalizedValue - nearestStep.normalizedValue)
                    ? step
                    : nearestStep,
            steps[0],
        ),
    getNormalizedCursorValue: ({ cursorXPosition, railNode }) =>
        ((cursorXPosition - railNode.getBoundingClientRect().left) * 100) / railNode.offsetWidth,
    getNormalizedValue: ({ max, min, value }) => {
        const valuesLength = max - min;

        // Вырожденный диапазон, нормализовать нечего.
        if (valuesLength === 0) {
            return 0;
        }

        const normalizedValue = ((value - min) * 100) / valuesLength;

        return Math.min(100, Math.max(0, normalizedValue));
    },
    getStepIndexByNormalizedValue: ({ normalizedValue, steps }) =>
        Math.max(
            0,
            steps.findIndex((step) => step.normalizedValue === normalizedValue),
        ),
};
