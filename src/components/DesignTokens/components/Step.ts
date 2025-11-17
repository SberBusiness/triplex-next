import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Step.
export const designTokensComponentsStepKeys = [
    // "Color_Error",
    // "Color_Warning",
    "Color_Success",
    "Color_Wait",

    // "Background_Error",
    // "Background_Warning",
    "Background_Success",
    "Background_Wait",

    // "Border_Error",
    // "Border_Warning",
    "Border_Success",
    "Border_Wait",
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
    // Color_Error: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutral.100" }], // var(--triplex-next-Step-Color_Default)
    // Color_Warning: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.40" }], // var(--triplex-next-Step-Color_Disabled)
    Color_Success: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutral.100" }], // var(--triplex-next-Step-Color_Success)
    Color_Wait: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.40" }], // var(--triplex-next-Step-Color_Wait)

    // Background_Error: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.40" }], // var(--triplex-next-Step-Type1_Background)
    // Background_Warning: [{ value: "transparent" }, { value: "transparent" }], // var(--triplex-next-Step-Type2_Background)
    Background_Success: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.40" }], // var(--triplex-next-Step-Background_Success)
    Background_Wait: [{ value: "transparent" }, { value: "transparent" }], // var(--triplex-next-Step-Background_Wait)

    // Border_Error: [{ value: "transparent" }, { value: "transparent" }], // var(--triplex-next-Step-Type1_Border)
    // Border_Warning: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.40" }], // var(--triplex-next-Step-Type2_Border)
    Border_Success: [{ value: "transparent" }, { value: "transparent" }], // var(--triplex-next-Step-Border_Success)
    Border_Wait: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.40" }], // var(--triplex-next-Step-Border_Wait)
};
