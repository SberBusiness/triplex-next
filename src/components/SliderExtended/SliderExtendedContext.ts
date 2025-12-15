import React from "react";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

export interface ISliderExtendedDot {
    // Функция изменения позиции точки, вызывается из любого компонента.
    changeValue: (value: number) => void;
    id: string;
    // Нормализованное значение позиции точки, устанавливает SliderExtendedDot.
    normalizedValue: number;
    // Индекс позиции точки в массиве steps.
    stepIndex: number;
    // Значение позиции точки, устанавливает SliderExtended.Dot.
    value: number;
}

export interface ISliderExtendedStep {
    // Значение.
    value: number;
    // Нормализованное значение.
    normalizedValue: number;
}

export interface ISliderExtendedContext {
    // Добавляет точку.
    addDot: (dot: ISliderExtendedDot) => void;
    // Массив передвигаемых точек.
    dots: ISliderExtendedDot[];
    // Слайдер не активен.
    disabled: boolean;
    // Один из элементов слайдера(SliderExtendedDot или SliderExtendedTrack) в фокусе.
    focused: boolean;
    // Track в текущий момент перетаскивается мышью или в состоянии hover. Флаг нужен для подсветки SliderExtendedDot в этот момент.
    isHoverOrDragTrack: boolean;
    // Максимальное значение слайдера.
    max: number;
    // Минимальное значение слайдера.
    min: number;
    // Элемент полосы слайдера.
    railNode: HTMLDivElement | null;
    // Удаляет точку.
    removeDot: (dotId: string) => void;
    // Реверсивный слайдер.
    reverse: boolean;
    // Устанавливает свойство focused;
    setFocused: (focused: boolean) => void;
    // Устанавливает значение параметра isHoverOrDragTrack. Вызывается компонентом SliderExtendedTrack.
    setIsHoverOrDragTrack: (isHoverOrDragTrack: boolean) => void;
    // Устанавливает элемент полосы слайдера.
    setRailNode: (node: HTMLDivElement) => void;
    // Массив точек остановки при перемещении Dot.
    steps: ISliderExtendedStep[];
    // Обновляет данные точки.
    updateDot: (dot: Pick<ISliderExtendedDot, "id"> & Partial<ISliderExtendedDot>) => void;
    // Размер компонента.
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
