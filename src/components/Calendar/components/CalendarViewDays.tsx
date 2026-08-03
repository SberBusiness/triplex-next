import React, { useState, useEffect, useContext, useCallback } from "react";
import moment from "moment";
import clsx from "clsx";
import {
    ICalendarNavigationShift,
    ICalendarNavigationSteps,
    getFirstEnabledDate,
    getNavigationShift,
    isDateOutOfRange,
    isDayDisabled,
    shiftDate,
} from "../utils";
import { WEEKDAYS_SET, WEEKS_SET } from "../../../consts/DateConst";
import { CalendarViewContext } from "../CalendarViewContext";
import { CalendarViewItem } from "./CalendarViewItem";
import { ECalendarDateMarkType, ECalendarViewMode } from "../enums";
import { CalendarContext } from "../CalendarContext";
import { ICalendarViewProps } from "../types";
import styles from "../styles/CalendarView.module.less";

/** Свойства компонента CalendarViewDays. */
export interface ICalendarViewDaysProps extends Omit<
    ICalendarViewProps,
    "monthHtmlAttributes" | "yearHtmlAttributes"
> {}

/** Величины сдвига даты при клавиатурной навигации по сетке дней. */
const NAVIGATION_STEPS: ICalendarNavigationSteps = {
    horizontal: { amount: 1, unit: "day" },
    vertical: { amount: 1, unit: "week" },
    page: { amount: 1, unit: "month" },
};

/** Вид календаря с выбором дня. */
export const CalendarViewDays: React.FC<ICalendarViewDaysProps> = ({ pickedDate, dayHtmlAttributes = {} }) => {
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
        }

        const startOfMonth = viewDate.clone().startOf("month");

        return getFirstEnabledDate(startOfMonth, startOfMonth.daysInMonth(), "day", isDisabledDate);
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
            {WEEKS_SET.map((row) => (
                <tr key={`calendar-table-row-${row}`}>{WEEKDAYS_SET.map((cell) => renderTableData(row, cell))}</tr>
            ))}
        </tbody>
    );

    /** Рендер ячейки таблицы. */
    const renderTableData = (row: number, cell: number) => {
        const date = moment(startDate).add(row * 7 + cell, "day");
        const classNames = clsx({ [styles.current]: isCurrentDate(date) });
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
                onDateSelect={onDateSelect}
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
        return !!pickedDate && date.isSame(pickedDate, "day");
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
                return markedDays[day];
            }
        }
    };

    /** Возвращает доступную для выбора дату после сдвига. Недоступные дни пропускаются. */
    const getShiftedDate = (currentDate: moment.Moment, shift: ICalendarNavigationShift) => {
        const day = currentDate.clone();

        do {
            shiftDate(day, shift);

            // Если вышли за пределы доступного периода – возвращаем текущий день.
            if (isDateOutOfRange(day, limitRange, "day")) {
                return currentDate;
            }
            // Если день недоступен для выбора – продолжаем поиск в том же направлении.
        } while (isDisabledDate(day));

        return day;
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

    /** Изменение фокусируемой даты. При уходе даты за пределы страницы перелистывает страницу на шаг NAVIGATION_STEPS.page. */
    const changeTabbableDate = (date: moment.Moment) => {
        setTabbableDate(date);

        if (date.isBefore(viewDate, "month")) {
            onPageChange(
                shiftDate(viewDate.clone(), { operation: "subtract", ...NAVIGATION_STEPS.page }),
                ECalendarViewMode.DAYS,
            );
        } else if (date.isAfter(viewDate, "month")) {
            onPageChange(
                shiftDate(viewDate.clone(), { operation: "add", ...NAVIGATION_STEPS.page }),
                ECalendarViewMode.DAYS,
            );
        }
    };

    return (
        <table className={styles.calendarViewDays} role="grid" aria-labelledby={periodId}>
            {renderTableHead()}
            {renderTableBody()}
        </table>
    );
};

CalendarViewDays.displayName = "CalendarViewDays";
