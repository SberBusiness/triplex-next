import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента Radio.
export const designTokensComponentsRadioKeys = [
    "Background_Checked_Default",
    "Background_Checked_Disabled",
    "Background_Checked_Hover",
    "Background_Default",
    "Background_Disabled",
    "Background_Hover",

    "BorderColor_Default",
    "BorderColor_Disabled",
    "BorderColor_Focused",

    "BorderColor_Checked_Default",
    "BorderColor_Checked_Disabled",

    "Color",

    "Dot_Default",
    "Dot_Disabled",
] as const;
// Тип, содержащий названия токенов компонента Radio.
export type TDesignTokensComponentsRadioKeys = (typeof designTokensComponentsRadioKeys)[number];
// Тип, содержащий названия токенов компонента Radio и их значения.
export type TDesignTokensComponentsRadioValue = Record<TDesignTokensComponentsRadioKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Radio и их значения в светлой и темной теме.
export type TDesignTokensComponentsRadioValues = Record<TDesignTokensComponentsRadioKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Radio.
export type TDesignTokensComponentsRadio = { Radio: TDesignTokensComponentsRadioValue };

// Токены компонента Radio в светлой и темной темах.
export const Radio_Tokens: TDesignTokensComponentsRadioValues = {
    Background_Checked_Default: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-Radio-Background_Checked_Default)
    Background_Checked_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-Radio-Background_Checked_Disabled)
    Background_Checked_Hover: [{ ref: "ColorBrand.30" }, { ref: "ColorBrand.30" }], // var(--triplex-next-Radio-Background_Checked_Hover)
    Background_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Radio-Background_Default)
    Background_Disabled: [{ ref: "ColorNeutral.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-Radio-Background_Disabled)
    Background_Hover: [{ ref: "ColorBrand.60" }, { ref: "ColorBrand.60" }], // var(--triplex-next-Radio-Background_Hover)

    BorderColor_Default: [
        { value: "0 0 0 1px rgba(31, 31, 34, 0.25) inset" },
        { value: "0 0 0 1px rgba(255, 255, 255, 0.35) inset" },
    ], // var(--triplex-next-Radio-BorderColor_Default)
    BorderColor_Disabled: [{ value: "0 0 0 1px #E3E6EA inset" }, { value: "0 0 0 1px #4F4F52 inset" }], // var(--triplex-next-Radio-BorderColor_Disabled)
    BorderColor_Focused: [{ value: "0 0 0 1px #FFD169 inset" }, { value: "0 0 0 1px #FFD169 inset" }], // var(--triplex-next-Radio-BorderColor_Focused)

    BorderColor_Checked_Default: [{ value: "none" }, { value: "none" }], // var(--triplex-next-Radio-BorderColor_Checked_Default)
    BorderColor_Checked_Disabled: [{ value: "none" }, { value: "none" }], // var(--triplex-next-Radio-BorderColor_Checked_Disabled)

    Color: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Radio-Color)

    Dot_Default: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Radio-Dot_Default)
    Dot_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-Radio-Dot_Disabled)
};
