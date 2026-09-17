import { AmountBaseInputFormatter } from "@sberbusiness/triplex-next/components/AmountField/AmountBaseInputFormatter";

describe("AmountBaseInputFormatter", () => {
    test("formats integer without fraction digits and reports caretOffset for spaces", () => {
        const f = new AmountBaseInputFormatter(0);
        f.apply("1234");
        expect(f.getValue()).toBe("1 234");
        expect(f.getCaretOffset()).toBe(1); // one space inserted

        const f2 = new AmountBaseInputFormatter(0);
        f2.apply("1234567");
        expect(f2.getValue()).toBe("1 234 567");
        expect(f2.getCaretOffset()).toBe(2); // two spaces inserted
    });

    test("formats decimal with comma and groups integer part", () => {
        const f = new AmountBaseInputFormatter(2);
        f.apply("123456.78");
        expect(f.getValue()).toBe("123 456,78");
        expect(f.getCaretOffset()).toBe(1); // one space in integer part

        const f2 = new AmountBaseInputFormatter(2);
        f2.apply("1234567.89");
        expect(f2.getValue()).toBe("1 234 567,89");
        expect(f2.getCaretOffset()).toBe(2); // two spaces in integer part
    });

    test("does not group integer part shorter than four digits", () => {
        const f = new AmountBaseInputFormatter(0);
        f.apply("123");
        expect(f.getValue()).toBe("123");
        expect(f.getCaretOffset()).toBe(0);

        const f2 = new AmountBaseInputFormatter(2);
        f2.apply("0.00");
        expect(f2.getValue()).toBe("0,00");
        expect(f2.getCaretOffset()).toBe(0);
    });

    test("supports fraction length other than two", () => {
        const f = new AmountBaseInputFormatter(4);
        f.apply("12.3000");
        expect(f.getValue()).toBe("12,3000");
        expect(f.getCaretOffset()).toBe(0);
    });

    test("returns empty string for empty value", () => {
        const f = new AmountBaseInputFormatter(2);
        f.apply("");
        expect(f.getValue()).toBe("");
        expect(f.getCaretOffset()).toBe(0);

        const f2 = new AmountBaseInputFormatter(0);
        f2.apply("");
        expect(f2.getValue()).toBe("");
        expect(f2.getCaretOffset()).toBe(0);
    });
});
