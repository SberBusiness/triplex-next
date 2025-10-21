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
        "less-or-equal-media-point-1": string;
        "less-or-equal-media-point-2": string;
        // Ширина больше lightBoxMediaPoint0.
        "more-media-point-0": string;
        "more-media-point-1": string;
        "more-media-point-2": string;
    };

    // Ширина стрелки лайтбокса.
    lightBoxArrowWidth: number;

    // Расстояние от стрелки до лайтбокса.
    lightBoxArrowMarginToLightBox: number;

    // Расстояние от стрелки до края экрана.
    lightBoxArrowMarginToScreen: number;

    // Ширина стрелки лайтбокса с полями по бокам.
    lightBoxArrowWithMarginWidth: number;

    // Минимальная ширина тела лайтбокса.
    lightBoxContentMinWidth: number;

    // Максимальная ширина тела лайтбокса.
    lightBoxContentMaxWidth: number;

    // Breakpoint для экранов менее 1024px.
    lightBoxMediaPoint0: number;

    /*
      Breakpoint до которого стрелки находятся наверху лайтбокса, от которого стрелки сверху переезжают к краям лайтбокса.
      Тело лайтбокса фиксированной ширины(@lightbox-content-min-width), после начинает увеличиваться до @lightbox-content-max-width.
    */
    lightBoxMediaPoint1: number;

    // Breakpoint до которого растет тело лайтбокса до @lightbox-content-max-width, после центруется относительно экрана.
    lightBoxMediaPoint2: number;
}

const lightBoxArrowWidth = 64;
const lightBoxArrowMarginToLightBox = 16;
const lightBoxArrowMarginToScreen = 16;
const lightBoxArrowWithMarginWidth = lightBoxArrowWidth + lightBoxArrowMarginToLightBox + lightBoxArrowMarginToScreen; // 96
const lightBoxContentMinWidth = 1000;
const lightBoxContentMaxWidth = 1122;
const lightBoxMediaPoint0 = 1000;
const lightBoxMediaPoint1 = lightBoxContentMinWidth + lightBoxArrowWithMarginWidth * 2; // 1992
const lightBoxMediaPoint2 = lightBoxContentMaxWidth + lightBoxArrowWithMarginWidth * 2; // 1314

export const LightBoxViewManagerConsts: ILightBoxViewManagerConsts = {
    /**
     * ClassNames для обозначения ширины контейнера.
     * Используются для замены media query в Css, т.к. media query учитывает только ширину экрана, а не ширину элемента.
     */
    breakPointsClassNames: {
        // Ширина меньше или равна lightBoxMediaPoint0.
        "less-or-equal-media-point-0": "LB-less-or-equal-media-point-0-no-hash",
        "less-or-equal-media-point-1": "LB-less-or-equal-media-point-1-no-hash",
        "less-or-equal-media-point-2": "LB-less-or-equal-media-point-2-no-hash",
        // Ширина больше lightBoxMediaPoint0.
        "more-media-point-0": "LB-more-media-point-0-no-hash",
        "more-media-point-1": "LB-more-media-point-1-no-hash",
        "more-media-point-2": "LB-more-media-point-2-no-hash",
    },
    // Расстояние от стрелки до лайтбокса.
    lightBoxArrowMarginToLightBox,
    // Расстояние от стрелки до края экрана.
    lightBoxArrowMarginToScreen,
    // Ширина стрелки лайтбокса.
    lightBoxArrowWidth,
    //  Ширина стрелки лайтбокса с полями по бокам.
    lightBoxArrowWithMarginWidth,
    // Максимальная ширина тела лайтбокса.
    lightBoxContentMaxWidth,
    // Минимальная ширина тела лайтбокса.
    lightBoxContentMinWidth,
    // Breakpoint для экранов менее 1024px.
    lightBoxMediaPoint0: lightBoxMediaPoint0 + getScrollbarWidth(),
    /*
      Breakpoint до которого стрелки находятся наверху лайтбокса, от которого стрелки сверху переезжают к краям лайтбокса.
      Тело лайтбокса фиксированной ширины(@lightbox-content-min-width), после начинает увеличиваться до @lightbox-content-max-width.
    */
    lightBoxMediaPoint1: lightBoxMediaPoint1 + getScrollbarWidth(),
    /*
      Breakpoint до которого растет тело лайтбокса до @lightbox-content-max-width, после центруется относительно экрана.
    */
    lightBoxMediaPoint2: lightBoxMediaPoint2 + getScrollbarWidth(),
};
