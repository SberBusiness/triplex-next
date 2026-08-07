import { describe, it, expect } from "vitest";
import {
    axes,
    calcBounds,
    calcRelPos,
    centerOfBounds,
    centerOfBoundsFromBounds,
    centerOfSize,
    doesFitWithin,
    equalCoords,
    pickZone,
} from "../utils/Positioning";
import { ETooltipAlign, ETooltipAxesType, ETooltipFlowTypes, ETooltipPreferPlace, ETooltipTypeName } from "../enums";
import { ITooltipBounds, ITooltipDomainSize, ITooltipRelPosition } from "../types";

/** Границы окна 1000x800. */
const windowBounds: ITooltipBounds = { x: 0, x2: 1000, y: 0, y2: 800, w: 1000, h: 800 };

/** Целевой элемент 40x20 примерно в центре окна. */
const targetBounds: ITooltipBounds = { x: 480, x2: 520, y: 390, y2: 410, w: 40, h: 20 };

const makeZone = (zone: Partial<ITooltipDomainSize> = {}): ITooltipDomainSize => ({
    [ETooltipTypeName.FLOW]: ETooltipFlowTypes.COLUMN,
    [ETooltipTypeName.STANDING]: ETooltipPreferPlace.BELOW,
    [ETooltipTypeName.SIDE]: ETooltipAlign.END,
    order: 1,
    w: 1000,
    h: 400,
    ...zone,
});

