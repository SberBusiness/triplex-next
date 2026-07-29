import { ECarouselOrientation, ECarouselScrollMode } from "./enums";

/** Внутренний отступ компонента CarouselViewport. */
export type TCarouselViewportPadding =
    | number
    | readonly [vertical: number, horizontal: number]
    | readonly [top: number, horizontal: number, bottom: number]
    | readonly [top: number, right: number, bottom: number, left: number];

/** Свойства компонента Carousel. */
export interface ICarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Расстояние (зазор) между слайдами в пикселях.
     * @default 16
     */
    gap?: number;
    /**
     * Режим прокрутки карусели: поочередно по одному элементу или постранично.
     * @default ECarouselScrollMode.ITEM
     */
    scrollMode?: ECarouselScrollMode;
    /**
     * Направление движения карусели (горизонтальное или вертикальное).
     * @default ECarouselOrientation.HORIZONTAL
     */
    orientation?: ECarouselOrientation;
    /**
     * Внутренние отступы области видимости слайдов (Viewport).
     * Задают зазоры по краям рабочей области скролла.
     * @default 0
     */
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
export type TCarouselIndicatorProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/** Функция для динамического формирования пропсов индикатора. */
export type TCarouselIndicatorPropsFactory = (args: {
    index: number;
    page: number;
    selected: boolean;
}) => TCarouselIndicatorProps;

/** Свойства компонента CarouselIndicators. */
export interface ICarouselIndicatorsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Свойства для кнопок-индикаторов. */
    indicatorProps?: TCarouselIndicatorProps | TCarouselIndicatorPropsFactory;
    /**
     * Кастомный рендер индикатора.
     * `props` содержат вычисленные role/tabIndex/aria-selected, className и onClick;
     * `ref` необходимо прокинуть на интерактивный элемент для корректного управления фокусом.
     */
    renderIndicator?: (args: {
        index: number;
        page: number;
        selected: boolean;
        props: TCarouselIndicatorProps;
        ref: React.RefCallback<HTMLButtonElement>;
    }) => React.ReactNode;
}
