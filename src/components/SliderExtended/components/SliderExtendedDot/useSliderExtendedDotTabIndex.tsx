import { ISliderExtendedDot } from "../../SliderExtendedContext";
import { useState, useLayoutEffect } from "react";

/**
 * Хук, возвращающий tabIndex.
 * Если слайдер имеет два ползунка, tabIndex динамически меняется в зависимости от положения ползунков.
 * По-умолчанию, SliderExtendedDot с меньшим value имеет tabIndex - 0, SliderExtendedDot с большим value и SliderExtendedTrack имеют tabIndex - -1.
 * Когда SliderExtendedDot или SliderExtendedTrack перемещаются, tabIndex для SliderExtendedDot c меньшим value становится равен 1, SliderExtendedTrack - 2, SliderExtendedDot c большим value - 3,
 * чтобы можно было последовательно передвигаться по этим элементам через Tab.
 */
export const useSliderExtendedDotTabIndex = (
    disabled: boolean,
    dotId: string,
    dots: ISliderExtendedDot[],
    focusedSlider: boolean,
): number => {
    const [tabIndex, setTabIndex] = useState(-1);

    useLayoutEffect(() => {
        if (dots.length === 2) {
            const sortDotsArr = [...dots].sort((dot1, dot2) => dot1.value - dot2.value);
            if (sortDotsArr[0].id === dotId) {
                setTabIndex(0);
            }
        } else {
            setTabIndex(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
        if (dots.length === 2) {
            const sortDotsArr = [...dots].sort((dot1, dot2) => dot1.value - dot2.value);

            if (focusedSlider) {
                if (sortDotsArr[1].id === dotId) {
                    setTabIndex(3);
                } else {
                    setTabIndex(1);
                }
            } else {
                if (sortDotsArr[0].id === dotId) {
                    setTabIndex(0);
                } else {
                    setTabIndex(-1);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusedSlider]);

    useLayoutEffect(() => {
        if (dots.length === 2) {
            const sortDotsArr = [...dots].sort((dot1, dot2) => dot1.value - dot2.value);

            if (focusedSlider) {
                if (sortDotsArr[0].id === dotId) {
                    setTabIndex(1);
                } else {
                    setTabIndex(3);
                }
            } else {
                if (sortDotsArr[0].id === dotId) {
                    setTabIndex(0);
                } else {
                    setTabIndex(-1);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dots]);

    return disabled ? -1 : tabIndex;
};
