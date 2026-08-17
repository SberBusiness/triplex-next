import React from "react";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Передвигаемая точка (ползунок) слайдера, зарегистрированная в контексте. */
export interface ISliderExtendedDot {
    /** Функция изменения позиции точки, вызывается из любого компонента. */
    changeValue: (value: number) => void;
    /** Идентификатор точки, генерируется SliderExtended.Dot. */
    id: string;
    /** Нормализованное (от 0 до 100) значение позиции точки, устанавливает SliderExtended.Dot. */
    normalizedValue: number;
    /** Индекс позиции точки в массиве steps. */
    stepIndex: number;
    /** Значение позиции точки, устанавливает SliderExtended.Dot. */
    value: number;
}

/** Точка остановки при перемещении ползунка. */
export interface ISliderExtendedStep {
    /** Значение. */
    value: number;
    /** Нормализованное (от 0 до 100) значение. */
    normalizedValue: number;
}

/** Контекст SliderExtended. Через него субкомпоненты получают состояние слайдера и меняют его. */
export interface ISliderExtendedContext {
    /** Добавляет точку. */
    addDot: (dot: ISliderExtendedDot) => void;
    /** Массив передвигаемых точек. */
    dots: ISliderExtendedDot[];
    /** Слайдер не активен. */
    disabled: boolean;
    /** Один из элементов слайдера (SliderExtended.Dot или SliderExtended.Track) в фокусе. */
    focused: boolean;
    /**
     * Track в текущий момент перетаскивается мышью или в состоянии hover.
     * Флаг нужен для подсветки SliderExtended.Dot в этот момент.
     */
    isHoverOrDragTrack: boolean;
    /** Максимальное значение слайдера. */
    max: number;
    /** Минимальное значение слайдера. */
    min: number;
    /** Элемент полосы слайдера. */
    railNode: HTMLDivElement | null;
    /** Удаляет точку. */
    removeDot: (dotId: string) => void;
    /** Реверсивный слайдер. */
    reverse: boolean;
    /** Устанавливает свойство focused. */
    setFocused: (focused: boolean) => void;
    /** Устанавливает значение параметра isHoverOrDragTrack. Вызывается компонентом SliderExtended.Track. */
    setIsHoverOrDragTrack: (isHoverOrDragTrack: boolean) => void;
    /** Устанавливает элемент полосы слайдера. Вызывается callback-ref'ом SliderExtended.Rail, поэтому принимает null. */
    setRailNode: (node: HTMLDivElement | null) => void;
    /** Массив точек остановки при перемещении Dot. Пока массив пуст, SliderExtended не рендерит содержимое. */
    steps: ISliderExtendedStep[];
    /** Обновляет данные точки. */
    updateDot: (dot: Pick<ISliderExtendedDot, "id"> & Partial<ISliderExtendedDot>) => void;
    /** Размер компонента. */
    size: EComponentSize.MD | EComponentSize.LG;
}

const contextInitial: ISliderExtendedContext = {
    addDot: () => {},
    disabled: false,
    dots: [],
    focused: false,
    isHoverOrDragTrack: false,
    max: 0,
    min: 0,
    railNode: null,
    removeDot: () => {},
    reverse: false,
    setFocused: () => {},
    setIsHoverOrDragTrack: () => {},
    setRailNode: () => {},
    steps: [],
    updateDot: () => {},
    size: EComponentSize.MD,
};

export const SliderExtendedContext = React.createContext<ISliderExtendedContext>(contextInitial);
