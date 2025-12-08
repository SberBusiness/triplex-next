import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента MultiselectField.
export const designTokensComponentsMultiselectFieldKeys = ["Divider_Color"] as const;
// Тип, содержащий названия токенов компонента MultiselectField.
export type TDesignTokensComponentsMultiselectFieldKeys = (typeof designTokensComponentsMultiselectFieldKeys)[number];
// Тип, содержащий названия токенов компонента MultiselectField и их значения.
export type TDesignTokensComponentsMultiselectFieldValue = Record<
    TDesignTokensComponentsMultiselectFieldKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента MultiselectField и их значения в светлой и темной теме.
export type TDesignTokensComponentsMultiselectFieldValues = Record<
    TDesignTokensComponentsMultiselectFieldKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента MultiselectField.
export type TDesignTokensComponentsMultiselectField = {
    MultiselectField: TDesignTokensComponentsMultiselectFieldValue;
};

// Токены компонента MultiselectField в светлой и темной темах.
export const MultiselectField_Tokens: TDesignTokensComponentsMultiselectFieldValues = {
    Divider_Color: [{ ref: "ColorNeutral.20" }, { ref: "ColorDarkNeutral.30" }], // var(--triplex-next-MultiselectField-Divider_Color)
};
