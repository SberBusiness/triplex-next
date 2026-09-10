import React from "react";
import {
    createPlaceholder,
    syncCoreAndGetFormattedValue,
    setFallbackCaret,
    setForwardedRef,
} from "@sberbusiness/triplex-next/components/AmountField/utils";
import { AmountBaseInputCore } from "@sberbusiness/triplex-next/components/AmountField/AmountBaseInputCore";

describe("AmountField utils", () => {
    describe("createPlaceholder", () => {
        test("returns integer placeholder when fractionDigits=0", () => {
            expect(createPlaceholder(0)).toBe("0");
        });

        test("returns decimal placeholder when fractionDigits>0", () => {
            expect(createPlaceholder(2)).toBe("0,00");
            expect(createPlaceholder(3)).toBe("0,000");
        });
    });

    describe("setForwardedRef", () => {
        test("calls callback ref with the instance and with null on unmount", () => {
            const ref = vi.fn();
            const instance = document.createElement("input");

            setForwardedRef<HTMLInputElement>(ref, instance);
            expect(ref).toHaveBeenCalledWith(instance);

            setForwardedRef<HTMLInputElement>(ref, null);
            expect(ref).toHaveBeenLastCalledWith(null);
        });

        test("writes the instance into an object ref", () => {
            const ref = React.createRef<HTMLInputElement>();
            const instance = document.createElement("input");

            setForwardedRef(ref, instance);
            expect(ref.current).toBe(instance);

            setForwardedRef(ref, null);
            expect(ref.current).toBeNull();
        });

        test("does nothing when ref is not passed", () => {
            const instance = document.createElement("input");

            expect(() => setForwardedRef(undefined, instance)).not.toThrow();
            expect(() => setForwardedRef(null, instance)).not.toThrow();
        });
    });

    describe("syncCoreAndGetFormattedValue", () => {
        test("formats the value and caches it for the fallback caret", () => {
            const core = new AmountBaseInputCore(16, 2);

            expect(syncCoreAndGetFormattedValue(core, "1234.56", 16, 2)).toBe("1 234,56");
            expect(core.cache.formattedValue).toBe("1 234,56");
        });

        test("does not recalculate when value and format settings are unchanged", () => {
            const core = new AmountBaseInputCore(16, 2);

            syncCoreAndGetFormattedValue(core, "1234.56", 16, 2);
            // Каретка, рассчитанная обработчиком ввода, не должна затираться повторным рендером.
            core.caret = 3;

            expect(syncCoreAndGetFormattedValue(core, "1234.56", 16, 2)).toBe("1 234,56");
            expect(core.caret).toBe(3);
        });

        test("recalculates when value changes", () => {
            const core = new AmountBaseInputCore(16, 2);

            syncCoreAndGetFormattedValue(core, "1234.56", 16, 2);

            expect(syncCoreAndGetFormattedValue(core, "7.00", 16, 2)).toBe("7,00");
            expect(core.value).toBe("7.00");
        });

        test("recalculates and stores new format settings when they change", () => {
            const core = new AmountBaseInputCore(16, 2);

            syncCoreAndGetFormattedValue(core, "1234.56", 16, 2);

            expect(syncCoreAndGetFormattedValue(core, "1234", 16, 0)).toBe("1 234");
            expect(core.fractionDigits).toBe(0);
            expect(core.maxIntegerDigits).toBe(16);

            expect(syncCoreAndGetFormattedValue(core, "1234", 3, 0)).toBe("123");
            expect(core.maxIntegerDigits).toBe(3);
        });
    });

    describe("setFallbackCaret", () => {
        test("sets input.value to formattedValue and adjusts caret for decimal comma key", () => {
            const input = document.createElement("input");
            const core = new AmountBaseInputCore(16, 2);
            core.cache.formattedValue = "1 234,56";
            core.cache.key = ",";
            core.cache.selectionStart = 5; // just before comma
            core.cache.selectionEnd = 5;
            core.cache.selectionDirection = "none";
            core.formattedValue = "1 234,56";
            core.caret = 6; // hypothetical next caret

            setFallbackCaret(input, core, 2);

            expect(input.value).toBe("1 234,56");
            // If caret was just before comma, function moves it forward by 1
            expect(input.selectionStart).toBe(6);
            expect(input.selectionEnd).toBe(6);
        });

        test("keeps caret coherent for backspace before separator", () => {
            const input = document.createElement("input");
            const core = new AmountBaseInputCore(16, 2);
            core.cache.formattedValue = "1 234,56";
            core.cache.key = "Backspace";
            core.cache.selectionStart = 2; // right after space
            core.cache.selectionEnd = 2;
            core.cache.selectionDirection = "none";
            core.formattedValue = "1 234,56";
            core.caret = 1; // expected caret after logic

            setFallbackCaret(input, core, 2);

            expect(input.value).toBe("1 234,56");
            expect(input.selectionStart).toBe(1);
            expect(input.selectionEnd).toBe(input.selectionStart);
        });

        test("places caret using core.caret when value unchanged past decimal", () => {
            const input = document.createElement("input");
            const core = new AmountBaseInputCore(16, 2);
            core.cache.formattedValue = "1 234,56";
            core.cache.key = "";
            core.cache.selectionStart = 9; // after comma and two digits (indexing for demo)
            core.cache.selectionEnd = 9;
            core.cache.selectionDirection = "none";
            core.formattedValue = "1 234,56"; // unchanged
            core.caret = 8;

            setFallbackCaret(input, core, 2);

            expect(input.value).toBe("1 234,56");
            expect(input.selectionStart).toBe(8);
            expect(input.selectionEnd).toBe(8);
        });
    });
});
