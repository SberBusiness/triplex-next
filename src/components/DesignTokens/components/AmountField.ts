import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента AmountField.
export const designTokensComponentsAmountFieldKeys = ["Currency_Color_Default", "Currency_Color_Disabled"] as const;
// Тип, содержащий названия токенов компонента AmountField.
export type TDesignTokensComponentsAmountFieldKeys = (typeof designTokensComponentsAmountFieldKeys)[number];
// Тип, содержащий названия токенов компонента AmountField и их значения.
export type TDesignTokensComponentsAmountFieldValue = Record<TDesignTokensComponentsAmountFieldKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента AmountField и их значения в светлой и темной теме.
export type TDesignTokensComponentsAmountFieldValues = Record<
    TDesignTokensComponentsAmountFieldKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента AmountField.
export type TDesignTokensComponentsAmountField = { AmountField: TDesignTokensComponentsAmountFieldValue };

// Токены компонента AmountField в светлой и темной темах.
export const AmountField_Tokens: TDesignTokensComponentsAmountFieldValues = {
    Currency_Color_Default: [{ ref: "ColorDarkNeutralAlpha.60" }, { ref: "ColorNeutralAlpha.70" }], // var(--triplex-next-AmountField-Currency_Color_Default)
    Currency_Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-AmountField-Currency_Color_Disabled)
};
