import React from "react";
import moment from "moment";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Calendar } from "../Calendar";
import { ICalendarProps } from "../types";
import { ECalendarDateMarkType, ECalendarPickType, ECalendarViewMode } from "../enums";
import { dateFormatYYYYMMDD } from "../../../consts/DateConst";

const PICKED_DATE = "19700115";

const defaultProps: ICalendarProps = {
    pickedDate: PICKED_DATE,
    onDateChange: vi.fn(),
    prevButtonProps: { "data-testid": "calendar-prev" },
    nextButtonProps: { "data-testid": "calendar-next" },
    viewButtonProps: { "data-testid": "calendar-view" },
};

const renderCalendar = (props: Partial<ICalendarProps> = {}) => render(<Calendar {...defaultProps} {...props} />);

/**
 * Возвращает ячейку сетки календаря по её тексту.
 * В сетке дней числа соседних месяцев дублируются, поэтому приоритет отдаётся ячейке текущего месяца.
 */
const getCell = (text: string) => {
    const labels = screen.getAllByText(text);
    const label = labels.find((element) => !element.classList.contains("muted")) || labels[0];

    return label.closest("td") as HTMLTableCellElement;
};

describe("Calendar", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Часть тестов сравнивает результат с "сегодня" — фиксируем его, иначе
        // прогон на границе суток или месяца может мигать. Месяц намеренно отличается
        // от PICKED_DATE: на этом различии построены тесты футера.
        vi.useFakeTimers({ shouldAdvanceTime: true });
        vi.setSystemTime(new Date(1970, 5, 10));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("renders grid with header of the picked date", () => {
        renderCalendar();

        expect(screen.getByRole("grid")).toBeInTheDocument();
        expect(screen.getByTestId("calendar-view")).toHaveTextContent("January 1970");
    });

    it("marks picked date as selected", () => {
        renderCalendar();

        expect(getCell("15")).toHaveAttribute("aria-selected", "true");
    });

    it("uses defaultViewDate when pickedDate is empty", () => {
        renderCalendar({ pickedDate: null, defaultViewDate: "19700601" });

        expect(screen.getByTestId("calendar-view")).toHaveTextContent("June 1970");
    });

    it("calls onDateChange with the clicked date", () => {
        const onDateChange = vi.fn();
        renderCalendar({ onDateChange });

        fireEvent.click(screen.getByText("20"));

        expect(onDateChange).toHaveBeenCalledTimes(1);
        expect(onDateChange.mock.calls[0][0].format(dateFormatYYYYMMDD)).toBe("19700120");
    });

    it("switches to the next page and calls onPageChange", () => {
        const onPageChange = vi.fn();
        renderCalendar({ onPageChange });

        fireEvent.click(screen.getByTestId("calendar-next"));

        expect(screen.getByTestId("calendar-view")).toHaveTextContent("February 1970");
        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange.mock.calls[0][0].format(dateFormatYYYYMMDD)).toBe("19700215");
        expect(onPageChange.mock.calls[0][1]).toBe(ECalendarViewMode.DAYS);
    });

    it("switches to the previous page", () => {
        renderCalendar();

        fireEvent.click(screen.getByTestId("calendar-prev"));

        expect(screen.getByTestId("calendar-view")).toHaveTextContent("December 1969");
    });

    it("switches views days -> months -> years and calls onViewChange", () => {
        const onViewChange = vi.fn();
        renderCalendar({ onViewChange });

        fireEvent.click(screen.getByTestId("calendar-view"));

        expect(screen.getByTestId("calendar-view")).toHaveTextContent("1970");
        expect(screen.getByText("Jan")).toBeInTheDocument();
        expect(onViewChange.mock.calls[0][1]).toBe(ECalendarViewMode.MONTHS);

        fireEvent.click(screen.getByTestId("calendar-view"));

        expect(onViewChange.mock.calls[1][1]).toBe(ECalendarViewMode.YEARS);
        expect(screen.getByText("1965 - 1976")).toBeInTheDocument();
        expect(screen.getByText("1976")).toBeInTheDocument();
    });

    it("renders period as non-interactive element in years view", () => {
        renderCalendar({ reversedPick: true });

        expect(screen.queryByTestId("calendar-view")).not.toBeInTheDocument();
        expect(screen.getByText("1965 - 1976")).toBeInTheDocument();
    });

    it("opens months view for MONTH_YEAR pick type", () => {
        renderCalendar({ pickType: ECalendarPickType.MONTH_YEAR });

        expect(screen.getByText("Jan")).toBeInTheDocument();
        expect(screen.getByTestId("calendar-view")).toHaveTextContent("1970");
    });

    it("selects month as a date for MONTH_YEAR pick type", () => {
        const onDateChange = vi.fn();
        renderCalendar({ pickType: ECalendarPickType.MONTH_YEAR, onDateChange });

        fireEvent.click(screen.getByText("Mar"));

        expect(onDateChange).toHaveBeenCalledTimes(1);
        expect(onDateChange.mock.calls[0][0].format("YYYYMM")).toBe("197003");
    });

    it("drills down from month to days for DATE pick type", () => {
        const onDateChange = vi.fn();
        renderCalendar({ onDateChange });

        fireEvent.click(screen.getByTestId("calendar-view"));
        fireEvent.click(screen.getByText("Mar"));

        expect(onDateChange).not.toHaveBeenCalled();
        expect(screen.getByTestId("calendar-view")).toHaveTextContent("March 1970");
    });

    it("drills down from year to months", () => {
        renderCalendar({ reversedPick: true });

        fireEvent.click(screen.getByText("1972"));

        expect(screen.getByText("Jan")).toBeInTheDocument();
        expect(screen.getByTestId("calendar-view")).toHaveTextContent("1972");
    });

    it("disables days listed in disabledDays", () => {
        renderCalendar({ disabledDays: ["19700120"] });

        expect(getCell("20")).toHaveClass("disabled");
        expect(getCell("21")).not.toHaveClass("disabled");
    });

    it("marks days listed in markedDays array", () => {
        renderCalendar({ markedDays: ["19700120"] });

        expect(screen.getByText("20")).toHaveClass("marked");
        expect(screen.getByText("20")).toHaveClass("basicMark");
    });

    it("marks days with the given mark type", () => {
        renderCalendar({ markedDays: { "19700120": ECalendarDateMarkType.CRITICAL } });

        expect(screen.getByText("20")).toHaveClass("criticalMark");
    });

    it("disables page buttons outside of limitRange", () => {
        renderCalendar({
            limitRange: {
                dateFrom: moment("19700101", dateFormatYYYYMMDD),
                dateTo: moment("19700131", dateFormatYYYYMMDD),
            },
        });

        expect(screen.getByTestId("calendar-prev")).toBeDisabled();
        expect(screen.getByTestId("calendar-next")).toBeDisabled();
    });

    it("disables days outside of limitRange", () => {
        renderCalendar({
            limitRange: {
                dateFrom: moment("19700110", dateFormatYYYYMMDD),
                dateTo: moment("19700131", dateFormatYYYYMMDD),
            },
        });

        expect(getCell("5")).toHaveClass("disabled");
        expect(getCell("20")).not.toHaveClass("disabled");
    });

    it("supports partially defined limitRange", () => {
        renderCalendar({ limitRange: { dateFrom: moment("19700110", dateFormatYYYYMMDD) } });

        expect(getCell("5")).toHaveClass("disabled");
        expect(getCell("20")).not.toHaveClass("disabled");
        expect(screen.getByTestId("calendar-prev")).toBeDisabled();
        // Верхняя граница не задана — действует глобальное ограничение.
        expect(screen.getByTestId("calendar-next")).not.toBeDisabled();
    });

    it("passes html attributes to day cells", () => {
        renderCalendar({ dayHtmlAttributes: { "data-testid": "day" } });

        expect(screen.getAllByTestId("day")).toHaveLength(42);
    });

    it("passes marked flag to dayHtmlAttributes function", () => {
        renderCalendar({
            markedDays: ["19700120"],
            dayHtmlAttributes: ({ marked }) => ({ title: marked ? "marked" : "not marked" }),
        });

        expect(getCell("20")).toHaveAttribute("title", "marked");
        expect(getCell("21")).toHaveAttribute("title", "not marked");
    });

    it("applies data attributes returned by dayHtmlAttributes function", () => {
        renderCalendar({
            markedDays: ["19700120"],
            dayHtmlAttributes: ({ marked }) => ({ "data-marked": String(marked) }),
        });

        expect(getCell("20")).toHaveAttribute("data-marked", "true");
        expect(getCell("21")).toHaveAttribute("data-marked", "false");
    });

    it("applies adaptive class in adaptive mode", () => {
        const { container } = renderCalendar({ adaptiveMode: true });

        expect(container.firstChild).toHaveClass("adaptive");
        expect(container.firstChild).not.toHaveClass("extraBottom");
    });

    it("moves tabbable cell with arrow keys", () => {
        renderCalendar();

        expect(getCell("15")).toHaveAttribute("tabindex", "0");

        fireEvent.keyDown(getCell("15"), { code: "ArrowRight" });

        expect(getCell("16")).toHaveAttribute("tabindex", "0");
        expect(getCell("15")).toHaveAttribute("tabindex", "-1");

        fireEvent.keyDown(getCell("16"), { code: "ArrowDown" });

        expect(getCell("23")).toHaveAttribute("tabindex", "0");
    });

    it("skips disabled days during keyboard navigation", () => {
        renderCalendar({ disabledDays: ["19700116", "19700117"] });

        fireEvent.keyDown(getCell("15"), { code: "ArrowRight" });

        expect(getCell("18")).toHaveAttribute("tabindex", "0");
    });

    it("keeps tabbable cell when navigation leaves the limit range", () => {
        renderCalendar({
            limitRange: {
                dateFrom: moment("19700101", dateFormatYYYYMMDD),
                dateTo: moment("19700115", dateFormatYYYYMMDD),
            },
        });

        fireEvent.keyDown(getCell("15"), { code: "ArrowRight" });

        expect(getCell("15")).toHaveAttribute("tabindex", "0");
    });

    it("makes the first enabled day of the page tabbable when initial days are disabled", () => {
        renderCalendar({ pickedDate: null, defaultViewDate: "19700101", disabledDays: ["19700101", "19700102"] });

        // Кандидаты перебираются подряд, без накопления шага: 1, 2, 3 — а не 1, 2, 4.
        expect(getCell("3")).toHaveAttribute("tabindex", "0");
        expect(getCell("4")).toHaveAttribute("tabindex", "-1");
    });

    it("makes the first year within the limit range tabbable in years view", () => {
        renderCalendar({
            reversedPick: true,
            pickedDate: null,
            defaultViewDate: "19700101",
            limitRange: { dateFrom: moment("19710101", dateFormatYYYYMMDD) },
        });

        expect(getCell("1970")).toHaveClass("disabled");
        expect(getCell("1971")).toHaveAttribute("tabindex", "0");
    });

    it("switches page when keyboard navigation leaves the current month", () => {
        const onPageChange = vi.fn();
        renderCalendar({ pickedDate: "19700131", onPageChange });

        fireEvent.keyDown(getCell("31"), { code: "ArrowRight" });

        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange.mock.calls[0][0].format("YYYYMM")).toBe("197002");
    });

    it("moves tabbable cell with arrow keys in months view", () => {
        renderCalendar({ pickType: ECalendarPickType.MONTH_YEAR });

        expect(getCell("Jan")).toHaveAttribute("tabindex", "0");

        fireEvent.keyDown(getCell("Jan"), { code: "ArrowRight" });

        expect(getCell("Feb")).toHaveAttribute("tabindex", "0");
        expect(getCell("Jan")).toHaveAttribute("tabindex", "-1");

        fireEvent.keyDown(getCell("Feb"), { code: "ArrowDown" });

        expect(getCell("May")).toHaveAttribute("tabindex", "0");
    });

    it("switches year when keyboard navigation leaves the months page", () => {
        const onPageChange = vi.fn();
        renderCalendar({ pickType: ECalendarPickType.MONTH_YEAR, onPageChange });

        fireEvent.keyDown(getCell("Jan"), { code: "PageUp" });

        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange.mock.calls[0][0].format("YYYY")).toBe("1969");
    });

    it("moves tabbable cell with arrow keys in years view", () => {
        renderCalendar({ reversedPick: true });

        expect(getCell("1970")).toHaveAttribute("tabindex", "0");

        fireEvent.keyDown(getCell("1970"), { code: "ArrowRight" });

        expect(getCell("1971")).toHaveAttribute("tabindex", "0");
        expect(getCell("1970")).toHaveAttribute("tabindex", "-1");

        fireEvent.keyDown(getCell("1971"), { code: "ArrowDown" });

        expect(getCell("1974")).toHaveAttribute("tabindex", "0");
    });

    it("switches page when keyboard navigation leaves the years page", () => {
        const onPageChange = vi.fn();
        renderCalendar({ reversedPick: true, onPageChange });

        fireEvent.keyDown(getCell("1970"), { code: "PageDown" });

        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange.mock.calls[0][0].format("YYYY")).toBe("1982");
    });

    it("moves focus to the tabbable cell while navigating with the keyboard", () => {
        renderCalendar();

        fireEvent.focus(getCell("15"));
        fireEvent.keyDown(getCell("15"), { code: "ArrowRight" });

        expect(getCell("16")).toHaveFocus();
    });

    it("keeps the focused cell across a page change in years view", () => {
        renderCalendar({ reversedPick: true });

        // Пока фокус находится в сетке, смена страницы не сбрасывает выбранную ячейку,
        // поэтому шаг страницы (12 лет) наблюдаем напрямую.
        fireEvent.focus(getCell("1970"));
        fireEvent.keyDown(getCell("1970"), { code: "PageDown" });

        expect(getCell("1982")).toHaveAttribute("tabindex", "0");
    });

    it("keeps the focused cell across a page change in months view", () => {
        renderCalendar({ pickType: ECalendarPickType.MONTH_YEAR });

        fireEvent.focus(getCell("Jan"));
        fireEvent.keyDown(getCell("Jan"), { code: "ArrowUp" });

        // Шаг по вертикали в месяцах равен 3, поэтому фокус уходит на предыдущую страницу.
        expect(screen.getByTestId("calendar-view")).toHaveTextContent("1969");
        expect(getCell("Oct")).toHaveAttribute("tabindex", "0");
    });

    it("moves focus to the new tabbable cell after a keyboard page change in days view", () => {
        renderCalendar();

        getCell("15").focus();
        fireEvent.keyDown(getCell("15"), { code: "PageDown" });

        expect(screen.getByTestId("calendar-view")).toHaveTextContent("February 1970");
        expect(getCell("15")).toHaveFocus();

        fireEvent.keyDown(getCell("15"), { code: "PageUp" });

        expect(screen.getByTestId("calendar-view")).toHaveTextContent("January 1970");
        expect(getCell("15")).toHaveFocus();
    });

    it("returns focus to the tabbable cell when its grid position survives a page change", () => {
        renderCalendar({ reversedPick: true });

        // При смене страницы годов на 12 лет tabbable-ячейка остаётся на той же позиции сетки.
        fireEvent.focus(getCell("1970"));
        fireEvent.keyDown(getCell("1970"), { code: "PageDown" });

        expect(getCell("1982")).toHaveFocus();
    });

    it("keeps focus on the tabbable cell across a page change in months view", () => {
        renderCalendar({ pickType: ECalendarPickType.MONTH_YEAR });

        fireEvent.focus(getCell("Jan"));
        fireEvent.keyDown(getCell("Jan"), { code: "PageDown" });

        expect(screen.getByTestId("calendar-view")).toHaveTextContent(/^1971$/);
        expect(getCell("Jan")).toHaveAttribute("tabindex", "0");
        expect(getCell("Jan")).toHaveFocus();
    });

    it("does not move focus into the grid on a page change from the controls", () => {
        renderCalendar();

        const nextButton = screen.getByTestId("calendar-next");
        nextButton.focus();
        fireEvent.click(nextButton);

        expect(nextButton).toHaveFocus();
    });

    it("does not render footer without todayButtonProps", () => {
        const { container } = renderCalendar();

        expect(container.querySelector(".calendarFooter")).toBeNull();
        expect(container.firstChild).not.toHaveClass("extraBottom");
    });

    it("renders footer buttons for the current month", () => {
        renderCalendar({
            pickedDate: moment().format(dateFormatYYYYMMDD),
            todayButtonProps: { "data-testid": "calendar-today", children: "Today" },
            yesterdayButtonProps: { "data-testid": "calendar-yesterday", children: "Yesterday" },
            tomorrowButtonProps: { "data-testid": "calendar-tomorrow", children: "Tomorrow" },
        });

        expect(screen.getByTestId("calendar-yesterday")).toBeInTheDocument();
        expect(screen.getByTestId("calendar-today")).toBeInTheDocument();
        expect(screen.getByTestId("calendar-tomorrow")).toBeInTheDocument();
    });

    it("hides aside footer buttons outside of the current month", () => {
        renderCalendar({
            todayButtonProps: { "data-testid": "calendar-today", children: "Today" },
            yesterdayButtonProps: { "data-testid": "calendar-yesterday", children: "Yesterday" },
            tomorrowButtonProps: { "data-testid": "calendar-tomorrow", children: "Tomorrow" },
        });

        expect(screen.getByTestId("calendar-today")).toBeInTheDocument();
        expect(screen.queryByTestId("calendar-yesterday")).not.toBeInTheDocument();
        expect(screen.queryByTestId("calendar-tomorrow")).not.toBeInTheDocument();
    });

    it("selects today by the footer button when the current period is shown", () => {
        const onDateChange = vi.fn();
        renderCalendar({
            pickedDate: moment().format(dateFormatYYYYMMDD),
            onDateChange,
            todayButtonProps: { "data-testid": "calendar-today", children: "Today" },
        });

        fireEvent.click(screen.getByTestId("calendar-today"));

        expect(onDateChange).toHaveBeenCalledTimes(1);
        expect(onDateChange.mock.calls[0][0].format(dateFormatYYYYMMDD)).toBe(moment().format(dateFormatYYYYMMDD));
    });

    it("navigates to the current period by the footer button", () => {
        const onDateChange = vi.fn();
        const onPageChange = vi.fn();
        renderCalendar({
            onDateChange,
            onPageChange,
            todayButtonProps: { "data-testid": "calendar-today", children: "Go to today" },
        });

        fireEvent.click(screen.getByTestId("calendar-today"));

        expect(onDateChange).not.toHaveBeenCalled();
        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId("calendar-view")).toHaveTextContent(moment().format("MMMM YYYY"));
    });

    it("calls button props functions with the current view mode", () => {
        const prevButtonProps = vi.fn(() => ({ "data-testid": "calendar-prev" }));
        renderCalendar({ prevButtonProps });

        expect(prevButtonProps).toHaveBeenCalledWith(ECalendarViewMode.DAYS);
    });

    it("calls custom onClick of the page button along with page change", () => {
        const onClick = vi.fn();
        const onPageChange = vi.fn();
        renderCalendar({ nextButtonProps: { "data-testid": "calendar-next", onClick }, onPageChange });

        fireEvent.click(screen.getByTestId("calendar-next"));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onPageChange).toHaveBeenCalledTimes(1);
    });

    it("follows external pickedDate change to another month", () => {
        const { rerender } = renderCalendar();

        rerender(<Calendar {...defaultProps} pickedDate="19700620" />);

        expect(screen.getByTestId("calendar-view")).toHaveTextContent("June 1970");
        expect(getCell("20")).toHaveAttribute("aria-selected", "true");
    });

    it("formats header by the current view on external pickedDate change for MONTH_YEAR pick type", () => {
        const { rerender } = renderCalendar({ pickType: ECalendarPickType.MONTH_YEAR });

        rerender(<Calendar {...defaultProps} pickType={ECalendarPickType.MONTH_YEAR} pickedDate="19710315" />);

        // Заголовок вида MONTHS — только год, без месяца ("1971", а не "March 1971").
        expect(screen.getByTestId("calendar-view")).toHaveTextContent(/^1971$/);
        expect(getCell("Mar")).toHaveAttribute("aria-selected", "true");
    });
});
