import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Checkbox.
export const designTokensComponentsCheckboxKeys = [
    "Background_Default",
    "Background_Checked_Default",
    "Background_Checked_Hover",
    "Background_Disabled",

    "BorderColor_Focus",

    "Checkmark_Fill_Default",
    "Checkmark_Fill_Disabled",

    "Color_Default",
    "Color_Disabled",
] as const;
// Тип, содержащий названия токенов компонента Checkbox.
export type TDesignTokensComponentsCheckboxKeys = (typeof designTokensComponentsCheckboxKeys)[number];
// Тип, содержащий названия токенов компонента Checkbox и их значения.
export type TDesignTokensComponentsCheckboxValue = Record<TDesignTokensComponentsCheckboxKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Checkbox и их значения в светлой и темной теме.
export type TDesignTokensComponentsCheckboxValues = Record<TDesignTokensComponentsCheckboxKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Checkbox.
export type TDesignTokensComponentsCheckbox = { Checkbox: TDesignTokensComponentsCheckboxValue };

// Токены компонента Checkbox в светлой и темной темах.
export const Checkbox_Tokens: TDesignTokensComponentsCheckboxValues = {
    Background_Checked_Default: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-Checkbox-Background_Checked_Default)
    Background_Checked_Hover: [{ ref: "ColorBrand.30" }, { ref: "ColorBrand.30" }], // var(--triplex-next-Checkbox-Background_Checked_Hover)
    Background_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Checkbox-Background_Default)
    Background_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-Checkbox-Background_Disabled)

    BorderColor_Focus: [{ value: "0 0 0 1px #FFD169 inset" }, { value: "0 0 0 1px #FFD169 inset" }], // var(--triplex-next-Checkbox-BorderColor_Focus)

    Checkmark_Fill_Default: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Checkbox-Checkmark_Fill_Default)
    Checkmark_Fill_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-Checkbox-Checkmark_Fill_Disabled)

    Color_Default: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Checkbox-Color_Default)
    Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-Checkbox-Color_Disabled)
};
