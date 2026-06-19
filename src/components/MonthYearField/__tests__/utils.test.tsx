import moment from "moment";
import { describe, it, expect } from "vitest";
import { MonthYearPickerUtils } from "../utils";
import { dateFormatYYYYMMDD, globalLimitRange } from "../../../consts/DateConst";
import { IDateLimitRange } from "../../../types/DateTypes";

const limitRange1970to1980: IDateLimitRange = {
    dateFrom: moment("19700101", dateFormatYYYYMMDD, true),
    dateTo: moment("19801231", dateFormatYYYYMMDD, true),
};

describe("MonthYearPickerUtils", () => {
    describe("getPickerValues", () => {
        it("returns empty values for empty string", () => {
            const result = MonthYearPickerUtils.getPickerValues("", dateFormatYYYYMMDD, globalLimitRange);

            expect(result).toEqual({ calendarDate: null, inputString: "" });
        });

        it("returns empty values for invalid date", () => {
            const result = MonthYearPickerUtils.getPickerValues("not-a-date", dateFormatYYYYMMDD, globalLimitRange);

            expect(result).toEqual({ calendarDate: null, inputString: "" });
        });

        it("returns empty values for date outside the limit range", () => {
            const result = MonthYearPickerUtils.getPickerValues("19690101", dateFormatYYYYMMDD, limitRange1970to1980);

            expect(result).toEqual({ calendarDate: null, inputString: "" });
        });

        it("returns formatted input string and calendar date for a valid date", () => {
            const result = MonthYearPickerUtils.getPickerValues("19700101", dateFormatYYYYMMDD, globalLimitRange);

            expect(result.inputString).toBe("Jan 1970");
            expect(moment.isMoment(result.calendarDate)).toBe(true);
            expect((result.calendarDate as moment.Moment).format(dateFormatYYYYMMDD)).toBe("19700101");
        });

        it("formats input string according to inputMonthYearFormat ignoring the parse format", () => {
            const result = MonthYearPickerUtils.getPickerValues("01/1970", "MM/YYYY", globalLimitRange);

            expect(result.inputString).toBe("Jan 1970");
        });
    });

    describe("getCalendarDate", () => {
        it("returns null for an invalid date", () => {
            expect(MonthYearPickerUtils.getCalendarDate("19701350", dateFormatYYYYMMDD, globalLimitRange)).toBeNull();
        });

        it("returns null for a date before the range", () => {
            expect(
                MonthYearPickerUtils.getCalendarDate("19691231", dateFormatYYYYMMDD, limitRange1970to1980),
            ).toBeNull();
        });

        it("returns null for a date after the range", () => {
            expect(
                MonthYearPickerUtils.getCalendarDate("19810101", dateFormatYYYYMMDD, limitRange1970to1980),
            ).toBeNull();
        });

        it("returns a moment for a valid in-range date", () => {
            const date = MonthYearPickerUtils.getCalendarDate("19750601", dateFormatYYYYMMDD, limitRange1970to1980);

            expect(moment.isMoment(date)).toBe(true);
            expect((date as moment.Moment).format(dateFormatYYYYMMDD)).toBe("19750601");
        });

        it("parses non-default formats", () => {
            const date = MonthYearPickerUtils.getCalendarDate("1970.01", "YYYY.MM", globalLimitRange);

            expect(moment.isMoment(date)).toBe(true);
            expect((date as moment.Moment).format("YYYY.MM")).toBe("1970.01");
        });
    });

    describe("isAvailableDate", () => {
        it("returns true for a date inside the range", () => {
            const date = moment("19750601", dateFormatYYYYMMDD, true);

            expect(MonthYearPickerUtils.isAvailableDate(date, "19750601", limitRange1970to1980)).toBe(true);
        });

        it("returns true for a date on the range boundaries", () => {
            const dateFrom = moment("19700101", dateFormatYYYYMMDD, true);
            const dateTo = moment("19801231", dateFormatYYYYMMDD, true);

            expect(MonthYearPickerUtils.isAvailableDate(dateFrom, "19700101", limitRange1970to1980)).toBe(true);
            expect(MonthYearPickerUtils.isAvailableDate(dateTo, "19801231", limitRange1970to1980)).toBe(true);
        });

        it("returns false for a date before the range", () => {
            const date = moment("19691231", dateFormatYYYYMMDD, true);

            expect(MonthYearPickerUtils.isAvailableDate(date, "19691231", limitRange1970to1980)).toBe(false);
        });

        it("returns false for a date after the range", () => {
            const date = moment("19810101", dateFormatYYYYMMDD, true);

            expect(MonthYearPickerUtils.isAvailableDate(date, "19810101", limitRange1970to1980)).toBe(false);
        });
    });
});
