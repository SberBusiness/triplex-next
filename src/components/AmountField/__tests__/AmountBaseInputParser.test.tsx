import { AmountBaseInputParser } from "@sberbusiness/triplex-next/components/AmountField/AmountBaseInputParser";

describe("AmountBaseInputParser", () => {
    test("parses integer value keeping only digits and tracking caretOffset", () => {
        const p = new AmountBaseInputParser(5, 0);
        // include non-digits and separators
        const raw = "1a2 3,4";
        p.apply(raw, raw.length, "");
        expect(p.getValue()).toBe("1234".slice(0, 5));
        expect(typeof p.getCaretOffset()).toBe("number");
    });

    test("parses decimal splitting at separator and pads/truncates fractional to fractionDigits", () => {
        const p = new AmountBaseInputParser(6, 2);
        const raw = "12 345,6"; // one fractional digit
        p.apply(raw, raw.length, "");
        expect(p.getValue()).toMatch(/^\d+\.\d{2}$/); // normalized with decimal point and 2 digits
    });
});
