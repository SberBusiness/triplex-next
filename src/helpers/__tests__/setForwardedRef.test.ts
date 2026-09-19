import React from "react";
import { setForwardedRef } from "../setForwardedRef";

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

    it("accepts a React.ForwardedRef object ref", () => {
        const element = document.createElement("div");
        const forwardedRef: React.ForwardedRef<HTMLDivElement> = { current: null };

        setForwardedRef(forwardedRef, element);

        expect(forwardedRef.current).toBe(element);
    });
});
