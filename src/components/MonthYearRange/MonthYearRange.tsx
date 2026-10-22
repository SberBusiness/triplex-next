import React from "react";
import { RangeStrokeSrvIcon16, CaretleftStrokeSrvIcon20, CaretrightStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { dateFormatYYYYMMDD } from "../../consts/DateConst";
import { isDateAfter, shiftDateRange } from "../DateRange/utils";
import { EMonthYearRangeShiftUnit } from "./enums";
import { IMonthYearRangeProps } from "./types";
import styles from "./styles/MonthYearRange.module.less";

/**
 * Выбор диапазона месяцев: поля «от» и «до» и кнопки сдвига диапазона назад и вперёд.
 * Поля и кнопки рендерит потребитель через render-props.
 */
export const MonthYearRange = React.forwardRef<HTMLDivElement, IMonthYearRangeProps>(
    (
        {
            className,
            value,
            format = dateFormatYYYYMMDD,
            shiftAmount = 1,
            shiftUnit = EMonthYearRangeShiftUnit.MONTH,
            hideNavigation,
            onChange,
            renderPickerFrom,
            renderPickerTo,
            renderButtonForward,
            renderButtonBack,
            ...restProps
        },
        ref,
    ) => {
        const [start, end] = value;
        const classNames = clsx(styles.monthYearRange, className);
        /** Сдвиг возможен только при обеих заполненных границах диапазона. */
        const shiftDisabled = !(start && end);

        /** Обработчик изменения значения в поле выбора месяца "от". Сбрасывает месяц "до", если он оказался меньше. */
        const handleChangePickerFrom = (date: string) => {
            if (!date || !end || !isDateAfter(date, end, format)) {
                onChange([date, end]);
            } else {
                onChange([date, ""]);
            }
        };

        /** Обработчик изменения значения в поле выбора месяца "до". Сбрасывает месяц "от", если он оказался больше. */
        const handleChangePickerTo = (date: string) => {
            if (!date || !start || !isDateAfter(start, date, format)) {
                onChange([start, date]);
            } else {
                onChange(["", date]);
            }
        };

        /** Смещает обе границы диапазона на amount единиц. Неполный или невалидный диапазон не сдвигается. */
        const shiftRange = (amount: number) => {
            const shiftedValue = shiftDateRange(value, amount, shiftUnit, format);

            if (shiftedValue) {
                onChange(shiftedValue);
            }
        };

        return (
            <div className={classNames} {...restProps} ref={ref}>
                {!hideNavigation &&
                    renderButtonBack({
                        children: <CaretleftStrokeSrvIcon20 paletteIndex={5} />,
                        className: styles.monthYearRangeButton,
                        disabled: shiftDisabled,
                        onClick: () => shiftRange(-shiftAmount),
                    })}
                {renderPickerFrom({
                    value: start,
                    format,
                    onChange: handleChangePickerFrom,
                })}
                <RangeStrokeSrvIcon16 className={styles.separator} paletteIndex={5} />
                {renderPickerTo({
                    value: end,
                    format,
                    onChange: handleChangePickerTo,
                })}
                {!hideNavigation &&
                    renderButtonForward({
                        children: <CaretrightStrokeSrvIcon20 paletteIndex={5} />,
                        className: styles.monthYearRangeButton,
                        disabled: shiftDisabled,
                        onClick: () => shiftRange(shiftAmount),
                    })}
            </div>
        );
    },
);

MonthYearRange.displayName = "MonthYearRange";
