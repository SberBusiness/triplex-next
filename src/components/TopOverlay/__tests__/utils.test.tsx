import { describe, it, expect, vi, afterEach } from "vitest";
import { getLightBoxScreenTop, getNextTopPosition } from "../utils";

const mockComputedStyleValue = (value: string) => {
    vi.spyOn(window, "getComputedStyle").mockReturnValue({
        getPropertyValue: () => value,
    } as unknown as CSSStyleDeclaration);
};

describe("TopOverlay utils", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("getLightBoxScreenTop", () => {
        it("should return numeric value of --lightBox-screen-top", () => {
            mockComputedStyleValue("56px");

            expect(getLightBoxScreenTop(document.createElement("div"))).toBe(56);
        });

        it("should return 0 when CSS variable is not set", () => {
            mockComputedStyleValue("");

            expect(getLightBoxScreenTop(document.createElement("div"))).toBe(0);
        });
    });

    describe("getNextTopPosition", () => {
        it("should shift wrapper down when it is rendered above the LightBox screen", () => {
            // Обёртка на 20px выше вьюпорта, экран LightBox начинается на 0 — смещаем вниз на 20px.
            expect(getNextTopPosition(0, -20, 0)).toBe(20);
        });

        it("should shift wrapper up when it is rendered below the LightBox screen", () => {
            // Обёртка на 30px ниже вьюпорта, экран LightBox начинается на 0 — поднимаем на 30px.
            expect(getNextTopPosition(0, 30, 0)).toBe(-30);
        });

        it("should keep current position when wrapper already matches the LightBox screen top", () => {
            expect(getNextTopPosition(12, 40, 40)).toBe(12);
        });

        it("should accumulate correction on top of the current position", () => {
            expect(getNextTopPosition(10, -20, 40)).toBe(70);
        });

        it("should truncate the accumulated position before recalculating", () => {
            // Прежняя реализация усекала накопленное значение через parseInt — поведение сохранено.
            expect(getNextTopPosition(10.7, -20, 40)).toBe(70);
        });
    });
});
