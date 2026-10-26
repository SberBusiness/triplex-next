import { describe, it, expect } from "vitest";
import { ESmartSpotAnimation } from "../enums";
import { getSmartSpotDuration, getSmartSpotFrame } from "../utils";

describe("getSmartSpotDuration", () => {
    it("returns preset duration when duration is not passed", () => {
        expect(getSmartSpotDuration(ESmartSpotAnimation.DRIFT)).toBe(6000);
        expect(getSmartSpotDuration(ESmartSpotAnimation.BREATHING)).toBe(6000);
    });

    it("returns passed duration, including 0", () => {
        expect(getSmartSpotDuration(ESmartSpotAnimation.DRIFT, 3000)).toBe(3000);
        expect(getSmartSpotDuration(ESmartSpotAnimation.BREATHING, 0)).toBe(0);
    });

    it("returns 0 for none regardless of passed duration", () => {
        expect(getSmartSpotDuration(ESmartSpotAnimation.NONE)).toBe(0);
        expect(getSmartSpotDuration(ESmartSpotAnimation.NONE, 5000)).toBe(0);
    });
});

describe("getSmartSpotFrame", () => {
    describe("drift", () => {
        it("starts at (0, +25) with scale 1", () => {
            const frame = getSmartSpotFrame(ESmartSpotAnimation.DRIFT, 0);

            expect(frame.x).toBeCloseTo(0);
            expect(frame.y).toBeCloseTo(25);
            expect(frame.scale).toBe(1);
        });

        it("moves counterclockwise on screen along the ellipse", () => {
            // Четверть цикла — правая точка эллипса, половина — верхняя, три четверти — левая.
            const quarter = getSmartSpotFrame(ESmartSpotAnimation.DRIFT, 1500);
            const half = getSmartSpotFrame(ESmartSpotAnimation.DRIFT, 3000);
            const threeQuarters = getSmartSpotFrame(ESmartSpotAnimation.DRIFT, 4500);

            expect(quarter.x).toBeCloseTo(50);
            expect(quarter.y).toBeCloseTo(0);
            expect(half.x).toBeCloseTo(0);
            expect(half.y).toBeCloseTo(-25);
            expect(threeQuarters.x).toBeCloseTo(-50);
            expect(threeQuarters.y).toBeCloseTo(0);
        });

        it("repeats with the cycle period", () => {
            const start = getSmartSpotFrame(ESmartSpotAnimation.DRIFT, 1000);
            const nextCycle = getSmartSpotFrame(ESmartSpotAnimation.DRIFT, 7000);

            expect(nextCycle.x).toBeCloseTo(start.x);
            expect(nextCycle.y).toBeCloseTo(start.y);
        });

        it("overrides distance and duration, keeping ellipse proportions", () => {
            const motion = { distance: 20, duration: 2000 };

            expect(getSmartSpotFrame(ESmartSpotAnimation.DRIFT, 0, motion).y).toBeCloseTo(10);
            expect(getSmartSpotFrame(ESmartSpotAnimation.DRIFT, 500, motion).x).toBeCloseTo(20);
        });

        it("stays at the start point when duration is 0", () => {
            const frame = getSmartSpotFrame(ESmartSpotAnimation.DRIFT, 1234, { duration: 0 });

            expect(frame.x).toBeCloseTo(0);
            expect(frame.y).toBeCloseTo(25);
        });
    });

    describe("breathing", () => {
        it("scales 0.9 → 1.1 → 0.9 over one cycle without moving", () => {
            const animation = ESmartSpotAnimation.BREATHING;

            expect(getSmartSpotFrame(animation, 0)).toEqual({ x: 0, y: 0, scale: 0.9 });
            expect(getSmartSpotFrame(animation, 1500).scale).toBeCloseTo(1);
            expect(getSmartSpotFrame(animation, 3000).scale).toBeCloseTo(1.1);
            expect(getSmartSpotFrame(animation, 4500).scale).toBeCloseTo(1);
            expect(getSmartSpotFrame(animation, 6000).scale).toBeCloseTo(0.9);
        });

        it("overrides duration and ignores distance", () => {
            const frame = getSmartSpotFrame(ESmartSpotAnimation.BREATHING, 1000, { distance: 100, duration: 2000 });

            expect(frame.x).toBe(0);
            expect(frame.y).toBe(0);
            expect(frame.scale).toBeCloseTo(1.1);
        });
    });

    it("returns a static frame for none", () => {
        expect(getSmartSpotFrame(ESmartSpotAnimation.NONE, 1234, { distance: 100, duration: 1000 })).toEqual({
            x: 0,
            y: 0,
            scale: 1,
        });
    });
});
