import React from "react";
import moment from "moment";
import { RangeStrokeSrvIcon16, CaretleftStrokeSrvIcon20, CaretrightStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { dateFormatYYYYMMDD } from "../../consts/DateConst";
import { EMonthYearRangeShiftUnit } from "./enums";
import styles from "./styles/MonthYearRange.module.less";

/** Свойства функции рендеринга кнопки сдвига диапазона месяцев. */
export interface IMonthYearRangeButtonProvideProps {
    /** Содержимое кнопки — иконка направления сдвига. */
    children: React.ReactNode;
    /** CSS-класс, который следует передать кнопке. */
    className: string;
    /** Обработчик сдвига; не вызывает onChange при пустой или невалидной границе. */
    onClick: () => void;
    /** Кнопка отключена, если хотя бы одна граница диапазона пуста. */
    disabled: boolean;
}

/** Свойства функции рендеринга поля выбора месяца. */
export interface IMonthYearRangePickerProvideProps {
    /** Дата в формате YYYYMMDD или пустая строка, если граница не выбрана. */
    value: string;
    /** Обработчик изменения границы; при пересечении очищает противоположную границу. */
    onChange: (value: string) => void;
}

/** Границы диапазона [от, до] в формате YYYYMMDD; пустая строка означает отсутствие границы. */
export type TMonthYearRangeValue = [string, string];

/** Свойства компонента MonthYearRange. */
export interface IMonthYearRangeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
    /** Границы диапазона [от, до] в формате YYYYMMDD; пустая строка означает отсутствие границы. */
    value: TMonthYearRangeValue;
    /** Обработчик изменения диапазона; передаёт новые границы для обновления value. */
    onChange: (value: TMonthYearRangeValue) => void;
    /** Величина сдвига, применяемая Moment.js. По умолчанию 1. */
    shiftAmount?: number;
    /** Единица измерения сдвига. По умолчанию EMonthYearRangeShiftUnit.MONTH. */
    shiftUnit?: EMonthYearRangeShiftUnit;
    /** Скрывает кнопки сдвига диапазона. По умолчанию кнопки отображаются. */
    hideNavigation?: boolean;
    /** Рендерит поле выбора месяца "от", используя переданные value и onChange. */
    renderPickerFrom: (props: IMonthYearRangePickerProvideProps) => React.ReactNode;
    /** Рендерит поле выбора месяца "до", используя переданные value и onChange. */
    renderPickerTo: (props: IMonthYearRangePickerProvideProps) => React.ReactNode;
    /** Рендерит кнопку сдвига назад, используя переданные children, className, onClick и disabled. */
    renderButtonBack: (props: IMonthYearRangeButtonProvideProps) => React.ReactNode;
    /** Рендерит кнопку сдвига вперёд, используя переданные children, className, onClick и disabled. */
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

        const shiftRange = (method: "subtract" | "add") => {
            if (!start || !end) {
                return;
            }

            const momentStart = moment(start, dateFormatYYYYMMDD, true);
            const momentEnd = moment(end, dateFormatYYYYMMDD, true);

            if (!momentStart.isValid() || !momentEnd.isValid()) {
                return;
            }

            onChange([
                momentStart[method](shiftAmount, shiftUnit).format(dateFormatYYYYMMDD),
                momentEnd[method](shiftAmount, shiftUnit).format(dateFormatYYYYMMDD),
            ]);
        };

        const shiftRangeBack = () => shiftRange("subtract");
        const shiftRangeForward = () => shiftRange("add");

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
