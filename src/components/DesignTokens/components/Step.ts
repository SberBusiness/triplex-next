import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Step.
export const designTokensComponentsStepKeys = [
    "Color_Error",
    "Color_Warning",
    "Color_Success",
    "Color_Wait",
    "Color_Disabled",

    "Background_Error",
    "Background_Warning",
    "Background_Success",
    "Background_Wait",
    "Background_Disabled",
] as const;
// Тип, содержащий названия токенов компонента Step.
export type TDesignTokensComponentsStepKeys = (typeof designTokensComponentsStepKeys)[number];
// Тип, содержащий названия токенов компонента Step и их значения.
export type TDesignTokensComponentsStepValue = Record<TDesignTokensComponentsStepKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Step и их значения в светлой и темной теме.
export type TDesignTokensComponentsStepValues = Record<TDesignTokensComponentsStepKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Step.
export type TDesignTokensComponentsStep = { Step: TDesignTokensComponentsStepValue };

// Токены компонента Step в светлой и темной темах.
export const Step_Tokens: TDesignTokensComponentsStepValues = {
    Color_Error: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Step-Color_Default)
    Color_Warning: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Step-Color_Disabled)
    Color_Success: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutral.100" }], // var(--triplex-next-Step-Color_Success)
    Color_Wait: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.100" }], // var(--triplex-next-Step-Color_Wait)
    Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.30" }], // var(--triplex-next-Step-Color_Disabled)

    Background_Error: [{ ref: "ColorError.60" }, { ref: "ColorError.70" }], // var(--triplex-next-Step-Type1_Background)
    Background_Warning: [{ ref: "ColorWarning.70" }, { ref: "ColorWarning.80" }], // var(--triplex-next-Step-Type2_Background)
    Background_Success: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.50" }], // var(--triplex-next-Step-Background_Success)
    Background_Wait: [{ ref: "ColorBrand.100" }, { ref: "ColorBrand.20" }], // var(--triplex-next-Step-Background_Wait)
    Background_Disabled: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-Step-Background_Disabled)
};
