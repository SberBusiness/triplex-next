import React, { useState, useEffect, useContext, useCallback } from "react";
import moment from "moment";
import { CalendarContext } from "../CalendarContext";
import { CalendarViewContext } from "../CalendarViewContext";
import {
    ICalendarNavigationShift,
    ICalendarNavigationSteps,
    getNavigationShift,
    getShiftedDateInRange,
    isDateOutOfRange,
    VIEW_GRID_COLUMNS,
    VIEW_GRID_ROWS,
} from "../utils";
import { CalendarViewItem } from "./CalendarViewItem";
import { ECalendarPickType, ECalendarViewMode } from "../enums";
import { ICalendarViewProps } from "../types";
import styles from "../styles/CalendarView.module.less";

/** Свойства компонента CalendarViewMonths. */
export interface ICalendarViewMonthsProps extends Omit<
    ICalendarViewProps,
    "dayHtmlAttributes" | "yearHtmlAttributes"
> {}

/** Величины сдвига даты при клавиатурной навигации по сетке месяцев. */
const NAVIGATION_STEPS: ICalendarNavigationSteps = {
    horizontal: { amount: 1, unit: "month" },
    vertical: { amount: 3, unit: "month" },
    page: { amount: 1, unit: "year" },
};

/** Вид календаря с выбором месяца. */
export const CalendarViewMonths: React.FC<ICalendarViewMonthsProps> = ({ pickedDate, monthHtmlAttributes = {} }) => {
    const { pickType, periodId, limitRange, viewDate, onDateSelect, onPageChange, onViewChange } =
        useContext(CalendarContext);
    const { viewItemFocusedRef } = useContext(CalendarViewContext);
    const monthsShort = moment.monthsShort();

    /** Проверяет, является ли дата отключенной. */
    const isDisabledDate = useCallback(
        (date: moment.Moment) => isDateOutOfRange(date, limitRange, "month"),
        [limitRange],
    );

    /** Получить первую доступную для фокуса дату. */
    const getInitialTabbableDate = useCallback(() => {
        if (pickedDate && pickedDate.isSame(viewDate, "year")) {
            return pickedDate;
        } else {
            const date = viewDate.clone().startOf("year");

            for (let i = 0; i < 12; i++) {
                date.add(i, "month");

                if (!isDisabledDate(date)) {
                    return date;
                }
            }
        }
    }, [pickedDate, viewDate, isDisabledDate]);

    const [tabbableDate, setTabbableDate] = useState(getInitialTabbableDate());

    useEffect(() => {
        if (!viewItemFocusedRef.current) {
            setTabbableDate(getInitialTabbableDate());
        }
    }, [viewDate, viewItemFocusedRef, getInitialTabbableDate]);

    /** Рендер тела таблицы. */
    const renderTableBody = () => (
        <tbody>
            {VIEW_GRID_ROWS.map((row) => (
                <tr key={`calendar-view-months-row-${row}`}>
                    {VIEW_GRID_COLUMNS.map((cell) => renderTableData(row, cell))}
                </tr>
            ))}
        </tbody>
    );

    /** Рендер ячейки таблицы. */
    const renderTableData = (row: number, cell: number) => {
        const month = row * VIEW_GRID_COLUMNS.length + cell;
        const date = viewDate.clone().startOf("month").month(month);
        const active = isActiveDate(date);
        const disabled = isDisabledDate(date);
        const tabbable = !disabled && isTabbableDate(date);

        return (
            <CalendarViewItem
                key={`calendar-table-data-${cell}`}
                {...monthHtmlAttributes}
                date={date}
                unit="month"
                active={active}
                disabled={disabled}
                tabbable={tabbable}
                onKeyDown={handleItemKeyDown(date)}
                onDateSelect={handleDateSelect}
            >
                {monthsShort[month]}
            </CalendarViewItem>
        );
    };

    /** Проверяет, является ли дата активной. */
    const isActiveDate = (date: moment.Moment) => {
        if (pickedDate == null) {
            return false;
        }

        return pickedDate.isSame(date, "month");
    };

    /** Проверяет, может ли дата получить фокус при навигации. */
    const isTabbableDate = (date: moment.Moment) => {
        if (tabbableDate) {
            return date.isSame(tabbableDate, "month");
        }

        return false;
    };

    /** Обработчик нажатия клавиши CalendarViewItem. */
    const handleItemKeyDown = (date: moment.Moment) => (event: React.KeyboardEvent<HTMLTableCellElement>) => {
        const shift = getNavigationShift(event.code || event.keyCode, NAVIGATION_STEPS);

        if (!shift) {
            return;
        }

        event.preventDefault();
        changeTabbableDate(getShiftedDate(date, shift));
    };

    /** Возвращает доступную для выбора дату после сдвига. */
    const getShiftedDate = (currentDate: moment.Moment, shift: ICalendarNavigationShift) =>
        getShiftedDateInRange(currentDate, shift, limitRange, "month");

    /** Обработчик выбора даты. */
    const handleDateSelect = (date: moment.Moment) => {
        if (pickType === ECalendarPickType.MONTH_YEAR) {
            onDateSelect(date);
        } else {
            onViewChange(date, ECalendarViewMode.DAYS);
        }
    };

    /** Изменение фокусируемой даты. */
    const changeTabbableDate = (date: moment.Moment) => {
        setTabbableDate(date);

        if (date.isBefore(viewDate, "year")) {
            date = viewDate.clone().subtract(1, "year");
            onPageChange(date, ECalendarViewMode.MONTHS);
        } else if (date.isAfter(viewDate, "year")) {
            date = viewDate.clone().add(1, "year");
            onPageChange(date, ECalendarViewMode.MONTHS);
        }
    };

    return (
        <table className={styles.calendarViewMonths} role="grid" aria-labelledby={periodId}>
            {renderTableBody()}
        </table>
    );
};

CalendarViewMonths.displayName = "CalendarViewMonths";
