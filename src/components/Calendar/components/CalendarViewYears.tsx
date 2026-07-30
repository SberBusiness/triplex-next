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
} from "../utils";
import { CalendarViewItem } from "./CalendarViewItem";
import { ECalendarViewMode } from "../enums";
import { ICalendarViewProps } from "../types";
import styles from "../styles/CalendarView.module.less";

/** Свойства компонента CalendarViewYears. */
export interface ICalendarViewYearsProps extends Omit<
    ICalendarViewProps,
    "dayHtmlAttributes" | "monthHtmlAttributes"
> {}

/** Строки сетки годов. */
const GRID_ROWS = [0, 1, 2, 3];

/** Колонки сетки годов. */
const GRID_COLUMNS = [0, 1, 2];

/** Количество лет до отображаемого года, попадающих на страницу. */
const YEARS_BEFORE_VIEW_DATE = 5;

/** Величины сдвига даты при клавиатурной навигации по сетке годов. */
const NAVIGATION_STEPS: ICalendarNavigationSteps = {
    horizontal: { amount: 1, unit: "year" },
    vertical: { amount: 3, unit: "year" },
    page: { amount: 12, unit: "year" },
};

/** Вид календаря с выбором года. */
export const CalendarViewYears: React.FC<ICalendarViewYearsProps> = ({ pickedDate, yearHtmlAttributes = {} }) => {
    const { periodId, limitRange, viewDate, onPageChange, onViewChange } = useContext(CalendarContext);
    const { viewItemFocusedRef } = useContext(CalendarViewContext);
    const currentYear = viewDate.year();

    /** Проверяет, является ли дата отключенной. */
    const isDisabledDate = useCallback(
        (date: moment.Moment) => isDateOutOfRange(date, limitRange, "year"),
        [limitRange],
    );

    /** Получить первую доступную для фокуса дату. */
    const getInitialTabbableDate = useCallback(() => {
        if (pickedDate && pickedDate.isSame(viewDate, "year")) {
            return pickedDate;
        } else {
            const date = viewDate.clone().subtract(YEARS_BEFORE_VIEW_DATE, "year");

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
            {GRID_ROWS.map((row) => (
                <tr key={`calendar-view-years-row-${row}`}>{GRID_COLUMNS.map((cell) => renderTableData(row, cell))}</tr>
            ))}
        </tbody>
    );

    /** Рендер ячейки таблицы. */
    const renderTableData = (row: number, cell: number) => {
        const year = currentYear + row * GRID_COLUMNS.length + cell - YEARS_BEFORE_VIEW_DATE;
        const date = viewDate.clone().startOf("year").year(year);
        const active = isActiveDate(date);
        const disabled = isDisabledDate(date);
        const tabbable = !disabled && isTabbableDate(date);

        return (
            <CalendarViewItem
                key={`calendar-table-data-${cell}`}
                {...yearHtmlAttributes}
                date={date}
                unit="year"
                active={active}
                disabled={disabled}
                tabbable={tabbable}
                onKeyDown={handleItemKeyDown(date)}
                onDateSelect={handleDateSelect}
            >
                {year}
            </CalendarViewItem>
        );
    };

    /** Проверяет, является ли дата активной. */
    const isActiveDate = (date: moment.Moment) => {
        if (pickedDate == null) {
            return false;
        }

        return pickedDate.isSame(date, "year");
    };

    /** Проверяет, может ли дата получить фокус при навигации. */
    const isTabbableDate = (date: moment.Moment) => {
        if (tabbableDate) {
            return date.isSame(tabbableDate, "year");
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
        changeFocusedDate(getShiftedDate(date, shift));
    };

    /** Возвращает доступную для выбора дату после сдвига. */
    const getShiftedDate = (currentDate: moment.Moment, shift: ICalendarNavigationShift) =>
        getShiftedDateInRange(currentDate, shift, limitRange, "year");

    /** Обработчик выбора даты. */
    const handleDateSelect = (date: moment.Moment) => {
        onViewChange(date, ECalendarViewMode.MONTHS);
    };

    /** Изменение фокусируемой даты. */
    const changeFocusedDate = (date: moment.Moment) => {
        setTabbableDate(date);

        if (date.year() + 5 < viewDate.year()) {
            date = viewDate.clone().subtract(12, "years");
            onPageChange(date, ECalendarViewMode.YEARS);
        } else if (date.year() - 6 > viewDate.year()) {
            date = viewDate.clone().add(12, "years");
            onPageChange(date, ECalendarViewMode.YEARS);
        }
    };

    return (
        <table className={styles.calendarViewYears} role="grid" aria-labelledby={periodId}>
            {renderTableBody()}
        </table>
    );
};

CalendarViewYears.displayName = "CalendarViewYears";
