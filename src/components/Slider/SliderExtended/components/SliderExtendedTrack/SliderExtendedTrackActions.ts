import { ISliderExtendedDot, ISliderExtendedStep } from "../../SliderExtendedContext";
import { SliderExtendedUtils } from "../../SliderExtendedUtils";

interface ISliderExtendedTrackActions {
    /**
     * Перемещение SliderExtended.Dots, при перемещении SliderExtended.Track.
     */
    dragDots: (params: {
        cursorPrevNormalizedValue: React.MutableRefObject<number>;
        cursorXPosition: number;
        dots: ISliderExtendedDot[];
        railNode: HTMLDivElement | null;
        reverse: boolean;
        steps: ISliderExtendedStep[];
    }) => void;
    /**
     * Возвращает левую и правую позиции трека.
     */
    getTrackPosition: (params: { dots: ISliderExtendedDot[]; reverse: boolean }) => { left: number; right: number };
    /**
     * Перемещение трека и точек на следующий шаг.
     */
    moveToNextStep: (dots: ISliderExtendedDot[], steps: ISliderExtendedStep[]) => void;
    /**
     * Перемещение трека и точек на предыдущий шаг.
     */
    moveToPrevStep: (dots: ISliderExtendedDot[], steps: ISliderExtendedStep[]) => void;
}

export const SliderExtendedTrackActions: ISliderExtendedTrackActions = {
    dragDots: ({ cursorPrevNormalizedValue, cursorXPosition, dots, railNode, reverse, steps }) => {
        if (railNode) {
            /**
             * Текущая позиция курсора относительно слайдера, в процентах.
             */
            const cursorNormalizedValue = SliderExtendedUtils.getNormalizedCursorValue({
                cursorXPosition,
                railNode,
            });

            /**
             * Разница между текущей позицией курсора и предыдущей, в процентах.
             */
            const cursorDelta = cursorPrevNormalizedValue.current - cursorNormalizedValue;

            /**
             * Длина шага, в процентах.
             */
            const stepLength = steps[1].normalizedValue - steps[0].normalizedValue;

            /**
             * Изменение позиции курсора, в шагах.
             */
            let cursorDeltaInSteps = -Math.trunc(cursorDelta / stepLength);

            if (reverse) {
                cursorDeltaInSteps = cursorDeltaInSteps * -1;
            }

            if (cursorDeltaInSteps !== 0) {
                /**
                 * Левая SliderExtended.Dot.
                 */
                let leftDot: ISliderExtendedDot;
                /**
                 * Правая SliderExtended.Dot.
                 */
                let rightDot: ISliderExtendedDot;

                if (dots[0].value < dots[1].value) {
                    leftDot = dots[0];
                    rightDot = dots[1];
                } else {
                    leftDot = dots[1];
                    rightDot = dots[0];
                }

                // Track находится на границе слайдера и дальше двигаться некуда.
                if (
                    (leftDot.stepIndex === 0 && cursorDeltaInSteps <= 0) ||
                    (rightDot.stepIndex === steps.length - 1 && cursorDeltaInSteps >= 0)
                ) {
                    return;
                }

                let leftDotNextStepIndex = leftDot.stepIndex + cursorDeltaInSteps;
                let rightDotNextStepIndex = rightDot.stepIndex + cursorDeltaInSteps;

                // leftDotNextStepIndex меньше минимально возможного.
                if (leftDotNextStepIndex < 0) {
                    rightDotNextStepIndex = rightDotNextStepIndex - leftDotNextStepIndex;
                    leftDotNextStepIndex = 0;
                }

                // rightDotNextStepIndex больше максимально возможного.
                if (rightDotNextStepIndex > steps.length - 1) {
                    leftDotNextStepIndex = leftDotNextStepIndex - (rightDotNextStepIndex - steps.length + 1);
                    rightDotNextStepIndex = steps.length - 1;
                }

                cursorPrevNormalizedValue.current = cursorNormalizedValue;
                leftDot.changeValue(steps[leftDotNextStepIndex].value);
                rightDot.changeValue(steps[rightDotNextStepIndex].value);
            }
        }
    },
    getTrackPosition: ({ dots, reverse }) => {
        const position = {
            left: 0,
            right: 0,
        };

        // Слайдер с одним Slider.Dot.
        if (dots.length === 1) {
            if (reverse) {
                position.left = 100 - dots[0].normalizedValue;
                position.right = 0;
            } else {
                position.left = 0;
                position.right = 100 - dots[0].normalizedValue;
            }
            // Слайдер с двумя Slider.Dot.
        } else {
            if (reverse) {
                if (dots[0].value < dots[1].value) {
                    position.right = dots[0].normalizedValue;
                    position.left = 100 - dots[1].normalizedValue;
                } else {
                    position.right = dots[1].normalizedValue;
                    position.left = 100 - dots[0].normalizedValue;
                }
            } else {
                if (dots[0].value < dots[1].value) {
                    position.left = dots[0].normalizedValue;
                    position.right = 100 - dots[1].normalizedValue;
                } else {
                    position.left = dots[1].normalizedValue;
                    position.right = 100 - dots[0].normalizedValue;
                }
            }
        }

        return position;
    },
    moveToNextStep: (dots, steps) => {
        if (dots.every((d) => d.stepIndex !== steps.length - 1)) {
            dots.forEach((d) => d.changeValue(steps[d.stepIndex + 1].value));
        }
    },
    moveToPrevStep: (dots, steps) => {
        if (dots.every((d) => d.stepIndex !== 0)) {
            dots.forEach((d) => d.changeValue(steps[d.stepIndex - 1].value));
        }
    },
};
