import { ISliderExtendedDot, ISliderExtendedStep } from "../../SliderExtendedContext";

interface ISliderExtendedDotActions {
    /**
     * Возвращает tabIndex ползунка.
     * Слайдер с одним ползунком: tabIndex - 0.
     * Слайдер с двумя ползунками: до попадания слайдера в фокус в табуляции участвует только ползунок
     * с меньшим value (tabIndex - 0), второй исключён (tabIndex - -1). Когда слайдер в фокусе, ползунок
     * с меньшим value получает tabIndex - 1, а с большим - 3 (SliderExtended.Track между ними - 2),
     * чтобы по элементам слайдера можно было последовательно пройти через Tab.
     * Неактивный слайдер в табуляции не участвует.
     */
    getTabIndex: (params: {
        disabled: boolean;
        dotId: string;
        dots: ISliderExtendedDot[];
        focusedSlider: boolean;
    }) => number;
    /**
     * Перемещение точки на следующий шаг.
     */
    moveToNextStep: (dot: ISliderExtendedDot | undefined, steps: ISliderExtendedStep[]) => void;
    /**
     * Перемещение точки на предыдущий шаг.
     */
    moveToPrevStep: (dot: ISliderExtendedDot | undefined, steps: ISliderExtendedStep[]) => void;
}

export const SliderExtendedDotActions: ISliderExtendedDotActions = {
    getTabIndex: ({ disabled, dotId, dots, focusedSlider }) => {
        if (disabled) {
            return -1;
        }

        if (dots.length !== 2) {
            return 0;
        }

        const isDotWithLowerValue = [...dots].sort((dot1, dot2) => dot1.value - dot2.value)[0].id === dotId;

        if (focusedSlider) {
            return isDotWithLowerValue ? 1 : 3;
        }

        return isDotWithLowerValue ? 0 : -1;
    },
    moveToNextStep: (dot, steps) => {
        if (dot && dot.stepIndex < steps.length - 1) {
            dot.changeValue(steps[dot.stepIndex + 1].value);
        }
    },
    moveToPrevStep: (dot, steps) => {
        if (dot && dot.stepIndex > 0) {
            dot.changeValue(steps[dot.stepIndex - 1].value);
        }
    },
};
