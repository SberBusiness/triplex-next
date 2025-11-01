import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента TabsLine.
export const designTokensComponentsTabsLineKeys = [
    "BorderColor_Active",
    "BorderColor_Hover",

    "Color_Active",
    "Color_Default",
    "Color_Hover",

    "Notification_Color",
    "Separator_Color",
    "Shadow_Focus",
] as const;
// Тип, содержащий названия токенов компонента TabsLine.
export type TDesignTokensComponentsTabsLineKeys = (typeof designTokensComponentsTabsLineKeys)[number];
// Тип, содержащий названия токенов компонента TabsLine и их значения.
export type TDesignTokensComponentsTabsLineValue = Record<TDesignTokensComponentsTabsLineKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента TabsLine и их значения в светлой и темной теме.
export type TDesignTokensComponentsTabsLineValues = Record<TDesignTokensComponentsTabsLineKeys, TDesignTokenValues>;
// Тип локальных токенов компонента TabsLine.
export type TDesignTokensComponentsTabsLine = { TabsLine: TDesignTokensComponentsTabsLineValue };

// Токены компонента TabsLine в светлой и темной темах.
export const TabsLine_Tokens: TDesignTokensComponentsTabsLineValues = {
    BorderColor_Active: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-TabsLine-BorderColor_Active)
    BorderColor_Hover: [{ ref: "ColorBrand.60" }, { ref: "ColorBrand.60" }], // var(--triplex-next-TabsLine-BorderColor_Hover)

    Color_Active: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-TabsLine-Color_Active)
    Color_Default: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-TabsLine-Color_Default)
    Color_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-TabsLine-Color_Hover)

    Notification_Color: [{ ref: "ColorWarning.70" }, { ref: "ColorWarning.70" }], // var(--triplex-next-TabsLine-Notification_Color)
    Separator_Color: [{ ref: "ColorNeutral.20" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-TabsLine-Separator_Color)
    Shadow_Focus: [{ value: "0 0 0 1px #FFDD64 inset" }, { value: "0 0 0 1px #FFDD64 inset" }], // var(--triplex-TabsLine-Shadow_Focus)
};
