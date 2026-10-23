import React from "react";
import { EMonthYearRangeShiftUnit } from "./enums";

/** Границы диапазона [от, до] в формате format (по умолчанию YYYYMMDD); пустая строка означает отсутствие границы. */
export type TMonthYearRangeValue = [string, string];

/** Свойства функции рендеринга кнопки сдвига диапазона месяцев. */
export interface IMonthYearRangeButtonProvideProps {
    /** Содержимое кнопки — иконка направления сдвига. */
    children: React.ReactNode;
    /** CSS-класс, который следует передать кнопке. */
    className: string;
    /** Кнопка отключена, если хотя бы одна граница диапазона пуста. */
    disabled: boolean;
    /** Обработчик сдвига; не вызывает onChange при пустой или невалидной границе. */
    onClick: () => void;
}

/** Свойства функции рендеринга поля выбора месяца. */
export interface IMonthYearRangePickerProvideProps {
    /** Дата в формате format компонента MonthYearRange или пустая строка, если граница не выбрана. */
    value: string;
    /** Формат дат в value и onChange, заданный в MonthYearRange. */
    format: string;
    /** Обработчик изменения границы; при пересечении очищает противоположную границу. */
    onChange: (value: string) => void;
}

/** Свойства компонента MonthYearRange. */
export interface IMonthYearRangeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
    /** Границы диапазона [от, до] в формате format; пустая строка означает отсутствие границы. */
    value: TMonthYearRangeValue;
    /**
     * Формат дат в value и в onChange полей выбора месяца. Передаётся полям в renderPickerFrom /
     * renderPickerTo вместе с value и onChange. По умолчанию YYYYMMDD.
     */
    format?: string;
    /** Величина сдвига диапазона в единицах shiftUnit. По умолчанию 1. */
    shiftAmount?: number;
    /** Единица измерения сдвига. По умолчанию EMonthYearRangeShiftUnit.MONTH. */
    shiftUnit?: EMonthYearRangeShiftUnit;
    /** Скрывает кнопки сдвига диапазона. По умолчанию кнопки отображаются. */
    hideNavigation?: boolean;
    /** Обработчик изменения диапазона; передаёт новые границы для обновления value. */
    onChange: (value: TMonthYearRangeValue) => void;
    /** Рендерит поле выбора месяца "от", используя переданные value, format и onChange. */
    renderPickerFrom: (props: IMonthYearRangePickerProvideProps) => React.ReactNode;
    /** Рендерит поле выбора месяца "до", используя переданные value, format и onChange. */
    renderPickerTo: (props: IMonthYearRangePickerProvideProps) => React.ReactNode;
    /** Рендерит кнопку сдвига назад, используя переданные children, className, onClick и disabled. */
    renderButtonBack: (props: IMonthYearRangeButtonProvideProps) => React.ReactNode;
    /** Рендерит кнопку сдвига вперёд, используя переданные children, className, onClick и disabled. */
    renderButtonForward: (props: IMonthYearRangeButtonProvideProps) => React.ReactNode;
}
