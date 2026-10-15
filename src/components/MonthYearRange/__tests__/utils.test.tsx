import { describe, it, expect } from "vitest";
import { dateFormatYYYYMMDD } from "../../../consts/DateConst";
import { isDateAfter, shiftMonthYearRange } from "../utils";
import { EMonthYearRangeShiftUnit } from "../enums";
import { TMonthYearRangeValue } from "../types";

const firstQuarter: TMonthYearRangeValue = ["20240101", "20240301"];

describe("shiftMonthYearRange", () => {
    it("shifts both dates forward by the given amount of months", () => {
        expect(shiftMonthYearRange(firstQuarter, 1, EMonthYearRangeShiftUnit.MONTH, dateFormatYYYYMMDD)).toEqual([
            "20240201",
            "20240401",
        ]);
    });

    it("shifts both dates back when amount is negative", () => {
        expect(shiftMonthYearRange(firstQuarter, -1, EMonthYearRangeShiftUnit.MONTH, dateFormatYYYYMMDD)).toEqual([
            "20231201",
            "20240201",
        ]);
    });

    it("shifts by quarters and years", () => {
        expect(shiftMonthYearRange(firstQuarter, 1, EMonthYearRangeShiftUnit.QUARTER, dateFormatYYYYMMDD)).toEqual([
            "20240401",
            "20240601",
        ]);
        expect(shiftMonthYearRange(firstQuarter, 1, EMonthYearRangeShiftUnit.YEAR, dateFormatYYYYMMDD)).toEqual([
            "20250101",
            "20250301",
        ]);
    });

    it("clamps the day of month when the target month is shorter", () => {
        expect(
            shiftMonthYearRange(["20240331", "20240531"], -1, EMonthYearRangeShiftUnit.MONTH, dateFormatYYYYMMDD),
        ).toEqual(["20240229", "20240430"]);
    });

    it("parses and formats dates in the given format", () => {
        expect(
            shiftMonthYearRange(["01.12.2023", "01.02.2024"], 1, EMonthYearRangeShiftUnit.MONTH, "DD.MM.YYYY"),
        ).toEqual(["01.01.2024", "01.03.2024"]);
    });

    it("returns null when any of the dates is invalid", () => {
        expect(
            shiftMonthYearRange(["20241301", "20240301"], 1, EMonthYearRangeShiftUnit.MONTH, dateFormatYYYYMMDD),
        ).toBeNull();
        expect(
            shiftMonthYearRange(["20240101", "garbage"], 1, EMonthYearRangeShiftUnit.MONTH, dateFormatYYYYMMDD),
        ).toBeNull();
    });

    it("returns null when dates do not match the format", () => {
        expect(
            shiftMonthYearRange(["01.12.2023", "01.02.2024"], 1, EMonthYearRangeShiftUnit.MONTH, dateFormatYYYYMMDD),
        ).toBeNull();
    });
});

describe("isDateAfter", () => {
    it("compares dates chronologically in YYYYMMDD format", () => {
        expect(isDateAfter("20240201", "20240101", dateFormatYYYYMMDD)).toBe(true);
        expect(isDateAfter("20240101", "20240201", dateFormatYYYYMMDD)).toBe(false);
    });

    it("compares dates chronologically when the format is not lexicographically ordered", () => {
        // Как строки "01.02.2024" < "01.12.2023", хотя февраль 2024 позже декабря 2023.
        expect(isDateAfter("01.02.2024", "01.12.2023", "DD.MM.YYYY")).toBe(true);
        expect(isDateAfter("01.12.2023", "01.02.2024", "DD.MM.YYYY")).toBe(false);
    });

    it("returns false for equal dates", () => {
        expect(isDateAfter("20240101", "20240101", dateFormatYYYYMMDD)).toBe(false);
    });

    it("returns false when any of the dates is invalid", () => {
        expect(isDateAfter("2024", "20240101", dateFormatYYYYMMDD)).toBe(false);
        expect(isDateAfter("20240101", "01.01.2024", dateFormatYYYYMMDD)).toBe(false);
    });
});
