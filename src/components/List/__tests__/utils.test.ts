import { describe, it, expect } from "vitest";
import { isDraggableTarget } from "../utils";

describe("isDraggableTarget", () => {
    it("returns true for null target", () => {
        expect(isDraggableTarget(null)).toBe(true);
    });

    it("returns true for non-HTMLElement target", () => {
        expect(isDraggableTarget({} as EventTarget)).toBe(true);
    });

    it("returns true for element without data-draggable attribute", () => {
        expect(isDraggableTarget(document.createElement("div"))).toBe(true);
    });

    it('returns false for element with data-draggable="false"', () => {
        const el = document.createElement("div");
        el.dataset.draggable = "false";
        expect(isDraggableTarget(el)).toBe(false);
    });

    it('returns false when an ancestor has data-draggable="false"', () => {
        const parent = document.createElement("div");
        parent.dataset.draggable = "false";
        const child = document.createElement("button");
        parent.appendChild(child);
        expect(isDraggableTarget(child)).toBe(false);
    });

    it('returns true for element with data-draggable="true" (only "false" disables drag)', () => {
        const el = document.createElement("div");
        el.dataset.draggable = "true";
        expect(isDraggableTarget(el)).toBe(true);
    });
});
