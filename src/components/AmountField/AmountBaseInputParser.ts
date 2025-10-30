import { AmountConst } from "@sberbusiness/triplex-next/consts/AmountConst";
import { StringUtils } from "@sberbusiness/triplex-next/utils/stringUtils";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";

/** Обработчик значения в AmountBaseInput. */
export class AmountBaseInputParser {
    /** Значение. */
    private value: string;
    /** Величина сдвига каретки. */
    private caretOffset: number;
    /** Значение нажатой клавиши. */
    private key: string;
    /** Максимальное количество знаков перед запятой. */
    private readonly maxIntegerDigits: number;
    /** Количество чисел после запятой. */
    private readonly fractionDigits: number;

    constructor(maxIntegerDigits: number, fractionDigits: number) {
        this.value = "";
        this.caretOffset = 0;
        this.maxIntegerDigits = maxIntegerDigits;
        this.fractionDigits = fractionDigits;
        this.key = "";
    }

    /** Получение значения. */
    public getValue(): string {
        return this.value;
    }

    /** Получение величины сдвига каретки. */
    public getCaretOffset(): number {
        return this.caretOffset;
    }

    /** Применение входных данных для обработки. */
    public apply(value: string, caret: number, key: string): void {
        const length = value.length;

        this.key = key;

        if (this.maxIntegerDigits > 0) {
            if (this.fractionDigits == 0) {
                return this.parseInteger(value, caret, length);
            } else if (this.fractionDigits > 0) {
                return this.parseDecimal(value, caret, length);
            }
        }

        // Fallback
        this.value = "";
        this.caretOffset -= length;
    }

    /** Обработка значения в виде целого числа. */
    private parseInteger(value: string, caret: number, length: number): void {
        this.parseIntegerPart(value, caret, length);
    }

    /** Обработка значения в виде десятичной дроби. */
    private parseDecimal(value: string, caret: number, length: number): void {
        const separatorIndex = this.findSeparatorIndex(value, caret, length);
        const [integerEnd, fractionalStart] =
            separatorIndex != -1 ? [separatorIndex, separatorIndex + 1] : [caret, caret];
        const [integerPart, fractionalPart] = [value.substring(0, integerEnd), value.substring(fractionalStart)];

        this.parseIntegerPart(integerPart, Math.min(caret, integerEnd), integerEnd);
        this.parseFractionalPart(fractionalPart, Math.max(caret - fractionalStart, 0), length - fractionalStart);
    }

    /** Обработка целой части числа. */
    private parseIntegerPart(value: string, caret: number, length: number): void {
        const buffer: string[] = [];
        [value, caret, length] = this.trimLeadingZeros(value, caret, length);

        // Обработка значения перед кареткой.
        if (caret > 0) {
            const maxDigitsBeforeCaret = this.maxIntegerDigits - (length - caret - Math.floor((length - caret) / 4));

            if (maxDigitsBeforeCaret > 0) {
                for (let i = 0, n = 0; i < caret; i++) {
                    if (StringUtils.isDigit(value[i])) {
                        buffer.push(value[i]);
                        if (++n == maxDigitsBeforeCaret) {
                            break;
                        }
                    }
                }
            }

            this.caretOffset -= caret - buffer.length;
        }

        // Обработка значения после каретки.
        if (caret < length) {
            for (let i = caret; i < length; i++) {
                if (StringUtils.isDigit(value[i])) {
                    buffer.push(value[i]);
                } else {
                    this.caretOffset--;
                }
            }
        }

        this.value = buffer.join("");
    }

    /** Обработка дробной части числа. */
    private parseFractionalPart(value: string, caret: number, length: number): void {
        const buffer: string[] = [];

        // Обработка значения перед кареткой.
        if (caret > 0) {
            const maxDigitsBeforeCaret = this.fractionDigits;

            for (let i = 0, n = 0; i < caret; i++) {
                if (StringUtils.isDigit(value[i])) {
                    buffer.push(value[i]);
                    if (++n == maxDigitsBeforeCaret) {
                        break;
                    }
                } else {
                    this.caretOffset--;
                }
            }
        }

        // Обработка значения после каретки.
        while (buffer.length < this.fractionDigits) {
            const index: number = length - (this.fractionDigits - buffer.length);

            if (index >= caret) {
                buffer.push(value[index]);
            } else {
                buffer.push("0");
                if (isKey(this.key, "DELETE")) {
                    this.caretOffset++;
                }
            }
        }

        // Если целая часть отсутствует.
        if (this.value.length == 0) {
            // При ненулевой дробной части, восстанавливаем целый ноль.
            if (buffer.some((digit) => digit != "0")) {
                this.value = "0";
                this.caretOffset++;
            }
            // Останавливаем парсинг.
            else {
                return;
            }
        }

        this.value += AmountConst.DecimalPoint;
        this.value += buffer.join("");
    }

    /** Удаление ведущих нулей и всего, что им предшествует. */
    private trimLeadingZeros(value: string, caret: number, length: number): [string, number, number] {
        let start = 0;

        for (let i = 0; i < length; i++) {
            if (StringUtils.isDigit(value[i])) {
                start = i;
                if (value[i] != "0") {
                    break;
                }
            }
        }

        this.caretOffset -= start;

        return [value.substring(start), Math.max(caret - start, 0), length - start];
    }

    /** Нахождение индекса десятичного разделителя. */
    private findSeparatorIndex(value: string, caret: number, length: number): number {
        // Если каретка находится перед числом целой части.
        if (caret < length - (this.fractionDigits + 1)) {
            for (let i = length - 1; i >= 0; i--) {
                if (StringUtils.isDecimalSeparator(value[i])) {
                    return i;
                }
            }
        }
        // Если каретка находится после целой части.
        else {
            for (let i = 0; i < length; i++) {
                if (StringUtils.isDecimalSeparator(value[i])) {
                    return i;
                }
            }
        }

        return -1;
    }
}
