import { AmountBaseInputParser } from "@sberbusiness/triplex-next/components/AmountField/AmountBaseInputParser";

/** Обработать значение парсером с кареткой в конце строки (типичный ввод в конец поля). */
const parse = (maxIntegerDigits: number, fractionDigits: number, value: string, caret = value.length, key = "") => {
    const parser = new AmountBaseInputParser(maxIntegerDigits, fractionDigits);

    parser.apply(value, caret, key);

    return { value: parser.getValue(), caretOffset: parser.getCaretOffset() };
};

describe("AmountBaseInputParser", () => {
    test("parses integer value keeping only digits and tracking caretOffset", () => {
        const result = parse(5, 0, "1a2 3,4");

        expect(result.value).toBe("1234");
        // Отброшены три символа: "a", пробел и запятая.
        expect(result.caretOffset).toBe(-3);
    });

    test("parses decimal splitting at separator and pads fractional part to fractionDigits", () => {
        expect(parse(6, 2, "12 345,6").value).toBe("12345.60");
        expect(parse(16, 2, "1 234,56").value).toBe("1234.56");
    });

    test("accepts both comma and point as decimal separator", () => {
        expect(parse(16, 2, "1234,56").value).toBe("1234.56");
        expect(parse(16, 2, "1234.56").value).toBe("1234.56");
    });

    test("truncates integer part to maxIntegerDigits", () => {
        expect(parse(3, 0, "12345").value).toBe("123");
        expect(parse(3, 2, "12345,67").value).toBe("123.67");
    });

    test("trims leading zeros and everything before them", () => {
        expect(parse(16, 2, "000123,45").value).toBe("123.45");
    });

    test("restores integer zero when only fractional part is entered", () => {
        const result = parse(16, 2, ",5");

        expect(result.value).toBe("0.50");
        // Восстановленный ноль сдвигает каретку вперёд.
        expect(result.caretOffset).toBe(1);
    });

    test("returns empty value when there is no integer part and fractional part is zero", () => {
        expect(parse(16, 2, ",00").value).toBe("");
        expect(parse(16, 2, "").value).toBe("");
        expect(parse(16, 2, "abc").value).toBe("");
    });

    test("clears value when maxIntegerDigits is not positive", () => {
        const result = parse(0, 2, "123,45");

        expect(result.value).toBe("");
        expect(result.caretOffset).toBe(-6);
    });

    test("supports fraction length other than two", () => {
        expect(parse(16, 4, "12,3").value).toBe("12.3000");
    });

    test("compensates caret for the zero inserted instead of the deleted fractional digit", () => {
        const withDelete = parse(16, 2, "1 234,6", 7, "Delete");
        const withoutKey = parse(16, 2, "1 234,6", 7);

        expect(withDelete.value).toBe("1234.60");
        expect(withoutKey.value).toBe("1234.60");
        expect(withDelete.caretOffset).toBe(withoutKey.caretOffset + 1);
    });
});
