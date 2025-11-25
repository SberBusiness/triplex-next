import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

/// Название токенов компонента SMSInput.
export const designTokensComponentsSMSInputKeys = [
    "Refresh_Fill_Empty",
    "Refresh_Fill_Full",
    "Refresh_Disabled",

    "Submit_Background_Default",
    "Submit_Background_Hover",
    "Submit_Background_Active",
] as const;
// Тип, содержащий названия токенов компонента SMSInput.
export type TDesignTokensComponentsSMSInputKeys = (typeof designTokensComponentsSMSInputKeys)[number];
// Тип, содержащий названия токенов компонента SMSInput и их значения.
export type TDesignTokensComponentsSMSInputValue = Record<TDesignTokensComponentsSMSInputKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента SMSInput и их значения в светлой и темной теме.
export type TDesignTokensComponentsSMSInputValues = Record<TDesignTokensComponentsSMSInputKeys, TDesignTokenValues>;
// Тип локальных токенов компонента SMSInput.
export type TDesignTokensComponentsSMSInput = { SMSInput: TDesignTokensComponentsSMSInputValue };

// Токены компонента SMSInput в светлой и темной темах.
export const SMSInput_Tokens: TDesignTokensComponentsSMSInputValues = {
    Refresh_Fill_Empty: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorNeutralAlpha.70" }], // var(--triplex-next-SMSInput-Refresh_Fill_Empty)
    Refresh_Fill_Full: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.60" }], // var(--triplex-next-SMSInput-Refresh_Fill_Full)
    Refresh_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SMSInput-Refresh_Disabled)

    Submit_Background_Default: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SMSInput-Submit_Background_Default)
    Submit_Background_Hover: [{ ref: "ColorBrand.60" }, { ref: "ColorBrand.60" }], // var(--triplex-next-SMSInput-Submit_Background_Hover)
    Submit_Background_Active: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-SMSInput-Submit_Background_Active)
};
