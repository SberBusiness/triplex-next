import { describe, it, expect } from "vitest";
import { mockElementSize } from "../../../../test-utils/dom";
import {
    ESwipeDirection,
    getElementWidth,
    getSwipeableAreaOpacity,
    resolveSwipeEnd,
    resolveSwipeMove,
    SWIPE_MIN_DISTANCE,
} from "../utils";

describe("SwipeableArea utils", () => {
    describe("getElementWidth", () => {
        it("returns 0 when element is missing", () => {
            expect(getElementWidth(null)).toBe(0);
        });

        it("returns width from getBoundingClientRect", () => {
            const element = document.createElement("div");

            mockElementSize(element, { width: 120 });

            expect(getElementWidth(element)).toBe(120);
        });
    });

    describe("resolveSwipeMove", () => {
        const params = {
            translateX: 0,
            translateXOnStart: 0,
            deltaX: 0,
            leftAreaWidth: 80,
            rightAreaWidth: 100,
        };

        it("moves content right and clamps it to the left area width", () => {
            expect(resolveSwipeMove({ ...params, deltaX: 30 })).toBe(30);
            expect(resolveSwipeMove({ ...params, deltaX: 200 })).toBe(80);
        });

        it("moves content left and clamps it to the right area width", () => {
            expect(resolveSwipeMove({ ...params, deltaX: -30 })).toBe(-30);
            expect(resolveSwipeMove({ ...params, deltaX: -200 })).toBe(-100);
        });

        it("keeps current coordinate when there is no area in the swipe direction", () => {
            expect(resolveSwipeMove({ ...params, translateX: 15, deltaX: 30, leftAreaWidth: null })).toBe(15);
            expect(resolveSwipeMove({ ...params, translateX: -15, deltaX: -30, rightAreaWidth: null })).toBe(-15);
        });

        it("closes the opened left area and does not move it further right", () => {
            expect(resolveSwipeMove({ ...params, translateX: 80, translateXOnStart: 80, deltaX: -30 })).toBe(50);
            // Контент не уходит правее исходного положения открытой области.
            expect(resolveSwipeMove({ ...params, translateX: 80, translateXOnStart: 80, deltaX: -200 })).toBe(0);
            expect(resolveSwipeMove({ ...params, translateX: 80, translateXOnStart: 80, deltaX: 30 })).toBe(80);
        });

        it("closes the opened right area and does not move it further left", () => {
            expect(resolveSwipeMove({ ...params, translateX: -100, translateXOnStart: -100, deltaX: 30 })).toBe(-70);
            expect(resolveSwipeMove({ ...params, translateX: -100, translateXOnStart: -100, deltaX: 200 })).toBe(0);
            expect(resolveSwipeMove({ ...params, translateX: -100, translateXOnStart: -100, deltaX: -30 })).toBe(-100);
        });
    });

    describe("resolveSwipeEnd", () => {
        const params = {
            translateX: 0,
            translateXOnStart: 0,
            leftAreaWidth: 80,
            rightAreaWidth: 100,
        };

        it("opens the right area when swipe left is longer than the threshold", () => {
            expect(resolveSwipeEnd({ ...params, translateX: -(SWIPE_MIN_DISTANCE + 1) })).toEqual({
                translateX: -100,
                direction: ESwipeDirection.LEFT,
            });
        });

        it("opens the left area when swipe right is longer than the threshold", () => {
            expect(resolveSwipeEnd({ ...params, translateX: SWIPE_MIN_DISTANCE + 1 })).toEqual({
                translateX: 80,
                direction: ESwipeDirection.RIGHT,
            });
        });

        it("returns content back when swipe is not longer than the threshold", () => {
            expect(resolveSwipeEnd({ ...params, translateX: -SWIPE_MIN_DISTANCE })).toEqual({
                translateX: 0,
                direction: null,
            });
            expect(resolveSwipeEnd({ ...params, translateX: SWIPE_MIN_DISTANCE })).toEqual({
                translateX: 0,
                direction: null,
            });
        });

        it("closes the opened left area without reporting a direction", () => {
            expect(
                resolveSwipeEnd({ ...params, translateXOnStart: 80, translateX: 80 - SWIPE_MIN_DISTANCE - 1 }),
            ).toEqual({
                translateX: 0,
                direction: null,
            });
            // Свайп короче порога — область остаётся открытой.
            expect(resolveSwipeEnd({ ...params, translateXOnStart: 80, translateX: 80 - SWIPE_MIN_DISTANCE })).toEqual({
                translateX: 80,
                direction: null,
            });
        });

        it("closes the opened right area without reporting a direction", () => {
            expect(
                resolveSwipeEnd({ ...params, translateXOnStart: -100, translateX: -100 + SWIPE_MIN_DISTANCE + 1 }),
            ).toEqual({ translateX: 0, direction: null });
            expect(
                resolveSwipeEnd({ ...params, translateXOnStart: -100, translateX: -100 + SWIPE_MIN_DISTANCE }),
            ).toEqual({ translateX: -100, direction: null });
        });

        it("keeps current coordinate when the opened area is dragged away from the closing direction", () => {
            expect(resolveSwipeEnd({ ...params, translateXOnStart: 80, translateX: 90 })).toEqual({
                translateX: 90,
                direction: null,
            });
            expect(resolveSwipeEnd({ ...params, translateXOnStart: -100, translateX: -120 })).toEqual({
                translateX: -120,
                direction: null,
            });
        });
    });

    describe("getSwipeableAreaOpacity", () => {
        it("returns the ratio of the open part of the area", () => {
            expect(getSwipeableAreaOpacity(0, 80)).toBe(0);
            expect(getSwipeableAreaOpacity(40, 80)).toBe(0.5);
            // Свайп влево — координата отрицательная, прозрачность считается по модулю.
            expect(getSwipeableAreaOpacity(-80, 80)).toBe(1);
        });

        it("returns 1 instead of NaN when the area width is zero", () => {
            expect(getSwipeableAreaOpacity(0, 0)).toBe(1);
            expect(getSwipeableAreaOpacity(40, 0)).toBe(1);
        });
    });
});
