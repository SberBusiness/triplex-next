import React from "react";
import { describe, it, expect, vi } from "vitest";
import { setForwardedRef, isDraggableTarget } from "../utils";

describe("setForwardedRef", () => {
    it("invokes callback ref with instance", () => {
        const cb = vi.fn();
        const el = document.createElement("div");
        setForwardedRef<HTMLDivElement>(cb, el);
        expect(cb).toHaveBeenCalledWith(el);
    });

    it("invokes callback ref with null on cleanup", () => {
        const cb = vi.fn();
        setForwardedRef<HTMLDivElement>(cb, null);
        expect(cb).toHaveBeenCalledWith(null);
    });

    it("assigns instance to object ref", () => {
        const ref = React.createRef<HTMLDivElement>();
        const el = document.createElement("div");
        setForwardedRef(ref, el);
        expect(ref.current).toBe(el);
    });

    it("assigns null to object ref on cleanup", () => {
        const ref: React.MutableRefObject<HTMLDivElement | null> = {
            current: document.createElement("div"),
        };
        setForwardedRef(ref, null);
        expect(ref.current).toBeNull();
    });

    it("does nothing when ref is null", () => {
        expect(() => setForwardedRef<HTMLDivElement>(null, document.createElement("div"))).not.toThrow();
    });
});

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
