import { SliderExtendedUtils } from "../../SliderExtendedUtils";
import { ISliderExtendedDot } from "../../SliderExtendedContext";

interface ISliderExtendedMarkActions {
    /**
     * Возвращает стиль для правильного позиционирования метки.
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
     * Возвращает true, если метка входит в выбранный диапазон при двух SliderExtendedDots. Либо в диапазон от 0 до текущего значения при одном SliderExtendedDot.
     */
    isInSelectedRange: (params: { dots: ISliderExtendedDot[]; min: number; value: number }) => boolean;
    /**
     * Перемещает ближайшую SliderExtended.Dor на текущую позицию.
     */
    moveNearestDot: (params: { dots: ISliderExtendedDot[]; value: number }) => void;
}

export const SliderExtendedMarkActions: ISliderExtendedMarkActions = {
    getStyle: ({ min, max, reverse, value }) => {
        let left: string | number | undefined = SliderExtendedUtils.getNormalizedValue({ max, min, value });
        let right: number | undefined = undefined;

        if (reverse) {
            if (left === 0) {
                left = undefined;
                right = 0;
            } else {
                left = `${100 - left}%`;
            }
        } else {
            if (left === 100) {
                left = undefined;
                right = 0;
            } else {
                left = `${left}%`;
            }
        }

        return { left, right };
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
        const nearestDot = SliderExtendedUtils.getNearestDotByValue({ dots, value });
        nearestDot.changeValue(value);
    },
};
