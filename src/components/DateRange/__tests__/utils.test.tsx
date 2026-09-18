import { describe, it, expect } from "vitest";
import { shiftDateRange } from "../utils";
import { EDateRangeShiftUnit } from "../enums";
import { TDateRangeValue } from "../DateRange";

const january: TDateRangeValue = ["20240101", "20240131"];

describe("shiftDateRange", () => {
    it("shifts both dates forward by the given amount of months", () => {
        expect(shiftDateRange(january, 1, EDateRangeShiftUnit.MONTH)).toEqual(["20240201", "20240229"]);
    });

    it("shifts both dates back when amount is negative", () => {
        expect(shiftDateRange(january, -1, EDateRangeShiftUnit.MONTH)).toEqual(["20231201", "20231231"]);
    });

    it("shifts by days", () => {
        expect(shiftDateRange(january, 2, EDateRangeShiftUnit.DAY)).toEqual(["20240103", "20240202"]);
        expect(shiftDateRange(january, -2, EDateRangeShiftUnit.DAY)).toEqual(["20231230", "20240129"]);
    });

    it("shifts by weeks", () => {
        expect(shiftDateRange(january, 1, EDateRangeShiftUnit.WEEK)).toEqual(["20240108", "20240207"]);
        expect(shiftDateRange(january, -1, EDateRangeShiftUnit.WEEK)).toEqual(["20231225", "20240124"]);
    });

    it("shifts by quarters", () => {
        expect(shiftDateRange(january, 1, EDateRangeShiftUnit.QUARTER)).toEqual(["20240401", "20240430"]);
        expect(shiftDateRange(january, -1, EDateRangeShiftUnit.QUARTER)).toEqual(["20231001", "20231031"]);
    });

    it("shifts by years", () => {
        expect(shiftDateRange(january, 1, EDateRangeShiftUnit.YEAR)).toEqual(["20250101", "20250131"]);
        expect(shiftDateRange(january, -1, EDateRangeShiftUnit.YEAR)).toEqual(["20230101", "20230131"]);
    });

    it("clamps the day of month when the target month is shorter", () => {
        expect(shiftDateRange(["20240131", "20240331"], 1, EDateRangeShiftUnit.MONTH)).toEqual([
            "20240229",
            "20240430",
        ]);
        expect(shiftDateRange(["20240331", "20240531"], -1, EDateRangeShiftUnit.MONTH)).toEqual([
            "20240229",
            "20240430",
        ]);
    });

    it("clamps February 29 to February 28 in a non-leap year", () => {
        expect(shiftDateRange(["20240229", "20240229"], 1, EDateRangeShiftUnit.YEAR)).toEqual(["20250228", "20250228"]);
    });

    it("keeps the range unchanged when amount is zero", () => {
        expect(shiftDateRange(january, 0, EDateRangeShiftUnit.MONTH)).toEqual(january);
    });

    it("shifts both dates independently, without reordering them", () => {
        expect(shiftDateRange(["20240110", "20240105"], 1, EDateRangeShiftUnit.MONTH)).toEqual([
            "20240210",
            "20240205",
        ]);
    });
});
