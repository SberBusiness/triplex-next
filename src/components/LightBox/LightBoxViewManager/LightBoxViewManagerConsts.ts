/**
 * Константы соответствуют less константам в src/styles/components/lightbox.less.
 */
import { getScrollbarWidth } from "../../../utils/scroll/scrollbar";

interface ILightBoxViewManagerConsts {
    /**
     * ClassNames для обозначения ширины контейнера.
     * Используются для замены media query в Css, т.к. media query учитывает только ширину экрана, а не ширину элемента.
     */
    breakPointsClassNames: {
        // Ширина меньше или равна lightBoxMediaPoint0.
        "less-or-equal-media-point-0": string;
        // Ширина больше lightBoxMediaPoint0.
        "more-media-point-0": string;
    };

    // Ширина стрелки лайтбокса.
    lightBoxArrowWidth: number;

    // Расстояние от стрелки до лайтбокса.
    lightBoxArrowMarginToLightBox: number;

    // Расстояние от стрелки до края экрана.
    lightBoxArrowMarginToScreen: number;

    // Ширина стрелки лайтбокса с полями по бокам.
    lightBoxArrowWithMarginWidth: number;

    // Breakpoint для экранов менее 1024px.
    lightBoxMediaPoint0: number;
}

const lightBoxArrowWidth = 64;
const lightBoxArrowMarginToLightBox = 16;
const lightBoxArrowMarginToScreen = 16;
const lightBoxArrowWithMarginWidth = lightBoxArrowWidth + lightBoxArrowMarginToLightBox + lightBoxArrowMarginToScreen; // 96
const lightBoxMediaPoint0 = 1024;

export const LightBoxViewManagerConsts: ILightBoxViewManagerConsts = {
    /**
     * ClassNames для обозначения ширины контейнера.
     * Используются для замены media query в Css, т.к. media query учитывает только ширину экрана, а не ширину элемента.
     */
    breakPointsClassNames: {
        // Ширина меньше или равна lightBoxMediaPoint0.
        "less-or-equal-media-point-0": "global-LB-less-or-equal-media-point-0",
        // Ширина больше lightBoxMediaPoint0.
        // У этого класса нет стилей, поэтому тут произвольный класс.
        "more-media-point-0": "global-LB-more-media-point-0",
    },
    // Расстояние от стрелки до лайтбокса.
    lightBoxArrowMarginToLightBox,
    // Расстояние от стрелки до края экрана.
    lightBoxArrowMarginToScreen,
    // Ширина стрелки лайтбокса.
    lightBoxArrowWidth,
    //  Ширина стрелки лайтбокса с полями по бокам.
    lightBoxArrowWithMarginWidth,
    // Breakpoint для экранов менее 1024px.
    lightBoxMediaPoint0: lightBoxMediaPoint0 + getScrollbarWidth(),
};
