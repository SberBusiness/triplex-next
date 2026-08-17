import { describe, it, expect, vi } from "vitest";
import { SliderExtendedMarkActions } from "../components/SliderExtendedMarks/SliderExtendedMarkActions";
import { ISliderExtendedDot } from "../SliderExtendedContext";

const createDot = (id: string, value: number): ISliderExtendedDot => ({
    changeValue: vi.fn(),
    id,
    normalizedValue: value,
    stepIndex: 0,
    value,
});

describe("SliderExtendedMarkActions", () => {
    describe("getStyle", () => {
        it("positions mark by left offset", () => {
            expect(SliderExtendedMarkActions.getStyle({ min: 0, max: 200, reverse: false, value: 50 })).toEqual({
                left: "25%",
                right: undefined,
            });
        });

        it("pins the last mark to the rail end", () => {
            expect(SliderExtendedMarkActions.getStyle({ min: 0, max: 100, reverse: false, value: 100 })).toEqual({
                left: undefined,
                right: 0,
            });
        });

        it("mirrors left offset in reverse slider", () => {
            expect(SliderExtendedMarkActions.getStyle({ min: 0, max: 100, reverse: true, value: 25 })).toEqual({
                left: "75%",
                right: undefined,
            });
        });

        it("pins the min mark to the rail end in reverse slider", () => {
            expect(SliderExtendedMarkActions.getStyle({ min: 0, max: 100, reverse: true, value: 0 })).toEqual({
                left: undefined,
                right: 0,
            });
        });
    });

    describe("isActive", () => {
        it("returns true when one of the dots stands on the mark", () => {
            const dots = [createDot("1", 20), createDot("2", 80)];

            expect(SliderExtendedMarkActions.isActive({ dots, value: 80 })).toBe(true);
            expect(SliderExtendedMarkActions.isActive({ dots, value: 50 })).toBe(false);
        });
    });

    describe("isInSelectedRange", () => {
        it("uses range from min to the only dot value", () => {
            const dots = [createDot("1", 50)];

            expect(SliderExtendedMarkActions.isInSelectedRange({ dots, min: 10, value: 10 })).toBe(true);
            expect(SliderExtendedMarkActions.isInSelectedRange({ dots, min: 10, value: 50 })).toBe(true);
            expect(SliderExtendedMarkActions.isInSelectedRange({ dots, min: 10, value: 51 })).toBe(false);
            expect(SliderExtendedMarkActions.isInSelectedRange({ dots, min: 10, value: 5 })).toBe(false);
        });

        it("uses range between two dots regardless of their order", () => {
            const dots = [createDot("1", 80), createDot("2", 20)];

            expect(SliderExtendedMarkActions.isInSelectedRange({ dots, min: 0, value: 50 })).toBe(true);
            expect(SliderExtendedMarkActions.isInSelectedRange({ dots, min: 0, value: 10 })).toBe(false);
            expect(SliderExtendedMarkActions.isInSelectedRange({ dots, min: 0, value: 90 })).toBe(false);
        });

        it("returns false when there are no dots", () => {
            expect(SliderExtendedMarkActions.isInSelectedRange({ dots: [], min: 0, value: 50 })).toBe(false);
        });
    });

    describe("moveNearestDot", () => {
        it("moves the closest dot to the mark value", () => {
            const dots = [createDot("1", 20), createDot("2", 80)];

            SliderExtendedMarkActions.moveNearestDot({ dots, value: 70 });

            expect(dots[1].changeValue).toHaveBeenCalledWith(70);
            expect(dots[0].changeValue).not.toHaveBeenCalled();
        });

        it("does nothing when there are no dots", () => {
            expect(() => SliderExtendedMarkActions.moveNearestDot({ dots: [], value: 70 })).not.toThrow();
        });
    });
});
