import React from "react";
import moment from "moment";
import { RangeStrokeSrvIcon16, CaretleftStrokeSrvIcon20, CaretrightStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { dateFormatYYYYMMDD } from "../../consts/DateConst";
import { EMonthYearRangeShiftUnit } from "./enums";
import styles from "./styles/MonthYearRange.module.less";

/** Свойства функции рендеринга кнопки сдвига диапазона месяцев. */
export interface IMonthYearRangeButtonProvideProps {
    children: React.ReactNode;
    className: string;
    onClick: () => void;
    disabled: boolean;
}

/** Свойства функции рендеринга поля выбора месяца. */
export interface IMonthYearRangePickerProvideProps {
    value: string;
    onChange: (value: string) => void;
}

/** Значение компонента MonthYearRange. */
export type TMonthYearRangeValue = [string, string];

/** Свойства компонента MonthYearRange. */
export interface IMonthYearRangeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
    /** Диапазон месяцев. */
    value: TMonthYearRangeValue;
    /** Функция, вызывающаяся при изменении диапазона месяцев. */
    onChange: (value: TMonthYearRangeValue) => void;
    /** Численная величина сдвига диапазона месяцев. */
    shiftAmount?: number;
    /** Единица измерения сдвига диапазона месяцев. */
    shiftUnit?: EMonthYearRangeShiftUnit;
    /** Управление отображением/скрытием кнопок сдвига диапазона месяцев. */
    hideNavigation?: boolean;
    /** Функция рендеринга поля выбора месяца "от". */
    renderPickerFrom: (props: IMonthYearRangePickerProvideProps) => React.ReactNode;
    /** Функция рендеринга поля выбора месяца "до". */
    renderPickerTo: (props: IMonthYearRangePickerProvideProps) => React.ReactNode;
    /** Функция рендеринга кнопки сдвига диапазона месяцев "назад". */
    renderButtonBack: (props: IMonthYearRangeButtonProvideProps) => React.ReactNode;
    /** Функция рендеринга кнопки сдвига диапазона месяцев "вперёд". */
    renderButtonForward: (props: IMonthYearRangeButtonProvideProps) => React.ReactNode;
}

/** Выбор диапазона месяцев. */
export const MonthYearRange = React.forwardRef<HTMLDivElement, IMonthYearRangeProps>(
    (
        {
            className,
            value,
            onChange,
            shiftAmount = 1,
            shiftUnit = EMonthYearRangeShiftUnit.MONTH,
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
        const classNames = clsx(styles.monthYearRange, className);

        /** Обработчик изменения значения в поле выбора месяца "от". */
        const handleChangePickerFrom = (date: string) => {
            if (!date || !end || date <= end) {
                onChange([date, end]);
            } else {
                onChange([date, ""]);
            }
        };

        /** Обработчик изменения значения в поле выбора месяца "до". */
        const handleChangePickerTo = (date: string) => {
            if (!date || !start || date >= start) {
                onChange([start, date]);
            } else {
                onChange(["", date]);
            }
        };

        /** Функция, смещающая диапазон месяцев назад. */
        const shiftRangeBack = () => {
            if (!start || !end) {
                return;
            }

            const momentStart = moment(start, dateFormatYYYYMMDD, true);
            const momentEnd = moment(end, dateFormatYYYYMMDD, true);

            if (!momentStart.isValid() || !momentEnd.isValid()) {
                return;
            }

            onChange([
                momentStart.subtract(shiftAmount, shiftUnit).format(dateFormatYYYYMMDD),
                momentEnd.subtract(shiftAmount, shiftUnit).format(dateFormatYYYYMMDD),
            ]);
        };

        /** Функция, смещающая диапазон месяцев вперёд. */
        const shiftRangeForward = () => {
            if (!start || !end) {
                return;
            }

            const momentStart = moment(start, dateFormatYYYYMMDD, true);
            const momentEnd = moment(end, dateFormatYYYYMMDD, true);

            if (!momentStart.isValid() || !momentEnd.isValid()) {
                return;
            }

            onChange([
                momentStart.add(shiftAmount, shiftUnit).format(dateFormatYYYYMMDD),
                momentEnd.add(shiftAmount, shiftUnit).format(dateFormatYYYYMMDD),
            ]);
        };

        return (
            <div className={classNames} {...rest} ref={ref}>
                {!hideNavigation &&
                    renderButtonBack({
                        children: <CaretleftStrokeSrvIcon20 paletteIndex={5} />,
                        className: clsx(styles.monthYearRangeButton),
                        disabled: !(start && end),
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
                        className: clsx(styles.monthYearRangeButton),
                        disabled: !(start && end),
                        onClick: shiftRangeForward,
                    })}
            </div>
        );
    },
);

MonthYearRange.displayName = "MonthYearRange";
