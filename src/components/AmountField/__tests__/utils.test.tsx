import { createPlaceholder, setFallbackCaret } from "@sberbusiness/triplex-next/components/AmountField/utils";
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
            // When backspacing near separator, caret may move backward by one
            expect(input.selectionStart).toBeLessThanOrEqual(2);
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
