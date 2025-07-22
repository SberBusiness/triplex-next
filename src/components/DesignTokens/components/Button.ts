import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Button.
export const designTokensComponentsButtonKeys = [
    "General_Background_Active",
    "General_Background_Default",
    "General_Background_Disabled",
    "General_Background_Hover",
    "General_Color_Default",
    "General_Color_Disabled",
    "General_Color_Hover",
] as const;

// Тип, содержащий названия токенов компонента Button.
export type TDesignTokensComponentsButtonKeys = (typeof designTokensComponentsButtonKeys)[number];
// Тип, содержащий названия токенов компонента Button и их значения.
export type TDesignTokensComponentsButtonValue = Record<TDesignTokensComponentsButtonKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Button и их значения в светлой и темной теме.
export type TDesignTokensComponentsButtonValues = Record<TDesignTokensComponentsButtonKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Button.
export type TDesignTokensComponentsButton = { Button: TDesignTokensComponentsButtonValue };

// Токены компонента Button в светлой и темной темах.
export const Button_Tokens: TDesignTokensComponentsButtonValues = {
    General_Background_Active: [{ ref: "ColorBrand.10" }, { ref: "ColorBrand.90" }], // var(--triplex-next-Button-General_Background_Active)
    General_Background_Default: [{ ref: "ColorBrand.30" }, { ref: "ColorBrand.50" }], // var(--triplex-next-Button-General_Background_Default)
    General_Background_Disabled: [{ ref: "ColorBrand.90" }, { ref: "ColorNeutral.0" }], // var(--triplex-next-Button-General_Background_Disabled)
    General_Background_Hover: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.30" }], // var(--triplex-next-Button-General_Background_Hover)
    General_Color_Default: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutral.90" }], // var(--triplex-next-Button-General_Color_Default)
    General_Color_Disabled: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutral.90" }], // var(--triplex-next-Button-General_Color_Disabled)
    General_Color_Hover: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutral.90" }], // var(--triplex-next-Button-General_Color_Hover)
};
