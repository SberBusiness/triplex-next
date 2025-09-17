import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Tabs.
export const designTokensComponentsTabsKeys = [
    "Background",

    "Tab_Background_Default",
    "Tab_Background_Hover",
    "Tab_Background_Selected",
    "Tab_BorderColor_Default",
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
    Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Tabs-Background)

    Tab_Background_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Tabs-Tab_Background_Default)
    Tab_Background_Hover: [{ ref: "ColorNeutral.40" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-Tabs-Tab_Background_Hover)
    Tab_Background_Selected: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.100" }], // var(--triplex-next-Tabs-Tab_Background_Selected)
    Tab_BorderColor_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Tabs-Tab_BorderColor_Default)
    Tab_BorderColor_Focus: [{ value: "0 0 0 1px #FFD169 inset" }, { value: "0 0 0 1px #FFD169 inset" }], // var(--triplex-next-Tabs-Tab_BorderColor_Focus)
};
