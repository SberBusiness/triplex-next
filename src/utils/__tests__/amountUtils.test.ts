import { describe, it, expect } from "vitest";
import Big from "big.js";
import { formatAmount } from "../amountUtils";
import { AmountConst } from "../../consts/AmountConst";

const SEP = AmountConst.GroupSeparator;

/** Прежняя реализация разделения на группы — эталон для сверки поведения. */
const legacySeparate = (value: string): string => value.replace(/\B(?=(\d{3})+(?!\d))/g, SEP);

describe("formatAmount", () => {
    it("возвращает пустую строку для пустого значения", () => {
        expect(formatAmount("")).toBe("");
    });

    it("разделяет группы разрядов и дополняет дробную часть", () => {
        expect(formatAmount("1200000")).toBe(`1${SEP}200${SEP}000,00`);
        expect(formatAmount("1200000.5")).toBe(`1${SEP}200${SEP}000,50`);
    });

    it.each([
        ["1", "1,00"],
        ["12", "12,00"],
        ["123", "123,00"],
        ["1234", `1${SEP}234,00`],
        ["12345", `12${SEP}345,00`],
        ["123456", `123${SEP}456,00`],
        ["1234567", `1${SEP}234${SEP}567,00`],
    ])("группирует целую часть любой длины: %s", (value, expected) => {
        expect(formatAmount(value)).toBe(expected);
    });

    it("сохраняет знак отрицательного числа перед первой группой", () => {
        expect(formatAmount("-123")).toBe("-123,00");
        expect(formatAmount("-1234")).toBe(`-1${SEP}234,00`);
        expect(formatAmount("-1234567.89")).toBe(`-1${SEP}234${SEP}567,89`);
    });

    it("сохраняет знак плюс, переданный в строке", () => {
        expect(formatAmount("+1234")).toBe(`+1${SEP}234,00`);
    });

    it("не разделяет группы при separateGroups = false", () => {
        expect(formatAmount("1234567", 2, false)).toBe("1234567,00");
    });

    it("отбрасывает незначащие нули при fillFraction = false", () => {
        expect(formatAmount("1234.50", 2, true, false)).toBe(`1${SEP}234,5`);
        expect(formatAmount("1234.00", 2, true, false)).toBe(`1${SEP}234`);
    });

    it("принимает Big и запятую как десятичный разделитель", () => {
        expect(formatAmount(Big("9876543.21"))).toBe(`9${SEP}876${SEP}543,21`);
        expect(formatAmount("1234,5")).toBe(`1${SEP}234,50`);
    });

    it("возвращает ноль для нечислового значения", () => {
        expect(formatAmount("abc")).toBe("0,00");
    });

    it("совпадает с прежней реализацией на целых частях длиной от 1 до 40 цифр", () => {
        for (let length = 1; length <= 40; length++) {
            const digits = "9".repeat(length);

            expect(formatAmount(digits, null)).toBe(legacySeparate(digits));
            expect(formatAmount(`-${digits}`, null)).toBe(`-${legacySeparate(digits)}`);
        }
    });

    it("форматирует значение с большой экспонентой за линейное время", () => {
        const start = performance.now();
        const result = formatAmount("1e200000", null);
        const duration = performance.now() - start;

        expect(result.startsWith(`100${SEP}000`)).toBe(true);
        expect(result.split(SEP)).toHaveLength(66667);
        // Прежняя реализация тратила на такое значение десятки секунд.
        expect(duration).toBeLessThan(2000);
    });
});
