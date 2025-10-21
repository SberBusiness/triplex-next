/** Стандартные размерности для дробных частей. */
export type TFractionLength = 0 | 2 | 4 | 5;

/** Интерфейс форматов поля Amount (сумма). */
interface IAmountConst {
    /** Разделитель целой и дробной частей числа. */
    DecimalComma: string;
    /** Разделитель целой и дробной частей числа, используемый для вычислений (BigInt) и на бэкенде. */
    DecimalPoint: string;
    /** Количество знаков после разделителя в сумме. */
    FractionLength: TFractionLength;
    /** Разделитель групп разрядов. */
    GroupSeparator: string;
}

/** Константы форматов поля Amount (сумма). */
export const AmountConst: IAmountConst = {
    DecimalComma: ",",
    DecimalPoint: ".",
    FractionLength: 2,
    GroupSeparator: "\u00A0",
};
