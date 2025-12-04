import React from "react";
import { Moment } from "moment";
import {
    ECalendarViewMode,
    ECalendarDateMarkType,
    ECalendarPickType,
} from "@sberbusiness/triplex-next/components/Calendar/enums";
import { IDateLimitRange } from "@sberbusiness/triplex-next/types/DateTypes";

/** Внешний тип даты, который можно передать в компонент через свойства компонента. */
export type TPickedDateProp = string | Moment | null;

/** Приведенный к Moment тип даты, используемый для внутренних вычислений. */
export type TPickedDate = Moment | null;

/** Тип отмеченных дней календаря. */
export type TCalendarMarkedDays = string[] | Record<string, ECalendarDateMarkType>;

/** Свойства компонента календаря. */
export interface ICalendarProps extends ICalendarNestedProps {
    /** Отображаемая по умолчанию дата. */
    defaultViewDate?: string | Moment;
    /** Формат для значения. */
    format?: string;
    /** Вариант выбора даты. */
    pickType?: ECalendarPickType;
    /** Ограничение выбираемого периода. */
    limitRange?: IDateLimitRange;
    /** Отмеченные дни. */
    markedDays?: TCalendarMarkedDays;
    /** Дни недоступные для выбора. */
    disabledDays?: string[];
    /** Обратный порядок выбора даты. */
    reversedPick?: boolean;
    /** Обработчик изменения страницы. */
    onPageChange?: (viewDate: Moment, viewMode: ECalendarViewMode) => void;
    /** Обработчик изменения вида. */
    onViewChange?: (viewDate: Moment, viewMode: ECalendarViewMode) => void;
    /** Выбранная дата. */
    pickedDate: TPickedDateProp;
    /** Адаптированный режим. */
    adaptiveMode?: boolean;
    /** Обработчик изменения даты. */
    onDateChange: (date: Moment) => void;
}

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

type TWithDataAttributes = {
    [dataAttribute in TDataAttributeAlias]: string;
};

export type TTdHTMLAttributesWithData = React.TdHTMLAttributes<HTMLTableCellElement> & TWithDataAttributes;

export type TButtonHTMLAttributesWithData = React.ButtonHTMLAttributes<HTMLButtonElement> & TWithDataAttributes;

/** Тип HTML атрибутов компонента дня. */
export type TDayHtmlAttributes = TTdHTMLAttributesWithData | TDayHtmlAttributesFunction;

export interface ICalendarNestedProps {
    /** HTML атрибуты компонента дня. */
    dayHtmlAttributes?: TDayHtmlAttributes;
    /** HTML атрибуты компонента месяца. */
    monthHtmlAttributes?: TTdHTMLAttributesWithData;
    /** HTML атрибуты компонента года. */
    yearHtmlAttributes?: TTdHTMLAttributesWithData;
    /** Свойства кнопки переключения на предыдущую страницу календаря. */
    prevButtonProps?: TButtonHTMLAttributesWithData | ((viewMode: ECalendarViewMode) => TButtonHTMLAttributesWithData);
    /** Свойства кнопки переключения на следующую страницу календаря. */
    nextButtonProps?: TButtonHTMLAttributesWithData | ((viewMode: ECalendarViewMode) => TButtonHTMLAttributesWithData);
    /** Свойства кнопки для смены вида календаря. */
    viewButtonProps?: TButtonHTMLAttributesWithData | ((viewMode: ECalendarViewMode) => TButtonHTMLAttributesWithData);
    /** Свойства кнопки "Вчера". */
    yesterdayButtonProps?:
        | TButtonHTMLAttributesWithData
        | ((viewMode: ECalendarViewMode) => TButtonHTMLAttributesWithData);
    /** Свойства кнопки "Сегодня". */
    todayButtonProps?:
        | TButtonHTMLAttributesWithData
        | (({
              viewMode,
              currentPeriodSelected,
          }: {
              viewMode: ECalendarViewMode;
              currentPeriodSelected: boolean;
          }) => TButtonHTMLAttributesWithData);
    /** Свойства кнопки "Завтра". */
    tomorrowButtonProps?:
        | TButtonHTMLAttributesWithData
        | ((viewMode: ECalendarViewMode) => TButtonHTMLAttributesWithData);
}

/** Свойства компонента CalendarView. */
export interface ICalendarViewProps
    extends Pick<ICalendarProps, "dayHtmlAttributes" | "monthHtmlAttributes" | "yearHtmlAttributes"> {
    /** Выбранная дата. */
    pickedDate?: TPickedDate;
}
