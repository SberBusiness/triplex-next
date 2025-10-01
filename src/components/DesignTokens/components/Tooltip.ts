import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

/// Название токенов компонента Tooltip.
export const designTokensComponentsTooltipKeys = [
    "Background",
    "Color",

    "Link_Desktop_Color_Active",
    "Link_Desktop_Color_Default",
    "Link_Desktop_Color_Hover",
    "Link_Desktop_Shadow_Focus",

    "Link_Mobile_Color_Active",
    "Link_Mobile_Color_Default",
    "Link_Mobile_Color_Hover",
    "Link_Mobile_Shadow_Focus",
] as const;
// Тип, содержащий названия токенов компонента Tooltip.
export type TDesignTokensComponentsTooltipKeys = (typeof designTokensComponentsTooltipKeys)[number];
// Тип, содержащий названия токенов компонента Tooltip и их значения.
export type TDesignTokensComponentsTooltipValue = Record<TDesignTokensComponentsTooltipKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Tooltip и их значения в светлой и темной теме.
export type TDesignTokensComponentsTooltipValues = Record<TDesignTokensComponentsTooltipKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Tooltip.
export type TDesignTokensComponentsTooltip = { Tooltip: TDesignTokensComponentsTooltipValue };

// Токены компонента Tooltip в светлой и темной темах.
export const Tooltip_Tokens: TDesignTokensComponentsTooltipValues = {
    Background: [{ ref: "ColorDarkNeutral.20" }, { ref: "ColorNeutral.80" }], // var(--triplex-next-Tooltip-Background)
    Color: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorDarkNeutralAlpha.0" }], // var(--triplex-next-Tooltip-Color)

    // Цвета взяты из самого компонента Link (pixso), только "наоборот", т.к. у тултипа в светлой теме черная подложка
    Link_Desktop_Color_Active: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.30" }], // var(--triplex-next-Tooltip-Link_Desktop_Color_Active)
    Link_Desktop_Color_Default: [{ ref: "ColorBrand.60" }, { ref: "ColorBrand.40" }], // var(--triplex-next-Tooltip-Link_Desktop_Color_Default)
    Link_Desktop_Color_Hover: [{ ref: "ColorBrand.70" }, { ref: "ColorBrand.50" }], // var(--triplex-next-Tooltip-Link_Desktop_Color_Hover)
    Link_Desktop_Shadow_Focus: [{ value: "0 0 0 1px #FFD169" }, { value: "0 0 0 1px #FFD169" }], // var(--triplex-next-Tooltip-Link_Desktop_Shadow_Focus)

    // А в адаптиве почему-то подложка в светлой теме белая, поэтому взято из десктопа "наоборот"
    Link_Mobile_Color_Active: [{ ref: "ColorBrand.30" }, { ref: "ColorBrand.40" }], // var(--triplex-next-Tooltip-Link_Mobile_Color_Active)
    Link_Mobile_Color_Default: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.60" }], // var(--triplex-next-Tooltip-Link_Mobile_Color_Default)
    Link_Mobile_Color_Hover: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.70" }], // var(--triplex-next-Tooltip-Link_Mobile_Color_Hover)
    Link_Mobile_Shadow_Focus: [{ value: "0 0 0 1px #FFDD64" }, { value: "0 0 0 1px #FFDD64" }], // var(--triplex-next-Tooltip-Link_Mobile_Shadow_Focus)
};
