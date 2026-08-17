import { SliderExtendedUtils } from "../../SliderExtendedUtils";
import { ISliderExtendedDot } from "../../SliderExtendedContext";

interface ISliderExtendedMarkActions {
    /**
     * Возвращает стиль для правильного позиционирования метки.
     * Метка на дальнем краю полосы прижимается к нему через right, чтобы не выходить за границы.
     */
    getStyle: (params: { min: number; max: number; reverse: boolean; value: number }) => {
        left?: string;
        right?: number;
    };
    /**
     * Возвращает true, если одна из SliderExtendedDot находится на позиции метки.
     */
    isActive: (params: { dots: ISliderExtendedDot[]; value: number }) => boolean;
    /**
     * Возвращает true, если метка входит в выбранный диапазон при двух SliderExtendedDots. Либо в диапазон от min до текущего значения при одном SliderExtendedDot.
     */
    isInSelectedRange: (params: { dots: ISliderExtendedDot[]; min: number; value: number }) => boolean;
    /**
     * Перемещает ближайшую SliderExtendedDot на позицию метки.
     */
    moveNearestDot: (params: { dots: ISliderExtendedDot[]; value: number }) => void;
}

export const SliderExtendedMarkActions: ISliderExtendedMarkActions = {
    getStyle: ({ min, max, reverse, value }) => {
        const normalizedValue = SliderExtendedUtils.getNormalizedValue({ max, min, value });
        // Метка у дальнего края полосы: в обычном слайдере это 100%, в реверсивном — 0%.
        const isAtFarEdge = reverse ? normalizedValue === 0 : normalizedValue === 100;

        if (isAtFarEdge) {
            return { left: undefined, right: 0 };
        }

        return { left: `${reverse ? 100 - normalizedValue : normalizedValue}%`, right: undefined };
    },
    isActive: ({ dots, value }) => dots.some((dot) => dot.value === value),
    isInSelectedRange: ({ value, min, dots }) => {
        if (!dots.length) {
            return false;
        }

        // Минимальное значение при 2х SliderExtendedDots или min при одном SliderExtendedDot.
        let minValue;
        // Максимальное значение.
        let maxValue;

        // Слайдер с одной SliderExtendedDots.
        if (dots.length < 2) {
            minValue = min;
            maxValue = dots[0].value;
        } else {
            const values = dots.map((dot) => dot.value).sort((a, b) => a - b);
            minValue = values[0];
            maxValue = values[1];
        }

        return minValue <= value && value <= maxValue;
    },
    moveNearestDot: ({ value, dots }) => {
        SliderExtendedUtils.getNearestDotByValue({ dots, value })?.changeValue(value);
    },
};
