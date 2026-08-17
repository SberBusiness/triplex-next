import { describe, it, expect, vi } from "vitest";
import { SliderExtendedUtils } from "../SliderExtendedUtils";
import { ISliderExtendedDot, ISliderExtendedStep } from "../SliderExtendedContext";

const createDot = (id: string, value: number, stepIndex = 0): ISliderExtendedDot => ({
    changeValue: vi.fn(),
    id,
    normalizedValue: value,
    stepIndex,
    value,
});

const createSteps = (values: number[]): ISliderExtendedStep[] =>
    values.map((value) => ({ normalizedValue: value, value }));

describe("SliderExtendedUtils", () => {
    describe("getNormalizedValue", () => {
        it("normalizes value inside range", () => {
            expect(SliderExtendedUtils.getNormalizedValue({ max: 200, min: 100, value: 150 })).toBe(50);
        });

        it("returns 0 for min and 100 for max", () => {
            expect(SliderExtendedUtils.getNormalizedValue({ max: 10, min: 5, value: 5 })).toBe(0);
            expect(SliderExtendedUtils.getNormalizedValue({ max: 10, min: 5, value: 10 })).toBe(100);
        });

        it("clamps values outside range", () => {
            expect(SliderExtendedUtils.getNormalizedValue({ max: 10, min: 0, value: -5 })).toBe(0);
            expect(SliderExtendedUtils.getNormalizedValue({ max: 10, min: 0, value: 50 })).toBe(100);
        });

        it("returns 0 for degenerate range instead of NaN", () => {
            expect(SliderExtendedUtils.getNormalizedValue({ max: 5, min: 5, value: 5 })).toBe(0);
        });
    });

    describe("getNormalizedCursorValue", () => {
        it("returns cursor position relative to rail width, in percent", () => {
            const railNode = document.createElement("div");

            railNode.getBoundingClientRect = () => ({ left: 100 }) as DOMRect;
            Object.defineProperty(railNode, "offsetWidth", { value: 200, configurable: true });

            expect(SliderExtendedUtils.getNormalizedCursorValue({ cursorXPosition: 150, railNode })).toBe(25);
        });
    });

    describe("getNearestStep", () => {
        it("returns the closest step", () => {
            const steps = createSteps([0, 25, 50, 75, 100]);

            expect(SliderExtendedUtils.getNearestStep({ normalizedValue: 60, steps })).toBe(steps[2]);
            expect(SliderExtendedUtils.getNearestStep({ normalizedValue: 99, steps })).toBe(steps[4]);
        });

        it("returns the first of equally distant steps", () => {
            const steps = createSteps([0, 100]);

            expect(SliderExtendedUtils.getNearestStep({ normalizedValue: 50, steps })).toBe(steps[0]);
        });

        it("returns the only step for a single-step slider", () => {
            const steps = createSteps([42]);

            expect(SliderExtendedUtils.getNearestStep({ normalizedValue: 0, steps })).toBe(steps[0]);
        });

        it("returns the edge step when the cursor is far outside the rail", () => {
            const steps = createSteps([0, 25, 50, 75, 100]);

            // getNormalizedCursorValue не зажимается по границам: курсор, ушедший больше чем
            // на ширину полосы за её край, даёт дельты до всех шагов больше 100.
            expect(SliderExtendedUtils.getNearestStep({ normalizedValue: 210, steps })).toBe(steps[4]);
            expect(SliderExtendedUtils.getNearestStep({ normalizedValue: -110, steps })).toBe(steps[0]);
        });
    });

    describe("getNearestDotByValue", () => {
        it("returns the closest dot", () => {
            const dots = [createDot("1", 10), createDot("2", 90)];

            expect(SliderExtendedUtils.getNearestDotByValue({ dots, value: 70 })).toBe(dots[1]);
        });

        it("returns the first of equally distant dots", () => {
            const dots = [createDot("1", 0), createDot("2", 100)];

            expect(SliderExtendedUtils.getNearestDotByValue({ dots, value: 50 })).toBe(dots[0]);
        });

        it("returns undefined when there are no dots", () => {
            expect(SliderExtendedUtils.getNearestDotByValue({ dots: [], value: 50 })).toBeUndefined();
        });
    });

    describe("getStepIndexByNormalizedValue", () => {
        it("returns index of the step with the same normalizedValue", () => {
            const steps = createSteps([0, 25, 50, 75, 100]);

            expect(SliderExtendedUtils.getStepIndexByNormalizedValue({ normalizedValue: 75, steps })).toBe(3);
        });

        it("returns 0 when there is no step with such normalizedValue", () => {
            const steps = createSteps([0, 50, 100]);

            expect(SliderExtendedUtils.getStepIndexByNormalizedValue({ normalizedValue: 33, steps })).toBe(0);
        });
    });
});
