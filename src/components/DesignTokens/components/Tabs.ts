import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Tabs.
export const designTokensComponentsTabsKeys = [
    "Type1_Background",
    "Type2_Background",

    "Type1_Tab_Background_Default",
    "Type2_Tab_Background_Default",
    "Type1_Tab_Background_Selected",
    "Type2_Tab_Background_Selected",
    "Type1_Tab_Background_Hover",
    "Type2_Tab_Background_Hover",

    "Type1_Tab_Color_Default",
    "Type2_Tab_Color_Default",
    "Type1_Tab_Color_Selected",
    "Type2_Tab_Color_Selected",
    "Type1_Tab_Color_Hover",
    "Type2_Tab_Color_Hover",

    "Tab_BorderColor_Focus",
] as const;
// Тип, содержащий названия токенов компонента Tabs.
export type TDesignTokensComponentsTabsKeys = (typeof designTokensComponentsTabsKeys)[number];
// Тип, содержащий названия токенов компонента Tabs и их значения.
export type TDesignTokensComponentsTabsValue = Record<TDesignTokensComponentsTabsKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Tabs и их значения в светлой и темной теме.
export type TDesignTokensComponentsTabsValues = Record<TDesignTokensComponentsTabsKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Tabs.
export type TDesignTokensComponentsTabs = { Tabs: TDesignTokensComponentsTabsValue };

// Токены компонента Tabs в светлой и темной темах.
export const Tabs_Tokens: TDesignTokensComponentsTabsValues = {
    Type1_Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-Tabs-Type1_Background)
    Type2_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Tabs-Type2_Background)

    Type1_Tab_Background_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-Tabs-Type1_Tab_Background_Default)
    Type2_Tab_Background_Default: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Tabs-Type2_Tab_Background_Default)
    Type1_Tab_Background_Selected: [{ ref: "ColorNeutral.30" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-Tabs-Type1_Tab_Background_Selected)
    Type2_Tab_Background_Selected: [{ ref: "ColorNeutral.50" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-Tabs-Type2_Tab_Background_Selected)
    Type1_Tab_Background_Hover: [{ ref: "ColorNeutral.50" }, { ref: "ColorDarkNeutral.90" }], // var(--triplex-next-Tabs-Type1_Tab_Background_Hover)
    Type2_Tab_Background_Hover: [{ ref: "ColorNeutral.80" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-Tabs-Type2_Tab_Background_Hover)

    Type1_Tab_Color_Default: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-Tabs-Type1_Tab_Color_Default)
    Type2_Tab_Color_Default: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-Tabs-Type2_Tab_Color_Default)
    Type1_Tab_Color_Selected: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Tabs-Type1_Tab_Color_Selected)
    Type2_Tab_Color_Selected: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Tabs-Type2_Tab_Color_Selected)
    Type1_Tab_Color_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Tabs-Type1_Tab_Color_Hover)
    Type2_Tab_Color_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Tabs-Type2_Tab_Color_Hover)

    Tab_BorderColor_Focus: [{ value: "0 0 0 1px #FFD169 inset" }, { value: "0 0 0 1px #FFD169 inset" }], // var(--triplex-next-Tabs-Tab_BorderColor_Focus)
};
