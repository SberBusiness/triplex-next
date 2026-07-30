import moment from "moment";
import { describe, it, expect } from "vitest";
import {
    formatDate,
    getHeader,
    getNavigationShift,
    getShiftedDateInRange,
    isDateOutOfRange,
    isDayDisabled,
    parsePickedDate,
    shiftDate,
} from "../utils";
import { ECalendarViewMode } from "../enums";
import { dateFormatYYYYMMDD } from "../../../consts/DateConst";
import { IDateLimitRange } from "../../../types/DateTypes";

const limitRange = {
    dateFrom: moment("19700101", dateFormatYYYYMMDD),
    dateTo: moment("19701231", dateFormatYYYYMMDD),
};

describe("Calendar utils", () => {
    describe("parsePickedDate", () => {
        it("returns null for empty values", () => {
            expect(parsePickedDate(null)).toBeNull();
            expect(parsePickedDate(undefined)).toBeNull();
            expect(parsePickedDate("")).toBeNull();
        });

        it("parses string value with given format", () => {
            const date = parsePickedDate("19700115", dateFormatYYYYMMDD);

            expect(date?.isValid()).toBe(true);
            expect(date?.format(dateFormatYYYYMMDD)).toBe("19700115");
        });

        it("returns the same instance for Moment value", () => {
            const date = moment("19700115", dateFormatYYYYMMDD);

            expect(parsePickedDate(date)).toBe(date);
        });
    });

    describe("getHeader", () => {
        it("formats given date as 'MMMM YYYY'", () => {
            expect(getHeader(moment("19700115", dateFormatYYYYMMDD))).toBe("January 1970");
        });

        it("falls back to current date for null value", () => {
            expect(getHeader(null)).toBe(moment().format("MMMM YYYY"));
        });

        it("falls back to current date for invalid value", () => {
            expect(getHeader(moment("not a date", dateFormatYYYYMMDD))).toBe(moment().format("MMMM YYYY"));
        });
    });

    describe("formatDate", () => {
        const date = moment("19700115", dateFormatYYYYMMDD);

        it("returns month and year for days view", () => {
            expect(formatDate(date, ECalendarViewMode.DAYS)).toBe("January 1970");
        });

        it("returns year for months view", () => {
            expect(formatDate(date, ECalendarViewMode.MONTHS)).toBe("1970");
        });

        it("returns 12 years period for years view", () => {
            expect(formatDate(date, ECalendarViewMode.YEARS)).toBe("1965 - 1976");
        });

        it("falls back to current date for null value", () => {
            expect(formatDate(null, ECalendarViewMode.MONTHS)).toBe(moment().format("YYYY"));
        });

        it("does not mutate the given date", () => {
            formatDate(date, ECalendarViewMode.YEARS);

            expect(date.format(dateFormatYYYYMMDD)).toBe("19700115");
        });
    });

    describe("isDateOutOfRange", () => {
        it("returns false for date inside the range", () => {
            expect(isDateOutOfRange(moment("19700615", dateFormatYYYYMMDD), limitRange, "day")).toBe(false);
        });

        it("returns true for date before dateFrom", () => {
            expect(isDateOutOfRange(moment("19691231", dateFormatYYYYMMDD), limitRange, "day")).toBe(true);
        });

        it("returns true for date after dateTo", () => {
            expect(isDateOutOfRange(moment("19710101", dateFormatYYYYMMDD), limitRange, "day")).toBe(true);
        });

        it("compares by the given unit", () => {
            const date = moment("19691231", dateFormatYYYYMMDD);

            expect(isDateOutOfRange(date, limitRange, "day")).toBe(true);
            expect(isDateOutOfRange(date, limitRange, "year")).toBe(true);
            expect(isDateOutOfRange(moment("19700101", dateFormatYYYYMMDD), limitRange, "year")).toBe(false);
        });

        it("falls back to global limit range for empty range", () => {
            // Тип IDateLimitRange требует обе даты, но функция поддерживает частично заданный диапазон в рантайме.
            const emptyRange = {} as IDateLimitRange;

            expect(isDateOutOfRange(moment("20200101", dateFormatYYYYMMDD), emptyRange, "day")).toBe(false);
            expect(isDateOutOfRange(moment("18000101", dateFormatYYYYMMDD), emptyRange, "day")).toBe(true);
        });
    });

    describe("isDayDisabled", () => {
        it("returns false when disabledDays is not defined", () => {
            expect(isDayDisabled("19700115", undefined)).toBe(false);
        });

        it("returns true only for listed days", () => {
            expect(isDayDisabled("19700115", ["19700115", "19700116"])).toBe(true);
            expect(isDayDisabled("19700117", ["19700115", "19700116"])).toBe(false);
        });
    });

    describe("shiftDate", () => {
        it("adds the given amount of units", () => {
            const date = moment("19700115", dateFormatYYYYMMDD);

            expect(shiftDate(date, { operation: "add", amount: 1, unit: "week" }).format(dateFormatYYYYMMDD)).toBe(
                "19700122",
            );
        });

        it("subtracts the given amount of units", () => {
            const date = moment("19700115", dateFormatYYYYMMDD);

            expect(
                shiftDate(date, { operation: "subtract", amount: 2, unit: "month" }).format(dateFormatYYYYMMDD),
            ).toBe("19691115");
        });

        it("mutates the given date", () => {
            const date = moment("19700115", dateFormatYYYYMMDD);

            shiftDate(date, { operation: "add", amount: 1, unit: "day" });

            expect(date.format(dateFormatYYYYMMDD)).toBe("19700116");
        });
    });

    describe("getShiftedDateInRange", () => {
        it("returns shifted date when it stays inside the range", () => {
            const date = moment("19700115", dateFormatYYYYMMDD);
            const result = getShiftedDateInRange(
                date,
                { operation: "add", amount: 1, unit: "month" },
                limitRange,
                "month",
            );

            expect(result.format(dateFormatYYYYMMDD)).toBe("19700215");
        });

        it("returns the original date when the shifted one is out of the range", () => {
            const date = moment("19700115", dateFormatYYYYMMDD);
            const result = getShiftedDateInRange(
                date,
                { operation: "subtract", amount: 1, unit: "year" },
                limitRange,
                "year",
            );

            expect(result).toBe(date);
        });

        it("does not mutate the original date", () => {
            const date = moment("19700115", dateFormatYYYYMMDD);

            getShiftedDateInRange(date, { operation: "add", amount: 1, unit: "month" }, limitRange, "month");

            expect(date.format(dateFormatYYYYMMDD)).toBe("19700115");
        });
    });

    describe("getNavigationShift", () => {
        const steps = {
            horizontal: { amount: 1, unit: "day" } as const,
            vertical: { amount: 1, unit: "week" } as const,
            page: { amount: 1, unit: "month" } as const,
        };

        it("maps horizontal arrows to the horizontal step", () => {
            expect(getNavigationShift("ArrowRight", steps)).toEqual({ operation: "add", amount: 1, unit: "day" });
            expect(getNavigationShift("ArrowLeft", steps)).toEqual({ operation: "subtract", amount: 1, unit: "day" });
        });

        it("maps vertical arrows to the vertical step", () => {
            expect(getNavigationShift("ArrowDown", steps)).toEqual({ operation: "add", amount: 1, unit: "week" });
            expect(getNavigationShift("ArrowUp", steps)).toEqual({ operation: "subtract", amount: 1, unit: "week" });
        });

        it("maps page keys to the page step", () => {
            expect(getNavigationShift("PageDown", steps)).toEqual({ operation: "add", amount: 1, unit: "month" });
            expect(getNavigationShift("PageUp", steps)).toEqual({ operation: "subtract", amount: 1, unit: "month" });
        });

        it("supports legacy numeric key codes", () => {
            expect(getNavigationShift(39, steps)).toEqual({ operation: "add", amount: 1, unit: "day" });
        });

        it("returns undefined for keys not used in grid navigation", () => {
            expect(getNavigationShift("Enter", steps)).toBeUndefined();
            expect(getNavigationShift("Space", steps)).toBeUndefined();
        });
    });
});
