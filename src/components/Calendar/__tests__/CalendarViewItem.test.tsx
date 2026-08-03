import React from "react";
import moment from "moment";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CalendarViewItem, ICalendarViewItemProps } from "../components/CalendarViewItem";
import { ECalendarDateMarkType } from "../enums";
import { dateFormatYYYYMMDD } from "../../../consts/DateConst";

const date = moment("19700115", dateFormatYYYYMMDD);

/** Собирает разметку ячейки с валидным табличным контекстом. */
const buildItem = (props: Partial<ICalendarViewItemProps> & Record<string, unknown> = {}) => {
    const allProps: ICalendarViewItemProps = {
        date,
        unit: "day",
        active: false,
        disabled: false,
        tabbable: false,
        onDateSelect: vi.fn(),
        ...props,
    };

    return {
        allProps,
        markup: (
            <table>
                <tbody>
                    <tr>
                        <CalendarViewItem {...allProps}>15</CalendarViewItem>
                    </tr>
                </tbody>
            </table>
        ),
    };
};

const renderItem = (props: Partial<ICalendarViewItemProps> & Record<string, unknown> = {}) => {
    const { allProps, markup } = buildItem(props);
    const result = render(markup);

    return {
        ...result,
        onDateSelect: allProps.onDateSelect,
        rerenderItem: (nextProps: Partial<ICalendarViewItemProps> & Record<string, unknown> = {}) =>
            result.rerender(buildItem(nextProps).markup),
    };
};

/** Возвращает ячейку таблицы. */
const getCell = () => screen.getByText("15").closest("td") as HTMLTableCellElement;

/** Возвращает внутренний элемент ячейки, на котором висит обработчик клика. */
const getLabel = () => screen.getByText("15");

describe("CalendarViewItem", () => {
    it("renders children inside table cell", () => {
        renderItem();

        expect(getCell()).toBeInTheDocument();
        expect(getCell()).toHaveClass("calendarViewItem");
    });

    it("is focusable only when tabbable", () => {
        const { rerenderItem } = renderItem({ tabbable: true });

        expect(getCell()).toHaveAttribute("tabindex", "0");

        rerenderItem({ tabbable: false });

        expect(getCell()).toHaveAttribute("tabindex", "-1");
    });

    it("marks active date with aria-selected and selected class", () => {
        renderItem({ active: true });

        expect(getCell()).toHaveAttribute("aria-selected", "true");
        expect(getLabel()).toHaveClass("selected");
    });

    it("does not set aria-selected for inactive date", () => {
        renderItem();

        expect(getCell()).not.toHaveAttribute("aria-selected");
    });

    it("applies disabled class to cell and label", () => {
        renderItem({ disabled: true });

        expect(getCell()).toHaveClass("disabled");
        expect(getLabel()).toHaveClass("disabled");
    });

    it("applies muted class for date outside of the current period", () => {
        renderItem({ muted: true });

        expect(getLabel()).toHaveClass("muted");
    });

    it.each([
        [ECalendarDateMarkType.BASIC, "basicMark"],
        [ECalendarDateMarkType.STANDARD, "standardMark"],
        [ECalendarDateMarkType.ATTENTION, "attentionMark"],
        [ECalendarDateMarkType.CRITICAL, "criticalMark"],
    ])("applies mark class for markType %s", (markType, className) => {
        renderItem({ markType });

        expect(getLabel()).toHaveClass("marked");
        expect(getLabel()).toHaveClass(className);
    });

    it("does not apply mark classes without markType", () => {
        renderItem();

        expect(getLabel()).not.toHaveClass("marked");
    });

    it.each([
        ["day" as const, "unitDay"],
        ["month" as const, "unitMonth"],
        ["year" as const, "unitYear"],
    ])("applies size class for unit %s", (unit, className) => {
        renderItem({ unit });

        expect(getLabel()).toHaveClass(className);
    });

    it("calls onDateSelect with the cell date on click", () => {
        const { onDateSelect } = renderItem();

        fireEvent.click(getLabel());

        expect(onDateSelect).toHaveBeenCalledTimes(1);
        expect(onDateSelect).toHaveBeenCalledWith(date);
    });

    it.each(["Enter", "Space"])("calls onDateSelect on %s key", (code) => {
        const { onDateSelect } = renderItem({ tabbable: true });

        fireEvent.keyDown(getCell(), { code });

        expect(onDateSelect).toHaveBeenCalledWith(date);
    });

    it("does not call onDateSelect on other keys", () => {
        const { onDateSelect } = renderItem({ tabbable: true });

        fireEvent.keyDown(getCell(), { code: "ArrowRight" });

        expect(onDateSelect).not.toHaveBeenCalled();
    });

    it("calls onKeyDown prop after own handling", () => {
        const onKeyDown = vi.fn();
        const { onDateSelect } = renderItem({ tabbable: true, onKeyDown });

        fireEvent.keyDown(getCell(), { code: "Enter" });

        expect(onDateSelect).toHaveBeenCalledWith(date);
        expect(onKeyDown).toHaveBeenCalledTimes(1);
    });

    it("calls onFocus and onBlur props", () => {
        const onFocus = vi.fn();
        const onBlur = vi.fn();
        renderItem({ tabbable: true, onFocus, onBlur });

        fireEvent.focus(getCell());
        expect(onFocus).toHaveBeenCalledTimes(1);

        fireEvent.blur(getCell());
        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it("merges className and spreads rest props to the cell", () => {
        renderItem({ className: "custom-class", "data-test-id": "day-cell" });

        expect(getCell()).toHaveClass("calendarViewItem");
        expect(getCell()).toHaveClass("custom-class");
        expect(getCell()).toHaveAttribute("data-test-id", "day-cell");
    });
});
