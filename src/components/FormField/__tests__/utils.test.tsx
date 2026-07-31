import React from "react";
import { isFilled, setForwardedRef } from "../components/utils";

describe("isFilled", () => {
    it("returns false for undefined", () => {
        expect(isFilled(undefined)).toBe(false);
    });

    it("returns false for an empty string", () => {
        expect(isFilled("")).toBe(false);
    });

    it("returns true for a non-empty string", () => {
        expect(isFilled("value")).toBe(true);
    });

    it("returns true for a whitespace string", () => {
        expect(isFilled(" ")).toBe(true);
    });

    it("returns true for any number, including zero", () => {
        expect(isFilled(0)).toBe(true);
        expect(isFilled(42)).toBe(true);
    });

    it("returns false for an empty array of strings", () => {
        expect(isFilled([])).toBe(false);
    });

    it("returns true for a non-empty array of strings", () => {
        expect(isFilled(["a"])).toBe(true);
    });
});

describe("setForwardedRef", () => {
    it("calls a callback ref with the instance", () => {
        const element = document.createElement("span");
        const callbackRef = vi.fn();

        setForwardedRef<HTMLSpanElement>(callbackRef, element);

        expect(callbackRef).toHaveBeenCalledWith(element);
    });

    it("calls a callback ref with null", () => {
        const callbackRef = vi.fn();

        setForwardedRef<HTMLSpanElement>(callbackRef, null);

        expect(callbackRef).toHaveBeenCalledWith(null);
    });

    it("writes the instance into an object ref", () => {
        const element = document.createElement("span");
        const objectRef = React.createRef<HTMLSpanElement>();

        setForwardedRef(objectRef, element);

        expect(objectRef.current).toBe(element);
    });

    it("clears an object ref on unmount", () => {
        const element = document.createElement("span");
        const objectRef = React.createRef<HTMLSpanElement>();

        setForwardedRef(objectRef, element);
        setForwardedRef(objectRef, null);

        expect(objectRef.current).toBeNull();
    });

    it("does nothing when ref is null or undefined", () => {
        const element = document.createElement("span");

        expect(() => setForwardedRef<HTMLSpanElement>(null, element)).not.toThrow();
        expect(() => setForwardedRef<HTMLSpanElement>(undefined, element)).not.toThrow();
    });
});
