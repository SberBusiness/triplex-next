import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Step.
export const designTokensComponentsStepKeys = [
    "Color_Active",
    "Color_Default",
    "Color_Disabled",
    "Color_Done",
    "Color_Error",
    "Color_Warning",

    "Background_Active",
    "Background_Default",
    "Background_Disabled",
    "Background_Done",
    "Background_Error",
    "Background_Warning",
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
    Color_Active: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.100" }], // var(--triplex-next-Step-Color_Active)
    Color_Default: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.30" }], // var(--triplex-next-Step-Color_Default)
    Color_Disabled: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-Step-Color_Disabled)
    Color_Done: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutral.100" }], // var(--triplex-next-Step-Color_Done)
    Color_Error: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Step-Color_Error)
    Color_Warning: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Step-Color_Warning)

    Background_Active: [{ ref: "ColorBrand.100" }, { ref: "ColorBrand.20" }], // var(--triplex-next-Step-Background_Active)
    Background_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-Step-Background_Default)
    Background_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-Step-Background_Disabled)
    Background_Done: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.60" }], // var(--triplex-next-Step-Background_Done)
    Background_Error: [{ ref: "ColorError.40" }, { ref: "ColorError.60" }], // var(--triplex-next-Step-Background_Error)
    Background_Warning: [{ ref: "ColorWarning.40" }, { ref: "ColorWarning.60" }], // var(--triplex-next-Step-Background_Warning)
};
