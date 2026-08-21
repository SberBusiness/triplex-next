import React from "react";
import { describe, it, expect, vi } from "vitest";
import { setForwardedRef } from "../utils";

describe("setForwardedRef", () => {
    it("calls callback ref with the instance", () => {
        const element = document.createElement("div");
        const callbackRef = vi.fn();

        setForwardedRef<HTMLDivElement>(callbackRef, element);

        expect(callbackRef).toHaveBeenCalledWith(element);
    });

    it("calls callback ref with null", () => {
        const callbackRef = vi.fn();

        setForwardedRef<HTMLDivElement>(callbackRef, null);

        expect(callbackRef).toHaveBeenCalledWith(null);
    });

    it("writes the instance into object ref", () => {
        const element = document.createElement("div");
        const ref = React.createRef<HTMLDivElement>();

        setForwardedRef(ref, element);

        expect(ref.current).toBe(element);
    });

    it("does nothing when ref is not provided", () => {
        expect(() => setForwardedRef<HTMLDivElement>(null, document.createElement("div"))).not.toThrow();
    });
});
