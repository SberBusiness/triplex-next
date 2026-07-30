import moment from "moment";
import { headerDateFormat, globalLimitRange } from "@sberbusiness/triplex-next/consts/DateConst";
import { ECalendarViewMode } from "@sberbusiness/triplex-next/components/Calendar/enums";
import { TPickedDate, TPickedDateProp } from "@sberbusiness/triplex-next/components/Calendar/types";
import { IDateLimitRange } from "@sberbusiness/triplex-next/types/DateTypes";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";

/** Направление сдвига даты. */
export type TCalendarShiftOperation = "add" | "subtract";

/** Единица измерения сдвига даты внутри календаря. */
export type TCalendarShiftUnit = "day" | "week" | "month" | "year";

/** Величина сдвига даты по одной из осей клавиатурной навигации. */
export interface ICalendarNavigationStep {
    /** Количество единиц сдвига. */
    amount: number;
    /** Единица измерения сдвига. */
    unit: TCalendarShiftUnit;
}

/** Величины сдвига даты по всем осям клавиатурной навигации конкретного вида календаря. */
export interface ICalendarNavigationSteps {
    /** Шаг по горизонтали — соседняя ячейка строки (ArrowLeft / ArrowRight). */
    horizontal: ICalendarNavigationStep;
    /** Шаг по вертикали — соседняя строка сетки (ArrowUp / ArrowDown). */
    vertical: ICalendarNavigationStep;
    /** Шаг на страницу — соседняя страница календаря (PageUp / PageDown). */
    page: ICalendarNavigationStep;
}

/** Сдвиг даты: направление и величина. */
export interface ICalendarNavigationShift extends ICalendarNavigationStep {
    /** Направление сдвига. */
    operation: TCalendarShiftOperation;
}

/**
 * Приведение даты к типу Moment.
 * @param value Значение.
 * @param [format] Формат для значения.
 */
export function parsePickedDate(value: TPickedDateProp | undefined, format?: string): TPickedDate {
    if (!value) {
        return null;
    } else if (typeof value === "string") {
        return moment(value, format);
    } else {
        return value;
    }
}

/**
 * Получить актуальный заголовок. Для пустой или невалидной даты используется текущая дата.
 * @param {TPickedDate} date Дата для построения заголовка.
 */
export function getHeader(date: TPickedDate): string {
    const currentDate = date && date.isValid() ? date : moment();

    return currentDate.format(headerDateFormat);
}

/**
 * Получить текст заголовка из текущей даты.
 * @param viewDate Отображаемая дата.
 * @param viewMode Текущая вкладка.
 */
export function formatDate(viewDate: TPickedDate, viewMode: ECalendarViewMode): string {
    const checkedDate = viewDate ? viewDate : moment();

    switch (viewMode) {
        case ECalendarViewMode.DAYS:
            return getHeader(checkedDate);
        case ECalendarViewMode.MONTHS:
            return checkedDate.clone().format("YYYY");
        case ECalendarViewMode.YEARS: {
            const yearFrom = checkedDate.clone().add(-5, "y").format("YYYY");
            const yearTo = checkedDate.clone().add(6, "y").format("YYYY");

            return `${yearFrom} - ${yearTo}`;
        }
    }
}

/** Проверяет, выходит ли дата за разрешённый период. */
export function isDateOutOfRange(date: moment.Moment, limitRange: IDateLimitRange, unit: "day" | "month" | "year") {
    const dateFrom = limitRange.dateFrom || globalLimitRange.dateFrom;
    const dateTo = limitRange.dateTo || globalLimitRange.dateTo;

    return date.isBefore(dateFrom, unit) || date.isAfter(dateTo, unit);
}

/** Проверяет, является ли день недоступным для выбора. */
export function isDayDisabled(day: string, disabledDays: string[] | undefined) {
    if (disabledDays === undefined) {
        return false;
    }

    return disabledDays.includes(day);
}

/**
 * Сдвигает дату на указанную величину в указанном направлении. Мутирует переданную дату (как и методы moment).
 * @param date Дата, которую нужно сдвинуть.
 * @param shift Направление и величина сдвига.
 */
export function shiftDate(date: moment.Moment, shift: ICalendarNavigationShift): moment.Moment {
    const { operation, amount, unit } = shift;

    return operation === "add" ? date.add(amount, unit) : date.subtract(amount, unit);
}

/**
 * Возвращает дату после сдвига. Если сдвинутая дата выходит за разрешённый период — возвращает исходную дату.
 * @param date Исходная дата.
 * @param shift Направление и величина сдвига.
 * @param limitRange Ограничение выбираемого периода.
 * @param limitUnit Единица сравнения даты с ограничением периода.
 */
export function getShiftedDateInRange(
    date: moment.Moment,
    shift: ICalendarNavigationShift,
    limitRange: IDateLimitRange,
    limitUnit: "day" | "month" | "year",
): moment.Moment {
    const shiftedDate = shiftDate(date.clone(), shift);

    return isDateOutOfRange(shiftedDate, limitRange, limitUnit) ? date : shiftedDate;
}

/**
 * Возвращает первую не отключённую дату среди `count` дат-кандидатов, начиная с `startDate`,
 * с шагом в одну единицу `unit` между соседними кандидатами. Исходная дата не мутируется.
 * Если все кандидаты отключены — возвращает undefined.
 * @param startDate Первая дата-кандидат.
 * @param count Количество проверяемых кандидатов.
 * @param unit Единица измерения шага между кандидатами.
 * @param isDateDisabled Предикат отключённой даты.
 */
export function getFirstEnabledDate(
    startDate: moment.Moment,
    count: number,
    unit: TCalendarShiftUnit,
    isDateDisabled: (date: moment.Moment) => boolean,
): moment.Moment | undefined {
    for (let i = 0; i < count; i++) {
        const date = startDate.clone().add(i, unit);

        if (!isDateDisabled(date)) {
            return date;
        }
    }
}

/**
 * Возвращает направление и величину сдвига даты для нажатой клавиши навигации.
 * Для клавиш, не участвующих в навигации по сетке календаря, возвращает undefined.
 * @param key Код нажатой клавиши.
 * @param steps Величины сдвига по осям навигации для текущего вида календаря.
 */
export function getNavigationShift(
    key: string | number,
    steps: ICalendarNavigationSteps,
): ICalendarNavigationShift | undefined {
    if (isKey(key, "ARROW_RIGHT")) {
        return { operation: "add", ...steps.horizontal };
    } else if (isKey(key, "ARROW_LEFT")) {
        return { operation: "subtract", ...steps.horizontal };
    } else if (isKey(key, "ARROW_DOWN")) {
        return { operation: "add", ...steps.vertical };
    } else if (isKey(key, "ARROW_UP")) {
        return { operation: "subtract", ...steps.vertical };
    } else if (isKey(key, "PAGE_DOWN")) {
        return { operation: "add", ...steps.page };
    } else if (isKey(key, "PAGE_UP")) {
        return { operation: "subtract", ...steps.page };
    }
}

/** Строки сетки видов месяцев и годов. */
export const VIEW_GRID_ROWS = [0, 1, 2, 3];

/** Колонки сетки видов месяцев и годов. */
export const VIEW_GRID_COLUMNS = [0, 1, 2];
