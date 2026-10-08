import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента PageIndicators.
export const designTokensComponentsPageIndicatorsKeys = [
    "Indicator_Inactive_BackgroundColor_Default",
    "Indicator_Inactive_BackgroundColor_Hover",
    "Indicator_Inactive_BackgroundColor_Pressed",
    "Indicator_Inactive_BackgroundColor_Disabled",
    "Indicator_Active_BackgroundColor_Default",
    "Indicator_Active_BackgroundColor_Hover",
    "Indicator_Active_BackgroundColor_Pressed",
    "Indicator_Active_BackgroundColor_Disabled",
    "Indicator_OutlineColor",
] as const;
// Тип, содержащий названия токенов компонента PageIndicators.
export type TDesignTokensComponentsPageIndicatorsKeys = (typeof designTokensComponentsPageIndicatorsKeys)[number];
// Тип, содержащий названия токенов компонента PageIndicators и их значения.
export type TDesignTokensComponentsPageIndicatorsValue = Record<
    TDesignTokensComponentsPageIndicatorsKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента PageIndicators и их значения в светлой и темной теме.
export type TDesignTokensComponentsPageIndicatorsValues = Record<
    TDesignTokensComponentsPageIndicatorsKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента PageIndicators.
export type TDesignTokensComponentsPageIndicators = { PageIndicators: TDesignTokensComponentsPageIndicatorsValue };

// Токены компонента PageIndicators в светлой и темной темах.
export const PageIndicators_Tokens: TDesignTokensComponentsPageIndicatorsValues = {
    Indicator_Inactive_BackgroundColor_Default: [{ ref: "ColorDarkNeutralAlpha.80" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-PageIndicators-Indicator_Inactive_BackgroundColor_Default)
    Indicator_Inactive_BackgroundColor_Hover: [{ ref: "ColorDarkNeutralAlpha.60" }, { ref: "ColorNeutralAlpha.60" }], // var(--triplex-next-PageIndicators-Indicator_Inactive_BackgroundColor_Hover)
    Indicator_Inactive_BackgroundColor_Pressed: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-PageIndicators-Indicator_Inactive_BackgroundColor_Pressed)
    Indicator_Inactive_BackgroundColor_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-PageIndicators-Indicator_Inactive_BackgroundColor_Disabled)
    Indicator_Active_BackgroundColor_Default: [{ ref: "ColorDarkNeutralAlpha.30" }, { ref: "ColorNeutralAlpha.30" }], // var(--triplex-next-PageIndicators-Indicator_Active_BackgroundColor_Default)
    Indicator_Active_BackgroundColor_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-PageIndicators-Indicator_Active_BackgroundColor_Hover)
    Indicator_Active_BackgroundColor_Pressed: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-PageIndicators-Indicator_Active_BackgroundColor_Pressed)
    Indicator_Active_BackgroundColor_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-PageIndicators-Indicator_Active_BackgroundColor_Disabled)
    Indicator_OutlineColor: [{ ref: "ColorWarning.80" }, { ref: "ColorWarning.80" }], // var(--triplex-next-PageIndicators-Indicator_OutlineColor)
};
