import React from "react";
import { describe, it, expect } from "vitest";
import { ESegmentedControlType } from "@sberbusiness/triplex-next/components/SegmentedControl";
import { getSegmentTitle, isSegmentSelected } from "../utils";

describe("SegmentedControl utils", () => {
    describe("isSegmentSelected", () => {
        it("returns true for SINGLE when segment value equals control value", () => {
            expect(isSegmentSelected(ESegmentedControlType.SINGLE, "option1", "option1")).toBe(true);
        });

        it("returns false for SINGLE when segment value differs from control value", () => {
            expect(isSegmentSelected(ESegmentedControlType.SINGLE, "option2", "option1")).toBe(false);
        });

        it("returns false for SINGLE when control value is empty", () => {
            expect(isSegmentSelected(ESegmentedControlType.SINGLE, "option1", "")).toBe(false);
        });

        it("returns true for MULTIPLE when segment value is in control value", () => {
            expect(isSegmentSelected(ESegmentedControlType.MULTIPLE, "option2", ["option1", "option2"])).toBe(true);
        });

        it("returns false for MULTIPLE when segment value is not in control value", () => {
            expect(isSegmentSelected(ESegmentedControlType.MULTIPLE, "option3", ["option1", "option2"])).toBe(false);
        });

        it("returns false for MULTIPLE when control value is empty", () => {
            expect(isSegmentSelected(ESegmentedControlType.MULTIPLE, "option1", [])).toBe(false);
        });
    });

    describe("getSegmentTitle", () => {
        it("returns title when it is provided", () => {
            expect(getSegmentTitle("Custom title", "Option 1")).toBe("Custom title");
        });

        it("returns string children when title is not provided", () => {
            expect(getSegmentTitle(undefined, "Option 1")).toBe("Option 1");
        });

        it("falls back to string children when title is an empty string", () => {
            expect(getSegmentTitle("", "Option 1")).toBe("Option 1");
        });

        it("returns undefined when title is not provided and children are not a string", () => {
            expect(getSegmentTitle(undefined, <span>Option 1</span>)).toBeUndefined();
        });

        it("returns undefined when neither title nor children are provided", () => {
            expect(getSegmentTitle(undefined, undefined)).toBeUndefined();
        });
    });
});