describe("Tooltip Positioning", () => {
    describe("equalCoords", () => {
        it("should return true for identical bounds", () => {
            expect(equalCoords(windowBounds, { ...windowBounds })).toBe(true);
        });

        it.each(["x", "x2", "y", "y2", "w", "h"] as const)("should return false when %s differs", (field) => {
            expect(equalCoords(windowBounds, { ...windowBounds, [field]: 1 })).toBe(false);
        });
    });

    describe("calcBounds", () => {
        it("should build bounds from window size", () => {
            expect(calcBounds(window)).toEqual({
                x: 0,
                x2: window.innerWidth,
                y: 0,
                y2: window.innerHeight,
                w: window.innerWidth,
                h: window.innerHeight,
            });
        });

        it("should build bounds from element rect", () => {
            const element = document.createElement("div");

            element.getBoundingClientRect = () => ({ left: 10, right: 60, top: 20, bottom: 100 }) as unknown as DOMRect;

            expect(calcBounds(element)).toEqual({ x: 10, x2: 60, y: 20, y2: 100, w: 50, h: 80 });
        });
    });

    describe("axes", () => {
        it("should map column flow main axis to Y and cross axis to X", () => {
            expect(axes[ETooltipFlowTypes.COLUMN].main).toEqual({ start: "y", end: "y2", size: "h" });
            expect(axes[ETooltipFlowTypes.COLUMN].cross).toEqual({ start: "x", end: "x2", size: "w" });
        });

        it("should map row flow main axis to X and cross axis to Y", () => {
            expect(axes[ETooltipFlowTypes.ROW].main).toEqual({ start: "x", end: "x2", size: "w" });
            expect(axes[ETooltipFlowTypes.ROW].cross).toEqual({ start: "y", end: "y2", size: "h" });
        });
    });

    describe("centerOfSize / centerOfBounds / centerOfBoundsFromBounds", () => {
        it("should return half of the axis size", () => {
            expect(centerOfSize(ETooltipFlowTypes.COLUMN, ETooltipAxesType.MAIN, { w: 200, h: 100 })).toBe(50);
            expect(centerOfSize(ETooltipFlowTypes.COLUMN, ETooltipAxesType.CROSS, { w: 200, h: 100 })).toBe(100);
        });

        it("should return the middle of the bounds along the axis", () => {
            expect(centerOfBounds(ETooltipFlowTypes.COLUMN, ETooltipAxesType.CROSS, targetBounds)).toBe(500);
            expect(centerOfBounds(ETooltipFlowTypes.COLUMN, ETooltipAxesType.MAIN, targetBounds)).toBe(400);
        });

        it("should return distance from the bounds center to the position start", () => {
            const position = { x: 400, x2: 600, y: 0, y2: 0, crossLength: 200, mainLength: 0 };

            expect(
                centerOfBoundsFromBounds(ETooltipFlowTypes.COLUMN, ETooltipAxesType.CROSS, targetBounds, position),
            ).toBe(100);
        });
    });

    describe("doesFitWithin", () => {
        it("should return true when both dimensions fit", () => {
            expect(doesFitWithin(makeZone({ w: 200, h: 100 }), { w: 200, h: 100 })).toBe(true);
        });

        it("should return false when width does not fit", () => {
            expect(doesFitWithin(makeZone({ w: 100, h: 100 }), { w: 200, h: 100 })).toBe(false);
        });

        it("should return false when height does not fit", () => {
            expect(doesFitWithin(makeZone({ w: 200, h: 50 }), { w: 200, h: 100 })).toBe(false);
        });
    });

    describe("pickZone", () => {
        const tooltipSize = { w: 200, h: 60 };

        it("should return the preferred zone when the tooltip fits into it", () => {
            const zone = pickZone(ETooltipPreferPlace.BELOW, windowBounds, targetBounds, 8, 16, tooltipSize);

            expect(zone[ETooltipTypeName.STANDING]).toBe(ETooltipPreferPlace.BELOW);
            expect(zone[ETooltipTypeName.FLOW]).toBe(ETooltipFlowTypes.COLUMN);
            expect(zone.order).toBe(1);
        });

        it.each([
            ETooltipPreferPlace.ABOVE,
            ETooltipPreferPlace.BELOW,
            ETooltipPreferPlace.LEFT,
            ETooltipPreferPlace.RIGHT,
        ])("should honour preferPlace %s when there is enough space", (preferPlace) => {
            const zone = pickZone(preferPlace, windowBounds, targetBounds, 8, 16, tooltipSize);

            expect(zone[ETooltipTypeName.STANDING]).toBe(preferPlace);
        });

        it("should fall back to a fitting zone when the preferred one is too small", () => {
            // Целевой элемент прижат к верхней границе окна — сверху места нет.
            const topTarget: ITooltipBounds = { x: 480, x2: 520, y: 0, y2: 20, w: 40, h: 20 };
            const zone = pickZone(ETooltipPreferPlace.ABOVE, windowBounds, topTarget, 8, 16, tooltipSize);

            expect(zone[ETooltipTypeName.STANDING]).not.toBe(ETooltipPreferPlace.ABOVE);
        });

        it("should pick a zone without preferPlace", () => {
            const zone = pickZone(undefined, windowBounds, targetBounds, 8, 16, tooltipSize);

            expect(Object.values(ETooltipPreferPlace)).toContain(zone[ETooltipTypeName.STANDING]);
        });

        it("should return the least unsuitable zone when the tooltip fits nowhere", () => {
            const tinyWindow: ITooltipBounds = { x: 0, x2: 50, y: 0, y2: 50, w: 50, h: 50 };
            const tinyTarget: ITooltipBounds = { x: 20, x2: 30, y: 20, y2: 30, w: 10, h: 10 };
            const zone = pickZone(ETooltipPreferPlace.ABOVE, tinyWindow, tinyTarget, 8, 16, { w: 400, h: 400 });

            expect(zone[ETooltipTypeName.STANDING]).toBe(ETooltipPreferPlace.ABOVE);
        });
    });

    describe("calcRelPos", () => {
        it("should place the tooltip below the target and center it on the cross axis", () => {
            const zone = makeZone({
                [ETooltipTypeName.FLOW]: ETooltipFlowTypes.COLUMN,
                [ETooltipTypeName.SIDE]: ETooltipAlign.END,
            });
            const position: ITooltipRelPosition = calcRelPos(zone, targetBounds, { w: 200, h: 60 });

            // Главная ось — Y: END означает начало от нижней границы таргета.
            expect(position.y).toBe(targetBounds.y2);
            expect(position.y2).toBe(targetBounds.y2 + 60);
            expect(position.mainLength).toBe(60);

            // Вспомогательная ось — X: всегда по центру таргета.
            expect(position.x).toBe(400);
            expect(position.x2).toBe(600);
            expect(position.crossLength).toBe(200);
        });

        it("should place the tooltip above the target for the START side", () => {
            const zone = makeZone({
                [ETooltipTypeName.FLOW]: ETooltipFlowTypes.COLUMN,
                [ETooltipTypeName.SIDE]: ETooltipAlign.START,
                order: -1,
            });
            const position = calcRelPos(zone, targetBounds, { w: 200, h: 60 });

            expect(position.y).toBe(targetBounds.y - 60);
            expect(position.y2).toBe(targetBounds.y);
        });

        it("should swap axes for the row flow", () => {
            const zone = makeZone({
                [ETooltipTypeName.FLOW]: ETooltipFlowTypes.ROW,
                [ETooltipTypeName.SIDE]: ETooltipAlign.END,
            });
            const position = calcRelPos(zone, targetBounds, { w: 200, h: 60 });

            // Главная ось — X.
            expect(position.x).toBe(targetBounds.x2);
            expect(position.x2).toBe(targetBounds.x2 + 200);
            expect(position.mainLength).toBe(200);

            // Вспомогательная ось — Y, по центру таргета.
            expect(position.y).toBe(370);
            expect(position.y2).toBe(430);
            expect(position.crossLength).toBe(60);
        });
    });
});
