import { describe, it, expect } from "vitest";
import { resolveViewportPadding } from "../utils";
import { TCarouselViewportPadding } from "../types";

describe("resolveViewportPadding utility", () => {
    it("should handle undefined padding correctly", () => {
        const result = resolveViewportPadding(undefined);
        expect(result.metrics).toEqual({ top: 0, right: 0, bottom: 0, left: 0 });
        expect(result.style).toBe("0px");
    });

    it("should handle single valid number padding", () => {
        const result = resolveViewportPadding(16);
        expect(result.metrics).toEqual({ top: 16, right: 16, bottom: 16, left: 16 });
        expect(result.style).toBe("16px");
    });

    it("should handle 2-element tuple padding (vertical, horizontal)", () => {
        const result = resolveViewportPadding([10, 20]);
        expect(result.metrics).toEqual({ top: 10, right: 20, bottom: 10, left: 20 });
        expect(result.style).toBe("10px 20px");
    });

    it("should handle 3-element tuple padding (top, horizontal, bottom)", () => {
        const result = resolveViewportPadding([10, 20, 30]);
        expect(result.metrics).toEqual({ top: 10, right: 20, bottom: 30, left: 20 });
        expect(result.style).toBe("10px 20px 30px");
    });

    it("should handle 4-element tuple padding (top, right, bottom, left)", () => {
        const result = resolveViewportPadding([10, 20, 30, 40]);
        expect(result.metrics).toEqual({ top: 10, right: 20, bottom: 30, left: 40 });
        expect(result.style).toBe("10px 20px 30px 40px");
    });

    it("should fallback to 0 for invalid numbers like NaN, Infinity, or negative values", () => {
        const resultNum = resolveViewportPadding(-10);
        expect(resultNum.metrics).toEqual({ top: 0, right: 0, bottom: 0, left: 0 });
        expect(resultNum.style).toBe("0px");

        const resultArr = resolveViewportPadding([Number.NaN, Number.POSITIVE_INFINITY, -5, 25]);
        expect(resultArr.metrics).toEqual({ top: 0, right: 0, bottom: 0, left: 25 });
        expect(resultArr.style).toBe("0px 0px 0px 25px");
    });

    it("should fallback to 0 for arrays with an unsupported length", () => {
        const result = resolveViewportPadding([10] as unknown as TCarouselViewportPadding);
        expect(result.metrics).toEqual({ top: 0, right: 0, bottom: 0, left: 0 });
        expect(result.style).toBe("0px");
    });
});
