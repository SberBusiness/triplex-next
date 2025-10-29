import { AmountBaseInputFormatter } from "@sberbusiness/triplex-next/components/AmountField/AmountBaseInputFormatter";

describe("AmountBaseInputFormatter", () => {
    test("formats integer without fraction digits and reports caretOffset for spaces", () => {
        const f = new AmountBaseInputFormatter(16, 0);
        f.apply("1234");
        expect(f.getValue()).toBe("1 234");
        expect(f.getCaretOffset()).toBe(1); // one space inserted

        const f2 = new AmountBaseInputFormatter(16, 0);
        f2.apply("1234567");
        expect(f2.getValue()).toBe("1 234 567");
        expect(f2.getCaretOffset()).toBe(2); // two spaces inserted
    });

    test("formats decimal with comma and groups integer part", () => {
        const f = new AmountBaseInputFormatter(16, 2);
        f.apply("123456.78");
        expect(f.getValue()).toBe("123 456,78");
        expect(f.getCaretOffset()).toBe(1); // one space in integer part

        const f2 = new AmountBaseInputFormatter(16, 2);
        f2.apply("1234567.89");
        expect(f2.getValue()).toBe("1 234 567,89");
        expect(f2.getCaretOffset()).toBe(2); // two spaces in integer part
    });
});
