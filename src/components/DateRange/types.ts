import React from "react";
import { EDateRangeShiftUnit } from "./enums";

/** Значение компонента DateRange — даты "от" и "до" в формате format (по умолчанию YYYYMMDD). */
export type TDateRangeValue = [string, string];

/** Свойства функции рендеринга кнопки сдвига диапазона дат. */
export interface IDateRangeButtonProvideProps {
    /** Иконка направления сдвига. */
    children: React.ReactNode;
    /** Класс кнопки сдвига. */
    className: string;
    /** Кнопка недоступна — диапазон дат заполнен не полностью. */
    disabled: boolean;
    /** Обработчик клика, сдвигающий диапазон дат. Не вызывает onChange при пустой или невалидной границе. */
    onClick: () => void;
}

/** Свойства функции рендеринга поля выбора даты. */
export interface IDateRangePickerProvideProps {
    /** Дата в формате format компонента DateRange, пустая строка — дата не выбрана. */
    value: string;
    /** Формат дат в value и onChange, заданный в DateRange. */
    format: string;
    /** Обработчик изменения даты. Принимает дату в формате format компонента DateRange. */
    onChange: (value: string) => void;
}

/** Свойства компонента DateRange. */
export interface IDateRangeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
    /** Диапазон дат. */
    value: TDateRangeValue;
    /**
     * Формат дат в value и в onChange полей выбора даты. Передаётся полям в renderPickerFrom /
     * renderPickerTo вместе с value и onChange. По умолчанию YYYYMMDD.
     */
    format?: string;
    /** Численная величина сдвига диапазона дат. По умолчанию 1. */
    shiftAmount?: number;
    /** Единица измерения сдвига диапазона дат. По умолчанию EDateRangeShiftUnit.MONTH. */
    shiftUnit?: EDateRangeShiftUnit;
    /** Управление отображением/скрытием кнопок сдвига диапазона дат. По умолчанию false. */
    hideNavigation?: boolean;
    /** Функция, вызывающаяся при изменении диапазона дат. */
    onChange: (value: TDateRangeValue) => void;
    /** Функция рендеринга поля выбора даты "от". */
    renderPickerFrom: (props: IDateRangePickerProvideProps) => React.ReactNode;
    /** Функция рендеринга поля выбора даты "до". */
    renderPickerTo: (props: IDateRangePickerProvideProps) => React.ReactNode;
    /** Функция рендеринга кнопки сдвига диапазона дат "назад". */
    renderButtonBack: (props: IDateRangeButtonProvideProps) => React.ReactNode;
    /** Функция рендеринга кнопки сдвига диапазона дат "вперёд". */
    renderButtonForward: (props: IDateRangeButtonProvideProps) => React.ReactNode;
}
