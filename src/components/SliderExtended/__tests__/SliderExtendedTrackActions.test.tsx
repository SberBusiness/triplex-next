import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SliderExtendedTrackActions } from "../components/SliderExtendedTrack/SliderExtendedTrackActions";
import { ISliderExtendedDot, ISliderExtendedStep } from "../SliderExtendedContext";

const steps: ISliderExtendedStep[] = [0, 25, 50, 75, 100].map((value) => ({ normalizedValue: value, value }));

const createDot = (id: string, value: number, stepIndex: number): ISliderExtendedDot => ({
    changeValue: vi.fn(),
    id,
    normalizedValue: value,
    stepIndex,
    value,
});

/** Полоса шириной 100px, начинающаяся в нуле: позиция курсора в px совпадает с процентами. */
const createRailNode = (): HTMLDivElement => {
    const railNode = document.createElement("div");

    railNode.getBoundingClientRect = () => ({ left: 0 }) as DOMRect;
    Object.defineProperty(railNode, "offsetWidth", { value: 100, configurable: true });

    return railNode;
};

describe("SliderExtendedTrackActions", () => {
    describe("getTrackPosition", () => {
        it("stretches track from the rail start to the only dot", () => {
            const dots = [createDot("1", 30, 1)];

            expect(SliderExtendedTrackActions.getTrackPosition({ dots, reverse: false })).toEqual({
                left: 0,
                right: 70,
            });
        });

        it("stretches track from the rail end to the only dot in reverse slider", () => {
            const dots = [createDot("1", 30, 1)];

            expect(SliderExtendedTrackActions.getTrackPosition({ dots, reverse: true })).toEqual({
                left: 70,
                right: 0,
            });
        });

        it("places track between two dots", () => {
            const dots = [createDot("1", 25, 1), createDot("2", 75, 3)];

            expect(SliderExtendedTrackActions.getTrackPosition({ dots, reverse: false })).toEqual({
                left: 25,
                right: 25,
            });
        });

        it("places track between two dots regardless of their order", () => {
            const dots = [createDot("1", 75, 3), createDot("2", 25, 1)];

            expect(SliderExtendedTrackActions.getTrackPosition({ dots, reverse: false })).toEqual({
                left: 25,
                right: 25,
            });
        });

        it("mirrors position of two dots in reverse slider", () => {
            const dots = [createDot("1", 25, 1), createDot("2", 100, 4)];

            expect(SliderExtendedTrackActions.getTrackPosition({ dots, reverse: true })).toEqual({
                left: 0,
                right: 25,
            });
        });
    });

    describe("moveToNextStep", () => {
        it("moves every dot one step forward", () => {
            const dots = [createDot("1", 25, 1), createDot("2", 50, 2)];

            SliderExtendedTrackActions.moveToNextStep(dots, steps);

            expect(dots[0].changeValue).toHaveBeenCalledWith(50);
            expect(dots[1].changeValue).toHaveBeenCalledWith(75);
        });

        it("does nothing when one of the dots is on the last step", () => {
            const dots = [createDot("1", 75, 3), createDot("2", 100, 4)];

            SliderExtendedTrackActions.moveToNextStep(dots, steps);

            expect(dots[0].changeValue).not.toHaveBeenCalled();
            expect(dots[1].changeValue).not.toHaveBeenCalled();
        });
    });

    describe("moveToPrevStep", () => {
        it("moves every dot one step back", () => {
            const dots = [createDot("1", 25, 1), createDot("2", 50, 2)];

            SliderExtendedTrackActions.moveToPrevStep(dots, steps);

            expect(dots[0].changeValue).toHaveBeenCalledWith(0);
            expect(dots[1].changeValue).toHaveBeenCalledWith(25);
        });

        it("does nothing when one of the dots is on the first step", () => {
            const dots = [createDot("1", 0, 0), createDot("2", 25, 1)];

            SliderExtendedTrackActions.moveToPrevStep(dots, steps);

            expect(dots[0].changeValue).not.toHaveBeenCalled();
            expect(dots[1].changeValue).not.toHaveBeenCalled();
        });
    });

    describe("dragDots", () => {
        let cursorPrevNormalizedValue: React.MutableRefObject<number>;
        let railNode: HTMLDivElement;

        beforeEach(() => {
            cursorPrevNormalizedValue = { current: 25 };
            railNode = createRailNode();
        });

        it("moves both dots forward and remembers cursor position", () => {
            const dots = [createDot("1", 25, 1), createDot("2", 50, 2)];

            SliderExtendedTrackActions.dragDots({
                cursorPrevNormalizedValue,
                cursorXPosition: 50,
                dots,
                railNode,
                reverse: false,
                steps,
            });

            expect(dots[0].changeValue).toHaveBeenCalledWith(50);
            expect(dots[1].changeValue).toHaveBeenCalledWith(75);
            expect(cursorPrevNormalizedValue.current).toBe(50);
        });

        it("moves both dots back", () => {
            const dots = [createDot("1", 25, 1), createDot("2", 50, 2)];

            SliderExtendedTrackActions.dragDots({
                cursorPrevNormalizedValue,
                cursorXPosition: 0,
                dots,
                railNode,
                reverse: false,
                steps,
            });

            expect(dots[0].changeValue).toHaveBeenCalledWith(0);
            expect(dots[1].changeValue).toHaveBeenCalledWith(25);
        });

        it("inverts drag direction in reverse slider", () => {
            const dots = [createDot("1", 25, 1), createDot("2", 50, 2)];

            SliderExtendedTrackActions.dragDots({
                cursorPrevNormalizedValue,
                cursorXPosition: 50,
                dots,
                railNode,
                reverse: true,
                steps,
            });

            expect(dots[0].changeValue).toHaveBeenCalledWith(0);
            expect(dots[1].changeValue).toHaveBeenCalledWith(25);
        });

        it("keeps cursor position when the shift is shorter than one step", () => {
            const dots = [createDot("1", 25, 1), createDot("2", 50, 2)];

            SliderExtendedTrackActions.dragDots({
                cursorPrevNormalizedValue,
                cursorXPosition: 35,
                dots,
                railNode,
                reverse: false,
                steps,
            });

            expect(dots[0].changeValue).not.toHaveBeenCalled();
            expect(cursorPrevNormalizedValue.current).toBe(25);
        });

        it("does not move dots beyond the rail end", () => {
            const dots = [createDot("1", 75, 3), createDot("2", 100, 4)];

            SliderExtendedTrackActions.dragDots({
                cursorPrevNormalizedValue,
                cursorXPosition: 100,
                dots,
                railNode,
                reverse: false,
                steps,
            });

            expect(dots[0].changeValue).not.toHaveBeenCalled();
            expect(dots[1].changeValue).not.toHaveBeenCalled();
        });

        it("keeps the distance between dots when the drag overshoots the rail end", () => {
            const dots = [createDot("1", 25, 1), createDot("2", 50, 2)];

            SliderExtendedTrackActions.dragDots({
                cursorPrevNormalizedValue,
                cursorXPosition: 100,
                dots,
                railNode,
                reverse: false,
                steps,
            });

            expect(dots[0].changeValue).toHaveBeenCalledWith(75);
            expect(dots[1].changeValue).toHaveBeenCalledWith(100);
        });

        it("keeps the distance between dots when the drag overshoots the rail start", () => {
            cursorPrevNormalizedValue.current = 75;
            const dots = [createDot("1", 25, 1), createDot("2", 50, 2)];

            SliderExtendedTrackActions.dragDots({
                cursorPrevNormalizedValue,
                cursorXPosition: 0,
                dots,
                railNode,
                reverse: false,
                steps,
            });

            expect(dots[0].changeValue).toHaveBeenCalledWith(0);
            expect(dots[1].changeValue).toHaveBeenCalledWith(25);
        });

        it("does nothing without rail node", () => {
            const dots = [createDot("1", 25, 1), createDot("2", 50, 2)];

            SliderExtendedTrackActions.dragDots({
                cursorPrevNormalizedValue,
                cursorXPosition: 50,
                dots,
                railNode: null,
                reverse: false,
                steps,
            });

            expect(dots[0].changeValue).not.toHaveBeenCalled();
        });

        it("does nothing when the track is not limited by two dots", () => {
            const dots = [createDot("1", 25, 1)];

            expect(() =>
                SliderExtendedTrackActions.dragDots({
                    cursorPrevNormalizedValue,
                    cursorXPosition: 50,
                    dots,
                    railNode,
                    reverse: false,
                    steps,
                }),
            ).not.toThrow();
            expect(dots[0].changeValue).not.toHaveBeenCalled();
        });
    });
});
