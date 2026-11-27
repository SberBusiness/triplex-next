import { describe, it, expect } from "vitest";
import { scrollListToItem, scrollListToTop } from "../desktop/utils";

/** Создаёт элемент с подменённым getBoundingClientRect. */
const createElementWithRect = (rect: Partial<DOMRect>, scrollTop = 0): HTMLElement => {
    const element = document.createElement("div");

    element.scrollTop = scrollTop;
    element.getBoundingClientRect = () => ({ top: 0, bottom: 0, ...rect }) as DOMRect;

    return element;
};

describe("Dropdown utils", () => {
    describe("scrollListToTop", () => {
        it("resets scrollTop", () => {
            const container = createElementWithRect({}, 120);

            scrollListToTop(container);

            expect(container.scrollTop).toBe(0);
        });

        it("does nothing when container is null", () => {
            expect(() => scrollListToTop(null)).not.toThrow();
        });
    });

    describe("scrollListToItem", () => {
        it("does nothing when container or item is missing", () => {
            const container = createElementWithRect({ top: 0, bottom: 100 }, 50);

            scrollListToItem(null, createElementWithRect({ top: 0, bottom: 20 }));
            scrollListToItem(container, null);

            expect(container.scrollTop).toBe(50);
        });

        it("does not scroll when the item is fully visible", () => {
            const container = createElementWithRect({ top: 0, bottom: 100 }, 30);
            const item = createElementWithRect({ top: 20, bottom: 40 });

            scrollListToItem(container, item);

            expect(container.scrollTop).toBe(30);
        });

        it("scrolls up when the item is above the visible area", () => {
            const container = createElementWithRect({ top: 100, bottom: 200 }, 60);
            const item = createElementWithRect({ top: 80, bottom: 100 });

            scrollListToItem(container, item);

            // 60 - 100 + 80 - 4 (SCROLL_OFFSET)
            expect(container.scrollTop).toBe(36);
        });

        it("scrolls down when the item is below the visible area", () => {
            const container = createElementWithRect({ top: 0, bottom: 100 }, 10);
            const item = createElementWithRect({ top: 100, bottom: 120 });

            scrollListToItem(container, item);

            // 10 + 120 - 100 + 4 (SCROLL_OFFSET)
            expect(container.scrollTop).toBe(34);
        });
    });
});
