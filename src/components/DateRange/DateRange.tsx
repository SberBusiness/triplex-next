import React from "react";
import { RangeStrokeSrvIcon16, CaretleftStrokeSrvIcon20, CaretrightStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { EDateRangeShiftUnit } from "./enums";
import { shiftDateRange } from "./utils";
import styles from "./styles/DateRange.module.less";

/** Свойства функции рендеринга кнопки сдвига диапазона дат. */
export interface IDateRangeButtonProvideProps {
    /** Иконка направления сдвига. */
    children: React.ReactNode;
    /** Класс кнопки сдвига. */
    className: string;
    /** Обработчик клика, сдвигающий диапазон дат. */
    onClick: () => void;
    /** Кнопка недоступна — диапазон дат заполнен не полностью. */
    disabled: boolean;
}

/** Свойства функции рендеринга поля выбора даты. */
export interface IDateRangePickerProvideProps {
    /** Дата в формате YYYYMMDD, пустая строка — дата не выбрана. */
    value: string;
    /** Обработчик изменения даты. Принимает дату в формате YYYYMMDD. */
    onChange: (value: string) => void;
}

/** Значение компонента DateRange — даты "от" и "до" в формате YYYYMMDD. */
export type TDateRangeValue = [string, string];

/** Свойства компонента DateRange. */
export interface IDateRangeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
    /** Диапазон дат. */
    value: TDateRangeValue;
    /** Функция, вызывающаяся при изменении диапазона дат. */
    onChange: (value: TDateRangeValue) => void;
    /** Численная величина сдвига диапазона дат. По умолчанию 1. */
    shiftAmount?: number;
    /** Единица измерения сдвига диапазона дат. По умолчанию EDateRangeShiftUnit.MONTH. */
    shiftUnit?: EDateRangeShiftUnit;
    /** Управление отображением/скрытием кнопок сдвига диапазона дат. По умолчанию false. */
    hideNavigation?: boolean;
    /** Функция рендеринга поля выбора даты "от". */
    renderPickerFrom: (props: IDateRangePickerProvideProps) => React.ReactNode;
    /** Функция рендеринга поля выбора даты "до". */
    renderPickerTo: (props: IDateRangePickerProvideProps) => React.ReactNode;
    /** Функция рендеринга кнопки сдвига диапазона дат "назад". */
    renderButtonBack: (props: IDateRangeButtonProvideProps) => React.ReactNode;
    /** Функция рендеринга кнопки сдвига диапазона дат "вперёд". */
    renderButtonForward: (props: IDateRangeButtonProvideProps) => React.ReactNode;
}

/**
 * Выбор диапазона дат. Рендерит два поля выбора даты и кнопки сдвига диапазона,
 * которые передаются через render-props. Следит за тем, чтобы дата "от" не была
 * больше даты "до", и сдвигает обе границы диапазона сразу.
 */
export const DateRange = React.forwardRef<HTMLDivElement, IDateRangeProps>(
    (
        {
            children,
            className,
            value,
            onChange,
            shiftAmount = 1,
            shiftUnit = EDateRangeShiftUnit.MONTH,
            hideNavigation,
            renderPickerFrom,
            renderPickerTo,
            renderButtonForward,
            renderButtonBack,
            ...rest
        },
        ref,
    ) => {
        const [start, end] = value;
        const classNames = clsx(styles.dateRange, className);
        /** Сдвиг возможен только при обеих заполненных границах диапазона. */
        const shiftDisabled = !(start && end);

        /** Обработчик изменения значения в поле выбора даты "от". Сбрасывает дату "до", если она оказалась меньше. */
        const handleChangePickerFrom = (date: string) => {
            if (!date || !end || date <= end) {
                onChange([date, end]);
            } else {
                onChange([date, ""]);
            }
        };

        /** Обработчик изменения значения в поле выбора даты "до". Сбрасывает дату "от", если она оказалась больше. */
        const handleChangePickerTo = (date: string) => {
            if (!date || !start || date >= start) {
                onChange([start, date]);
            } else {
                onChange(["", date]);
            }
        };

        /** Функция, смещающая диапазон дат назад. Неполный диапазон не сдвигается. */
        const shiftRangeBack = () => {
            if (!start || !end) {
                return;
            }

            onChange(shiftDateRange(value, -shiftAmount, shiftUnit));
        };

        /** Функция, смещающая диапазон дат вперёд. Неполный диапазон не сдвигается. */
        const shiftRangeForward = () => {
            if (!start || !end) {
                return;
            }

            onChange(shiftDateRange(value, shiftAmount, shiftUnit));
        };

        return (
            <div className={classNames} {...rest} ref={ref}>
                {!hideNavigation &&
                    renderButtonBack({
                        children: <CaretleftStrokeSrvIcon20 paletteIndex={5} />,
                        className: clsx(styles.dateRangeButton, { disabled: shiftDisabled }),
                        disabled: shiftDisabled,
                        onClick: shiftRangeBack,
                    })}
                {renderPickerFrom({
                    onChange: handleChangePickerFrom,
                    value: start,
                })}
                <RangeStrokeSrvIcon16 className={styles.separator} paletteIndex={5} />
                {renderPickerTo({
                    onChange: handleChangePickerTo,
                    value: end,
                })}
                {!hideNavigation &&
                    renderButtonForward({
                        children: <CaretrightStrokeSrvIcon20 paletteIndex={5} />,
                        className: clsx(styles.dateRangeButton, { disabled: shiftDisabled }),
                        disabled: shiftDisabled,
                        onClick: shiftRangeForward,
                    })}
            </div>
        );
    },
);

DateRange.displayName = "DateRange";
