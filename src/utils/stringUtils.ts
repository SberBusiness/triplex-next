import { AmountConst } from "@sberbusiness/triplex-next/consts/AmountConst";

/** Утилиты для работы со строками. */
export const StringUtils = {
    /** Является ли символ арабской цифрой. */
    isDigit: (char: string): boolean => char >= "0" && char <= "9",

    /** Является ли символ десятичным разделителем. */
    isDecimalSeparator: (char: string): boolean => char == AmountConst.DecimalComma || char == AmountConst.DecimalPoint,

    /** Является ли символ унарным минусом. */
    isUnaryMinus: (char: string): boolean => char == "-",
};
