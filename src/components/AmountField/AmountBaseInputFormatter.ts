import { AmountConst } from "@sberbusiness/triplex-next/consts/AmountConst";

/** Форматер значения в AmountBaseInput. */
export class AmountBaseInputFormatter {
    /** Значение. */
    private value: string;
    /** Величина сдвига каретки. */
    private caretOffset: number;
    /** Максимальное количество знаков (без учёта пробелов). */
    private readonly maxLength: number;
    /** Количество чисел после запятой. */
    private readonly fractionDigits: number;

    constructor(maxLength: number, fractionDigits: number) {
        this.value = "";
        this.caretOffset = 0;
        this.maxLength = maxLength;
        this.fractionDigits = fractionDigits;
    }

    /** Получение значения. */
    public getValue(): string {
        return this.value;
    }

    /** Получение величины сдвига каретки. */
    public getCaretOffset(): number {
        return this.caretOffset;
    }

    /** Применение входных данные для форматирования. */
    public apply(value: string): void {
        const length = value.length;

        if (this.fractionDigits == 0) {
            this.value = this.formatInteger(value, length);
        } else {
            this.value = this.formatDecimal(value, length);
        }
    }

    /** Форматирование значения в виде целого значения. */
    private formatInteger(value: string, length: number): string {
        const buffer: string[] = [];

        if (length > 0) {
            let i = 0;

            buffer.push(value[i]);
            while (++i < length) {
                // Нужно ли добавить разделитель между группами цифр.
                if ((length - i) % 3 == 0) {
                    buffer.push(" ");
                    this.caretOffset++;
                }
                buffer.push(value[i]);
            }
        }

        return buffer.join("");
    }

    /** Форматирование значения в виде десятичной дроби. */
    private formatDecimal(value: string, length: number): string {
        const buffer: string[] = [];

        if (length) {
            const integerLength = length - this.fractionDigits - 1;
            let i = 0;

            buffer.push(value[i]);
            while (++i < integerLength) {
                // Нужно ли добавить разделитель между группами цифр.
                if ((integerLength - i) % 3 == 0) {
                    buffer.push(" ");
                    this.caretOffset++;
                }
                buffer.push(value[i]);
            }

            buffer.push(AmountConst.DecimalComma);

            while (++i < length) {
                buffer.push(value[i]);
            }
        }

        return buffer.join("");
    }
}
