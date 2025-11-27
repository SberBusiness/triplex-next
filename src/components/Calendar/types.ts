import React from "react";
import { Moment } from "moment";
import { ICalendarRangeProps } from "@sberbusiness/triplex-next/components/Calendar/Calendar";
import { ECalendarViewMode, ECalendarDateMarkType } from "@sberbusiness/triplex-next/components/Calendar/enums";

/** Внешний тип даты, который можно передать в компонент через свойства компонента. */
export type TPickedDateProp = string | Moment | null;

/** Приведенный к Moment тип даты, используемый для внутренних вычислений. */
export type TPickedDate = Moment | null;

/** Внешний тип периода, который можно передать в компонент через свойства компонента. */
export type TPickedRangeProp = [TPickedDateProp, TPickedDateProp];

/** Приведенный к Moment тип периода для внутренних вычислений. */
export type TPickedRange = [TPickedDate, TPickedDate];

/** Тип отмеченных дней календаря. */
export type TCalendarMarkedDays = string[] | Record<string, ECalendarDateMarkType>;

/**
 * Интерфейс параметров, которые можно передать в функцию для получения HTML атрибутов компонента дня,
 * если они участвуют в формировании значений атрибутов.
 */
export interface IDayHtmlAttributesFunctionParams {
    /** День является отмеченным. */
    marked: boolean;
}

/** Функция для получения HTML атрибутов компонента дня. */
export type TDayHtmlAttributesFunction = (
    params: IDayHtmlAttributesFunctionParams,
) => React.TdHTMLAttributes<HTMLTableCellElement>;

/** Alias для data атрибутов. */
type TDataAttributeAlias = `data-${string}`;

export type THTMLAttributesWithData = {
    [dataAttribute in TDataAttributeAlias]: string;
} & React.TdHTMLAttributes<HTMLTableCellElement>;

/** Тип HTML атрибутов компонента дня. */
export type TDayHtmlAttributes = THTMLAttributesWithData | TDayHtmlAttributesFunction;

export interface ICalendarNestedProps {
    /** HTML атрибуты компонента дня. */
    dayHtmlAttributes?: TDayHtmlAttributes;
    /** HTML атрибуты компонента месяца. */
    monthHtmlAttributes?: React.TdHTMLAttributes<HTMLTableCellElement>;
    /** HTML атрибуты компонента года. */
    yearHtmlAttributes?: React.TdHTMLAttributes<HTMLTableCellElement>;
    /** Свойства кнопки переключения на предыдущую страницу календаря. */
    prevButtonProps?:
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | ((viewMode: ECalendarViewMode) => React.ButtonHTMLAttributes<HTMLButtonElement>);
    /** Свойства кнопки переключения на следующую страницу календаря. */
    nextButtonProps?:
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | ((viewMode: ECalendarViewMode) => React.ButtonHTMLAttributes<HTMLButtonElement>);
    /** Свойства кнопки для смены вида календаря. */
    viewButtonProps?:
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | ((viewMode: ECalendarViewMode) => React.ButtonHTMLAttributes<HTMLButtonElement>);
    /** Свойства кнопки "Сегодня". */
    todayButtonProps?:
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | (({
              viewMode,
              currentPeriodSelected,
          }: {
              viewMode: ECalendarViewMode;
              currentPeriodSelected: boolean;
          }) => React.ButtonHTMLAttributes<HTMLButtonElement>);
}

/** Свойства Calendar, передаваемые в рендер-функцию CalendarRange. */
export interface ICalendarProvideProps extends ICalendarRangeProps {}
