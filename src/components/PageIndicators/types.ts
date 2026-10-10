import React from "react";
import { EOrientation } from "../../enums";

/** Свойства кнопки-индикатора. */
export type TPageIndicatorProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/** Функция для динамического формирования свойств индикатора. */
export type TPageIndicatorPropsFactory = (args: {
    /** Индекс страницы (с 0). */
    index: number;
    /** Номер страницы (с 1). */
    page: number;
    /** Активна ли страница. */
    selected: boolean;
}) => TPageIndicatorProps;

/** Свойства компонента PageIndicators. */
export interface IPageIndicatorsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** Количество страниц. */
    count: number;
    /** Индекс активной страницы (с 0). Значение вне диапазона приводится к ближайшей странице. */
    activeIndex: number;
    /** Обработчик выбора страницы. Получает индекс выбранной страницы. */
    onChange: (index: number) => void;
    /** Ориентация ряда индикаторов. По умолчанию EOrientation.HORIZONTAL. */
    orientation?: EOrientation;
    /** Свойства кнопок-индикаторов: объект или функция от состояния индикатора. */
    indicatorProps?: TPageIndicatorProps | TPageIndicatorPropsFactory;
}
