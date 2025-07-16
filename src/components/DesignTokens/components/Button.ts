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
    General_Background_Active: [{ ref: "Brand.10" }, { ref: "Brand.90" }], // var(--triplex-next-Button-General_Background_Active)
    General_Background_Default: [{ ref: "Brand.30" }, { ref: "Brand.50" }], // var(--triplex-next-Button-General_Background_Default)
    General_Background_Disabled: [{ ref: "Brand.90" }, { ref: "Neutral.0" }], // var(--triplex-next-Button-General_Background_Disabled)
    General_Background_Hover: [{ ref: "Brand.50" }, { ref: "Brand.30" }], // var(--triplex-next-Button-General_Background_Hover)
    General_Color_Default: [{ ref: "Neutral.100" }, { ref: "Neutral.90" }], // var(--triplex-next-Button-General_Color_Default)
    General_Color_Disabled: [{ ref: "Neutral.100" }, { ref: "Neutral.90" }], // var(--triplex-next-Button-General_Color_Disabled)
    General_Color_Hover: [{ ref: "Neutral.100" }, { ref: "Neutral.90" }], // var(--triplex-next-Button-General_Color_Hover)
};
