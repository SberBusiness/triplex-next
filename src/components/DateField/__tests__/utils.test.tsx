import moment from "moment";
import { describe, it, expect } from "vitest";
import { DateFieldUtils } from "../utils";
import { dateFormatYYYYMMDD, globalLimitRange } from "../../../consts/DateConst";

/** Ограничитель, внутрь которого попадают все даты 1970 года. */
const limitRange1970 = {
    dateFrom: moment("19700101", dateFormatYYYYMMDD),
    dateTo: moment("19701231", dateFormatYYYYMMDD),
};

describe("DateFieldUtils", () => {
    describe("isAvailableDate", () => {
        it("returns true for a date inside limitRange and not in disabledDays", () => {
            const date = moment("19700615", dateFormatYYYYMMDD);

            expect(DateFieldUtils.isAvailableDate(date, "19700615", limitRange1970, undefined)).toBe(true);
        });

        it("returns false for a date before limitRange.dateFrom", () => {
            const date = moment("19691231", dateFormatYYYYMMDD);

            expect(DateFieldUtils.isAvailableDate(date, "19691231", limitRange1970, undefined)).toBe(false);
        });

        it("returns false for a date after limitRange.dateTo", () => {
            const date = moment("19710101", dateFormatYYYYMMDD);

            expect(DateFieldUtils.isAvailableDate(date, "19710101", limitRange1970, undefined)).toBe(false);
        });

        it("returns false for a date listed in disabledDays", () => {
            const date = moment("19700615", dateFormatYYYYMMDD);

            expect(DateFieldUtils.isAvailableDate(date, "19700615", limitRange1970, ["19700615"])).toBe(false);
        });

        it("returns true when disabledDays does not contain the date", () => {
            const date = moment("19700615", dateFormatYYYYMMDD);

            expect(DateFieldUtils.isAvailableDate(date, "19700615", limitRange1970, ["19700616"])).toBe(true);
        });
    });

    describe("getCalendarDate", () => {
        it("returns a moment for a valid available date", () => {
            const date = DateFieldUtils.getCalendarDate("19700615", dateFormatYYYYMMDD, globalLimitRange);

            expect(date).not.toBeNull();
            expect(date?.format(dateFormatYYYYMMDD)).toBe("19700615");
        });

        it("returns null for a string that does not match the format", () => {
            expect(DateFieldUtils.getCalendarDate("15.06.1970", dateFormatYYYYMMDD, globalLimitRange)).toBeNull();
        });

        it("returns null for a non-existent calendar date", () => {
            expect(DateFieldUtils.getCalendarDate("19700230", dateFormatYYYYMMDD, globalLimitRange)).toBeNull();
        });

        it("returns null for a date outside limitRange", () => {
            expect(DateFieldUtils.getCalendarDate("19800101", dateFormatYYYYMMDD, limitRange1970)).toBeNull();
        });

        it("returns null for a date listed in disabledDays", () => {
            expect(
                DateFieldUtils.getCalendarDate("19700615", dateFormatYYYYMMDD, globalLimitRange, ["19700615"]),
            ).toBeNull();
        });

        it("respects a custom format", () => {
            const date = DateFieldUtils.getCalendarDate("15/06/1970", "DD/MM/YYYY", globalLimitRange);

            expect(date?.format(dateFormatYYYYMMDD)).toBe("19700615");
        });
    });

    describe("getPickerValues", () => {
        it("returns empty values for an empty value", () => {
            expect(DateFieldUtils.getPickerValues("", dateFormatYYYYMMDD, globalLimitRange)).toEqual({
                calendarDate: null,
                inputString: "",
            });
        });

        it("returns the date and the input string in DD.MM.YYYY for a valid value", () => {
            const { calendarDate, inputString } = DateFieldUtils.getPickerValues(
                "19700615",
                dateFormatYYYYMMDD,
                globalLimitRange,
            );

            expect(inputString).toBe("15.06.1970");
            expect(calendarDate?.format(dateFormatYYYYMMDD)).toBe("19700615");
        });

        it("returns empty values for an unparsable value", () => {
            expect(DateFieldUtils.getPickerValues("not-a-date", dateFormatYYYYMMDD, globalLimitRange)).toEqual({
                calendarDate: null,
                inputString: "",
            });
        });

        it("returns empty values for a value outside limitRange", () => {
            expect(DateFieldUtils.getPickerValues("19800101", dateFormatYYYYMMDD, limitRange1970)).toEqual({
                calendarDate: null,
                inputString: "",
            });
        });

        it("returns empty values for a value listed in disabledDays", () => {
            expect(
                DateFieldUtils.getPickerValues("19700615", dateFormatYYYYMMDD, globalLimitRange, ["19700615"]),
            ).toEqual({ calendarDate: null, inputString: "" });
        });

        it("converts a value in a custom format into the DD.MM.YYYY input string", () => {
            const { inputString } = DateFieldUtils.getPickerValues("1970-06-15", "YYYY-MM-DD", globalLimitRange);

            expect(inputString).toBe("15.06.1970");
        });
    });
});
