import { ECarouselScrollMode } from "./enums";
import { EOrientation } from "../../enums";
import { IPageIndicatorsProps, TPageIndicatorProps, TPageIndicatorPropsFactory } from "../PageIndicators/types";

/** Внутренний отступ компонента CarouselViewport. */
export type TCarouselViewportPadding =
    | number
    | readonly [vertical: number, horizontal: number]
    | readonly [top: number, horizontal: number, bottom: number]
    | readonly [top: number, right: number, bottom: number, left: number];

/** Свойства компонента Carousel. */
export interface ICarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Расстояние (зазор) между слайдами в пикселях. По умолчанию 16. */
    gap?: number;
    /** Режим прокрутки карусели: поочередно по одному элементу или постранично. По умолчанию ECarouselScrollMode.ITEM. */
    scrollMode?: ECarouselScrollMode;
    /** Направление движения карусели (горизонтальное или вертикальное). По умолчанию EOrientation.HORIZONTAL. */
    orientation?: EOrientation;
    /** Внутренние отступы области видимости слайдов (Viewport), задающие зазоры по краям рабочей области скролла. По умолчанию 0. */
    viewportPadding?: TCarouselViewportPadding;
}

/** Нормализованный объект отступов для математических расчетов геометрии. */
export type TCarouselNormalizedPadding = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};

/** Результат работы функции resolveViewportPadding. */
export interface ICarouselPaddingResult {
    metrics: TCarouselNormalizedPadding;
    style: string;
}

/** Свойства компонента CarouselViewport. */
export interface ICarouselViewportProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Свойства компонента CarouselTrack. */
export interface ICarouselTrackProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Свойства компонента CarouselItem. */
export interface ICarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number;
}

/** Свойства кнопки-индикатора. */
export type TCarouselIndicatorProps = TPageIndicatorProps;

/** Функция для динамического формирования пропсов индикатора. */
export type TCarouselIndicatorPropsFactory = TPageIndicatorPropsFactory;

/** Свойства компонента CarouselIndicators. Количество страниц, активная страница и ориентация берутся из Carousel. */
export interface ICarouselIndicatorsProps extends Omit<
    IPageIndicatorsProps,
    "count" | "activeIndex" | "onChange" | "orientation"
> {}
