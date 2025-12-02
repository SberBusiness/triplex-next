import clsx from "clsx";
import React, { useState, useEffect, useContext, useCallback } from "react";
import moment from "moment";
import { isDateOutOfRange, isDayDisabled } from "@sberbusiness/triplex-next/components/Calendar/utils";
import { WEEKDAYS_SET } from "@sberbusiness/triplex-next/consts/DateConst";
import { CalendarViewContext } from "@sberbusiness/triplex-next/components/Calendar/CalendarViewContext";
import { CalendarViewItem } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarViewItem";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import { ECalendarDateMarkType, ECalendarViewMode } from "@sberbusiness/triplex-next/components/Calendar/enums";
import { CalendarContext } from "@sberbusiness/triplex-next/components/Calendar/CalendarContext";
import { ICalendarViewProps } from "@sberbusiness/triplex-next/components/Calendar/types";
import styles from "../styles/CalendarView.module.less";

/** Свойства компонента CalendarViewDays. */
export interface ICalendarViewDaysProps
    extends Omit<ICalendarViewProps, "monthHtmlAttributes" | "yearHtmlAttributes"> {}

/** Вид календаря с выбором дня. */
export const CalendarViewDays: React.FC<ICalendarViewDaysProps> = ({
    pickedDate,
    pickedRange,
    dayHtmlAttributes = {},
}) => {
    const { format, periodId, limitRange, viewDate, markedDays, disabledDays, onDateSelect, onPageChange } =
        useContext(CalendarContext);
    const { viewItemFocusedRef } = useContext(CalendarViewContext);
    const startDate = viewDate.clone().startOf("month").startOf("week");

    /** Проверяет, является ли дата отключенной. */
    const isDisabledDate = useCallback(
        (date: moment.Moment) =>
            isDateOutOfRange(date, limitRange, "day") || isDayDisabled(date.format(format), disabledDays),
        [limitRange, disabledDays, format],
    );

    /** Получить первую доступную для фокуса дату. */
    const getInitialTabbableDate = useCallback(() => {
        if (pickedDate && pickedDate.isSame(viewDate, "month")) {
            return pickedDate;
        } else {
            const date = viewDate.clone().startOf("month");

            for (let i = 0; i < date.daysInMonth(); i++) {
                date.add(i, "day");

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

    /** Рендер заголовка таблицы. */
    const renderTableHead = () => {
        const weekdays = moment.weekdays(true);
        const weekdaysMin = moment.weekdaysMin(true);

        return (
            <thead>
                <tr>
                    {WEEKDAYS_SET.map((header) => (
                        <th
                            key={`calendar-table-header-${header}`}
                            className={styles.calendarViewDaysHeader}
                            abbr={weekdays[header]}
                        >
                            {weekdaysMin[header]}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    };

    /** Рендер тела таблицы. */
    const renderTableBody = () => (
        <tbody className={styles.calendarViewDaysBody}>
            {[0, 1, 2, 3, 4, 5].map((row) => (
                <tr key={`calendar-table-row-${row}`}>
                    {[0, 1, 2, 3, 4, 5, 6].map((cell) => renderTableData(row, cell))}
                </tr>
            ))}
        </tbody>
    );

    /** Рендер ячейки таблицы. */
    const renderTableData = (row: number, cell: number) => {
        const date = moment(startDate).add(row * 7 + cell, "day");
        const classNames = clsx({ [styles.current]: isCurrentDate(date) }, getRangeClassName(date));
        const active = isActiveDate(date);
        const disabled = isDisabledDate(date);
        const tabbable = !disabled && isTabbableDay(date);
        const muted = isMutedDate(date);
        const markType = getMarkType(date);

        return (
            <CalendarViewItem
                key={`calendar-table-data-${cell}`}
                className={classNames}
                {...(typeof dayHtmlAttributes === "function"
                    ? dayHtmlAttributes({ marked: markType !== undefined })
                    : dayHtmlAttributes)}
                date={date}
                unit="day"
                active={active}
                disabled={disabled}
                tabbable={tabbable}
                muted={muted}
                markType={markType}
                onKeyDown={handleItemKeyDown(date)}
                onDateSelect={handleDateSelect}
            >
                {date.date()}
            </CalendarViewItem>
        );
    };

    /** Проверяет, может ли дата получить фокус при навигации. */
    const isTabbableDay = (date: moment.Moment) => {
        if (tabbableDate) {
            return date.isSame(tabbableDate, "day");
        }

        return false;
    };

    /** Проверяет, относится ли дата к текущему месяцу. */
    const isMutedDate = (date: moment.Moment) => {
        return !date.isSame(viewDate, "month");
    };

    /** Проверяет, является ли дата сегодняшней. */
    const isCurrentDate = (date: moment.Moment) => {
        return date.isSame(moment(), "day");
    };

    /** Проверяет, является ли дата активной. */
    const isActiveDate = (date: moment.Moment) => {
        if (pickedRange) {
            return !!(pickedRange[0]?.isSame(date, "day") || pickedRange[1]?.isSame(date, "day"));
        } else {
            return !!pickedDate && date.isSame(pickedDate, "day");
        }
    };

    /** Проверяет, является ли дата отмеченной. */
    const getMarkType = (date: moment.Moment) => {
        if (markedDays) {
            const day = date.format(format);

            if (Array.isArray(markedDays)) {
                if (markedDays.includes(day)) {
                    return ECalendarDateMarkType.BASIC;
                }
            } else if (day in markedDays) {
                return markedDays[date.format(format)];
            }
        }
    };

    /** Возвращает класс положения даты в выбранном периоде. */
    const getRangeClassName = (date: moment.Moment) => {
        if (
            !pickedRange ||
            !pickedRange[0] ||
            !pickedRange[1] ||
            !date.isBetween(pickedRange[0], pickedRange[1], "day", "[]")
        ) {
            return;
        }

        let className: string;

        if (pickedRange[0].isSame(pickedRange[1], "day")) {
            className = styles.rangeSingle;
        } else if (date.isSame(pickedRange[0], "day")) {
            className = styles.rangeStart;
        } else if (date.isSame(pickedRange[1], "day")) {
            className = styles.rangeEnd;
        } else {
            className = styles.rangeBetween;
        }

        return className;
    };

    /** Возвращает доступную для выбора дату после сдвига. */
    const getShiftedDate = (
        currentDate: moment.Moment,
        operation: "add" | "subtract",
        amount: number,
        unit: "day" | "week" | "month",
    ) => {
        const day = currentDate.clone();
        const shiftDay = {
            add: moment.fn.add.bind(day),
            subtract: moment.fn.subtract.bind(day),
        }[operation];

        while (shiftDay(amount, unit)) {
            // Если вышли за пределы доступного периода – возвращаем текущий день.
            if (isDateOutOfRange(day, limitRange, "day")) {
                return currentDate;
            }
            // Если день доступен для выбора – выходим из поиска.
            if (!isDisabledDate(day)) {
                break;
            }
        }

        return day;
    };

    /** Обработчик нажатия клавиши CalendarViewItem. */
    const handleItemKeyDown = (date: moment.Moment) => (event: React.KeyboardEvent<HTMLTableCellElement>) => {
        const key = event.code || event.keyCode;
        let nextFocusedDate;

        if (isKey(key, "ARROW_RIGHT")) {
            nextFocusedDate = getShiftedDate(date, "add", 1, "day");
            event.preventDefault();
        } else if (isKey(key, "ARROW_LEFT")) {
            nextFocusedDate = getShiftedDate(date, "subtract", 1, "day");
            event.preventDefault();
        } else if (isKey(key, "ARROW_DOWN")) {
            nextFocusedDate = getShiftedDate(date, "add", 1, "week");
            event.preventDefault();
        } else if (isKey(key, "ARROW_UP")) {
            nextFocusedDate = getShiftedDate(date, "subtract", 1, "week");
            event.preventDefault();
        } else if (isKey(key, "PAGE_DOWN")) {
            nextFocusedDate = getShiftedDate(date, "add", 1, "month");
            event.preventDefault();
        } else if (isKey(key, "PAGE_UP")) {
            nextFocusedDate = getShiftedDate(date, "subtract", 1, "month");
            event.preventDefault();
        }

        if (nextFocusedDate) {
            changeTabbableDate(nextFocusedDate);
        }
    };

    /** Обработчик клика по дате. */
    const handleDateSelect = (date: moment.Moment) => {
        onDateSelect(date);
    };

    /** Изменение фокусируемой даты. */
    const changeTabbableDate = (date: moment.Moment) => {
        setTabbableDate(date);

        if (date.isBefore(viewDate, "month")) {
            date = viewDate.clone().subtract(1, "month");
            onPageChange(date, ECalendarViewMode.DAYS);
        } else if (date.isAfter(viewDate, "month")) {
            date = viewDate.clone().add(1, "month");
            onPageChange(date, ECalendarViewMode.DAYS);
        }
    };

    return (
        <table className={styles.calendarViewDays} role="grid" aria-labelledby={periodId}>
            {renderTableHead()}
            {renderTableBody()}
        </table>
    );
};
