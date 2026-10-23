import React from "react";
import { RangeStrokeSrvIcon16, CaretleftStrokeSrvIcon20, CaretrightStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { dateFormatYYYYMMDD } from "../../consts/DateConst";
import { EDateRangeShiftUnit } from "./enums";
import { IDateRangeProps } from "./types";
import { isDateAfter, shiftDateRange } from "./utils";
import styles from "./styles/DateRange.module.less";

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
            format = dateFormatYYYYMMDD,
            shiftAmount = 1,
            shiftUnit = EDateRangeShiftUnit.MONTH,
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
        const classNames = clsx(styles.dateRange, className);
        /** Сдвиг возможен только при обеих заполненных границах диапазона. */
        const shiftDisabled = !(start && end);

        /** Обработчик изменения значения в поле выбора даты "от". Сбрасывает дату "до", если она оказалась меньше. */
        const handleChangePickerFrom = (date: string) => {
            if (!date || !end || !isDateAfter(date, end, format)) {
                onChange([date, end]);
            } else {
                onChange([date, ""]);
            }
        };

        /** Обработчик изменения значения в поле выбора даты "до". Сбрасывает дату "от", если она оказалась больше. */
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
                        className: clsx(styles.dateRangeButton, { disabled: shiftDisabled }),
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
                        className: clsx(styles.dateRangeButton, { disabled: shiftDisabled }),
                        disabled: shiftDisabled,
                        onClick: () => shiftRange(shiftAmount),
                    })}
            </div>
        );
    },
);

DateRange.displayName = "DateRange";
