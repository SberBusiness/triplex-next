import React from "react";
import { describe, expect, test, vi } from "vitest";
import { setForwardedRef } from "@sberbusiness/triplex-next/components/Chip/ChipSuggest/utils";

describe("ChipSuggest utils", () => {
    describe("setForwardedRef", () => {
        test("calls callback ref with the instance", () => {
            const ref = vi.fn();
            const instance = document.createElement("div");

            setForwardedRef(ref, instance);

            expect(ref).toHaveBeenCalledWith(instance);
        });

        test("calls callback ref with null on unmount", () => {
            const ref = vi.fn();

            setForwardedRef(ref, null);

            expect(ref).toHaveBeenCalledWith(null);
        });

        test("writes the instance into an object ref", () => {
            const ref: React.MutableRefObject<HTMLDivElement | null> = { current: null };
            const instance = document.createElement("div");

            setForwardedRef(ref, instance);

            expect(ref.current).toBe(instance);
        });

        test("resets an object ref to null", () => {
            const ref: React.MutableRefObject<HTMLDivElement | null> = { current: document.createElement("div") };

            setForwardedRef(ref, null);

            expect(ref.current).toBeNull();
        });

        test("does nothing when ref is not passed", () => {
            const instance = document.createElement("div");

            expect(() => setForwardedRef(null, instance)).not.toThrow();
            expect(() =>
                setForwardedRef(undefined as unknown as React.ForwardedRef<HTMLDivElement>, instance),
            ).not.toThrow();
        });
    });
});
