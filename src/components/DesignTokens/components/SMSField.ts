import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

/// Название токенов компонента SMSField.
export const designTokensComponentsSMSFieldKeys = [
    "Refresh_Fill_Empty",
    "Refresh_Fill_Full",
    "Refresh_Disabled",

    "Submit_Background_Default",
    "Submit_Background_Hover",
    "Submit_Background_Active",
] as const;
// Тип, содержащий названия токенов компонента SMSField.
export type TDesignTokensComponentsSMSFieldKeys = (typeof designTokensComponentsSMSFieldKeys)[number];
// Тип, содержащий названия токенов компонента SMSField и их значения.
export type TDesignTokensComponentsSMSFieldValue = Record<TDesignTokensComponentsSMSFieldKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента SMSField и их значения в светлой и темной теме.
export type TDesignTokensComponentsSMSFieldValues = Record<TDesignTokensComponentsSMSFieldKeys, TDesignTokenValues>;
// Тип локальных токенов компонента SMSField.
export type TDesignTokensComponentsSMSField = { SMSField: TDesignTokensComponentsSMSFieldValue };

// Токены компонента SMSField в светлой и темной темах.
export const SMSField_Tokens: TDesignTokensComponentsSMSFieldValues = {
    Refresh_Fill_Empty: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorNeutralAlpha.70" }], // var(--triplex-next-SMSField-Refresh_Fill_Empty)
    Refresh_Fill_Full: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.60" }], // var(--triplex-next-SMSField-Refresh_Fill_Full)
    Refresh_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SMSField-Refresh_Disabled)

    Submit_Background_Default: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SMSField-Submit_Background_Default)
    Submit_Background_Hover: [{ ref: "ColorBrand.60" }, { ref: "ColorBrand.60" }], // var(--triplex-next-SMSField-Submit_Background_Hover)
    Submit_Background_Active: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-SMSField-Submit_Background_Active)
};
