import React, { useState, useEffect, useContext, useCallback } from "react";
import moment from "moment";
import { ICalendarViewProps } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarView";
import { CalendarContext } from "@sberbusiness/triplex-next/components/Calendar/CalendarContext";
import { CalendarViewContext } from "@sberbusiness/triplex-next/components/Calendar/CalendarViewContext";
import { isDateOutOfRange } from "@sberbusiness/triplex-next/components/Calendar/utils";
import { CalendarViewItem } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarViewItem";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import { ECalendarViewMode } from "@sberbusiness/triplex-next/components/Calendar/enums";
import styles from "../styles/CalendarView.module.less";

/** Свойства компонента CalendarViewMonths. */
export interface ICalendarViewYearsProps
    extends Omit<ICalendarViewProps, "viewMode" | "dayHtmlAttributes" | "monthHtmlAttributes"> {}

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
            const date = viewDate.clone().subtract(5, "year");

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
            {[0, 1, 2, 3].map((row) => (
                <tr key={`calendar-view-years-row-${row}`}>{[0, 1, 2].map((cell) => renderTableData(row, cell))}</tr>
            ))}
        </tbody>
    );

    /** Рендер ячейки таблицы. */
    const renderTableData = (row: number, cell: number) => {
        const year = currentYear + row * 3 + cell - 5;
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
        const key = event.code || event.keyCode;
        let nextFocusedDate;

        if (isKey(key, "ARROW_RIGHT")) {
            nextFocusedDate = getShiftedDate(date, "add", 1, "year");
            event.preventDefault();
        } else if (isKey(key, "ARROW_LEFT")) {
            nextFocusedDate = getShiftedDate(date, "subtract", 1, "year");
            event.preventDefault();
        } else if (isKey(key, "ARROW_DOWN")) {
            nextFocusedDate = getShiftedDate(date, "add", 3, "year");
            event.preventDefault();
        } else if (isKey(key, "ARROW_UP")) {
            nextFocusedDate = getShiftedDate(date, "subtract", 3, "year");
            event.preventDefault();
        } else if (isKey(key, "PAGE_DOWN")) {
            nextFocusedDate = getShiftedDate(date, "add", 12, "year");
            event.preventDefault();
        } else if (isKey(key, "PAGE_UP")) {
            nextFocusedDate = getShiftedDate(date, "subtract", 12, "year");
            event.preventDefault();
        }

        if (nextFocusedDate) {
            changeFocusedDate(nextFocusedDate);
        }
    };

    /** Возвращает доступную для выбора дату после сдвига. */
    const getShiftedDate = (
        currentDate: moment.Moment,
        operation: "add" | "subtract",
        amount: number,
        unit: "month" | "year",
    ) => {
        const date = currentDate.clone();
        const shiftDate = {
            add: moment.fn.add.bind(date),
            subtract: moment.fn.subtract.bind(date),
        }[operation];

        shiftDate(amount, unit);

        if (isDateOutOfRange(date, limitRange, "year")) {
            return currentDate;
        }

        return date;
    };

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
