import { describe, it, expect } from "vitest";
import { dateFormatYYYYMMDD } from "../../../consts/DateConst";
import { isDateAfter, shiftDateRange } from "../utils";
import { EDateRangeShiftUnit } from "../enums";
import { TDateRangeValue } from "../types";

const january: TDateRangeValue = ["20240101", "20240131"];

describe("shiftDateRange", () => {
    it("shifts both dates forward by the given amount of months", () => {
        expect(shiftDateRange(january, 1, EDateRangeShiftUnit.MONTH, dateFormatYYYYMMDD)).toEqual([
            "20240201",
            "20240229",
        ]);
    });

    it("shifts both dates back when amount is negative", () => {
        expect(shiftDateRange(january, -1, EDateRangeShiftUnit.MONTH, dateFormatYYYYMMDD)).toEqual([
            "20231201",
            "20231231",
        ]);
    });

    it("shifts by days", () => {
        expect(shiftDateRange(january, 2, EDateRangeShiftUnit.DAY, dateFormatYYYYMMDD)).toEqual([
            "20240103",
            "20240202",
        ]);
        expect(shiftDateRange(january, -2, EDateRangeShiftUnit.DAY, dateFormatYYYYMMDD)).toEqual([
            "20231230",
            "20240129",
        ]);
    });

    it("shifts by weeks", () => {
        expect(shiftDateRange(january, 1, EDateRangeShiftUnit.WEEK, dateFormatYYYYMMDD)).toEqual([
            "20240108",
            "20240207",
        ]);
        expect(shiftDateRange(january, -1, EDateRangeShiftUnit.WEEK, dateFormatYYYYMMDD)).toEqual([
            "20231225",
            "20240124",
        ]);
    });

    it("shifts by quarters", () => {
        expect(shiftDateRange(january, 1, EDateRangeShiftUnit.QUARTER, dateFormatYYYYMMDD)).toEqual([
            "20240401",
            "20240430",
        ]);
        expect(shiftDateRange(january, -1, EDateRangeShiftUnit.QUARTER, dateFormatYYYYMMDD)).toEqual([
            "20231001",
            "20231031",
        ]);
    });

    it("shifts by years", () => {
        expect(shiftDateRange(january, 1, EDateRangeShiftUnit.YEAR, dateFormatYYYYMMDD)).toEqual([
            "20250101",
            "20250131",
        ]);
        expect(shiftDateRange(january, -1, EDateRangeShiftUnit.YEAR, dateFormatYYYYMMDD)).toEqual([
            "20230101",
            "20230131",
        ]);
    });

    it("clamps the day of month when the target month is shorter", () => {
        expect(shiftDateRange(["20240131", "20240331"], 1, EDateRangeShiftUnit.MONTH, dateFormatYYYYMMDD)).toEqual([
            "20240229",
            "20240430",
        ]);
        expect(shiftDateRange(["20240331", "20240531"], -1, EDateRangeShiftUnit.MONTH, dateFormatYYYYMMDD)).toEqual([
            "20240229",
            "20240430",
        ]);
    });

    it("clamps February 29 to February 28 in a non-leap year", () => {
        expect(shiftDateRange(["20240229", "20240229"], 1, EDateRangeShiftUnit.YEAR, dateFormatYYYYMMDD)).toEqual([
            "20250228",
            "20250228",
        ]);
    });

    it("keeps the range unchanged when amount is zero", () => {
        expect(shiftDateRange(january, 0, EDateRangeShiftUnit.MONTH, dateFormatYYYYMMDD)).toEqual(january);
    });

    it("shifts both dates independently, without reordering them", () => {
        expect(shiftDateRange(["20240110", "20240105"], 1, EDateRangeShiftUnit.MONTH, dateFormatYYYYMMDD)).toEqual([
            "20240210",
            "20240205",
        ]);
    });

    it("parses and formats dates in the given format", () => {
        expect(shiftDateRange(["31.01.2024", "31.03.2024"], 1, EDateRangeShiftUnit.MONTH, "DD.MM.YYYY")).toEqual([
            "29.02.2024",
            "30.04.2024",
        ]);
    });

    it("returns null when any of the dates is invalid", () => {
        expect(shiftDateRange(["20241301", "20240131"], 1, EDateRangeShiftUnit.MONTH, dateFormatYYYYMMDD)).toBeNull();
        expect(shiftDateRange(["20240101", "garbage"], 1, EDateRangeShiftUnit.MONTH, dateFormatYYYYMMDD)).toBeNull();
    });

    it("returns null when dates do not match the format", () => {
        // Нестрогий парсинг разобрал бы "31.01.2024" как YYYYMMDD и вернул бы "20310220".
        expect(
            shiftDateRange(["31.01.2024", "29.02.2024"], 1, EDateRangeShiftUnit.MONTH, dateFormatYYYYMMDD),
        ).toBeNull();
    });
});

describe("isDateAfter", () => {
    it("compares dates chronologically in YYYYMMDD format", () => {
        expect(isDateAfter("20240201", "20240131", dateFormatYYYYMMDD)).toBe(true);
        expect(isDateAfter("20240131", "20240201", dateFormatYYYYMMDD)).toBe(false);
    });

    it("compares dates chronologically when the format is not lexicographically ordered", () => {
        // Как строки "01.02.2024" < "31.01.2024", хотя 1 февраля позже 31 января.
        expect(isDateAfter("01.02.2024", "31.01.2024", "DD.MM.YYYY")).toBe(true);
        expect(isDateAfter("31.01.2024", "01.02.2024", "DD.MM.YYYY")).toBe(false);
    });

    it("returns false for equal dates", () => {
        expect(isDateAfter("20240131", "20240131", dateFormatYYYYMMDD)).toBe(false);
    });

    it("returns false when any of the dates is invalid", () => {
        expect(isDateAfter("2024", "20240131", dateFormatYYYYMMDD)).toBe(false);
        expect(isDateAfter("20240131", "31.01.2024", dateFormatYYYYMMDD)).toBe(false);
    });
});
