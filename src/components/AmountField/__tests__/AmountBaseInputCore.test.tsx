import { AmountBaseInputCore } from "@sberbusiness/triplex-next/components/AmountField/AmountBaseInputCore";

describe("AmountBaseInputCore", () => {
    test("starts with empty state and empty cache", () => {
        const core = new AmountBaseInputCore(16, 2);

        expect(core.value).toBe("");
        expect(core.formattedValue).toBe("");
        expect(core.caret).toBe(0);
        expect(core.maxIntegerDigits).toBe(16);
        expect(core.fractionDigits).toBe(2);
        expect(core.cache).toEqual({
            formattedValue: "",
            key: "",
            selectionDirection: null,
            selectionEnd: null,
            selectionStart: null,
        });
    });

    test("apply normalizes value and formats it for display", () => {
        const core = new AmountBaseInputCore(16, 2);

        core.apply("1234567,89", "1234567,89".length);

        // Наружу уходит нормализованное значение, в поле показывается отформатированное.
        expect(core.value).toBe("1234567.89");
        expect(core.formattedValue).toBe("1 234 567,89");
        expect(core.caret).toBe(core.formattedValue.length);
    });

    test("apply formats value without fractional part when fractionDigits is zero", () => {
        const core = new AmountBaseInputCore(16, 0);

        core.apply("1234", 4);

        expect(core.value).toBe("1234");
        expect(core.formattedValue).toBe("1 234");
        expect(core.caret).toBe(5);
    });

    test("apply respects maxIntegerDigits", () => {
        const core = new AmountBaseInputCore(3, 2);

        core.apply("123456,78", "123456,78".length);

        expect(core.value).toBe("123.78");
        expect(core.formattedValue).toBe("123,78");
    });

    test("apply pads fractional part of a partially typed value", () => {
        const core = new AmountBaseInputCore(16, 2);

        core.apply("5", 1);

        expect(core.value).toBe("5.00");
        expect(core.formattedValue).toBe("5,00");
        // Каретка остаётся после введённой цифры, а не уезжает в конец дописанных нулей.
        expect(core.caret).toBe(1);
    });

    test("apply reuses the same instance for consecutive values", () => {
        const core = new AmountBaseInputCore(16, 2);

        core.apply("1234,56", "1234,56".length);
        core.apply("", 0);

        expect(core.value).toBe("");
        expect(core.formattedValue).toBe("");
    });

    test("apply picks up updated maxIntegerDigits and fractionDigits", () => {
        const core = new AmountBaseInputCore(16, 2);

        core.apply("1234,56", "1234,56".length);
        core.fractionDigits = 0;
        core.apply("1234", 4);

        expect(core.value).toBe("1234");
        expect(core.formattedValue).toBe("1 234");
    });
});
