import { describe, it, expect, vi } from "vitest";
import { SliderExtendedDotActions } from "../components/SliderExtendedDot/SliderExtendedDotActions";
import { ISliderExtendedDot, ISliderExtendedStep } from "../SliderExtendedContext";

const createDot = (id: string, value: number, stepIndex: number): ISliderExtendedDot => ({
    changeValue: vi.fn(),
    id,
    normalizedValue: value,
    stepIndex,
    value,
});

const steps: ISliderExtendedStep[] = [0, 25, 50, 75, 100].map((value) => ({ normalizedValue: value, value }));

describe("SliderExtendedDotActions", () => {
    describe("moveToNextStep", () => {
        it("moves dot to the next step value", () => {
            const dot = createDot("1", 50, 2);

            SliderExtendedDotActions.moveToNextStep(dot, steps);

            expect(dot.changeValue).toHaveBeenCalledWith(75);
        });

        it("does nothing on the last step", () => {
            const dot = createDot("1", 100, 4);

            SliderExtendedDotActions.moveToNextStep(dot, steps);

            expect(dot.changeValue).not.toHaveBeenCalled();
        });

        it("does nothing when dot is not found", () => {
            expect(() => SliderExtendedDotActions.moveToNextStep(undefined, steps)).not.toThrow();
        });
    });

    describe("moveToPrevStep", () => {
        it("moves dot to the previous step value", () => {
            const dot = createDot("1", 50, 2);

            SliderExtendedDotActions.moveToPrevStep(dot, steps);

            expect(dot.changeValue).toHaveBeenCalledWith(25);
        });

        it("does nothing on the first step", () => {
            const dot = createDot("1", 0, 0);

            SliderExtendedDotActions.moveToPrevStep(dot, steps);

            expect(dot.changeValue).not.toHaveBeenCalled();
        });

        it("does nothing when dot is not found", () => {
            expect(() => SliderExtendedDotActions.moveToPrevStep(undefined, steps)).not.toThrow();
        });
    });

    describe("getTabIndex", () => {
        const lowerDot = createDot("lower", 20, 1);
        const higherDot = createDot("higher", 80, 3);
        const dots = [higherDot, lowerDot];

        it("returns 0 for the only dot", () => {
            expect(
                SliderExtendedDotActions.getTabIndex({
                    disabled: false,
                    dotId: "lower",
                    dots: [lowerDot],
                    focusedSlider: false,
                }),
            ).toBe(0);
        });

        it("returns 0 before any dot is registered", () => {
            expect(
                SliderExtendedDotActions.getTabIndex({
                    disabled: false,
                    dotId: "lower",
                    dots: [],
                    focusedSlider: false,
                }),
            ).toBe(0);
        });

        it("keeps only the dot with lower value tabbable while slider is not focused", () => {
            expect(
                SliderExtendedDotActions.getTabIndex({ disabled: false, dotId: "lower", dots, focusedSlider: false }),
            ).toBe(0);
            expect(
                SliderExtendedDotActions.getTabIndex({ disabled: false, dotId: "higher", dots, focusedSlider: false }),
            ).toBe(-1);
        });

        it("orders both dots around the track when slider is focused", () => {
            expect(
                SliderExtendedDotActions.getTabIndex({ disabled: false, dotId: "lower", dots, focusedSlider: true }),
            ).toBe(1);
            expect(
                SliderExtendedDotActions.getTabIndex({ disabled: false, dotId: "higher", dots, focusedSlider: true }),
            ).toBe(3);
        });

        it("returns -1 for disabled slider", () => {
            expect(
                SliderExtendedDotActions.getTabIndex({ disabled: true, dotId: "lower", dots, focusedSlider: true }),
            ).toBe(-1);
        });
    });
});
