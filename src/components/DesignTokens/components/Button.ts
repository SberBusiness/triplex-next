import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Button.
export const designTokensComponentsButtonKeys = [
    "General_Background_Active",
    "General_Background_Default",
    "General_Background_Disabled",
    "General_Background_Hover",
    "General_Caret_Color_Default",
    "General_Caret_Color_Disabled",
    "General_Color_Active",
    "General_Color_Default",
    "General_Color_Disabled",
    "General_Color_Hover",
    "General_Shadow_Focus",
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
    General_Background_Active: [{ ref: "Primary.900" }, { ref: "Primary.300" }], // var(--triplex-next-Button-General_Background_Active)
    General_Background_Default: [{ ref: "Primary.700" }, { ref: "Primary.500" }], // var(--triplex-next-Button-General_Background_Default)
    General_Background_Disabled: [{ ref: "Primary.300" }, { ref: "Basic.300" }], // var(--triplex-next-Button-General_Background_Disabled)
    General_Background_Hover: [{ ref: "Primary.500" }, { ref: "Primary.700" }], // var(--triplex-next-Button-General_Background_Hover)
    General_Caret_Color_Default: [{ ref: "Basic.100" }, { ref: "Basic.100" }], // var(--triplex-next-Button-General_Caret_Color_Default)
    General_Caret_Color_Disabled: [{ ref: "Basic.100" }, { ref: "Neutral.900" }], // var(--triplex-next-Button-General_Caret_Color_Disabled)
    General_Color_Active: [{ ref: "Basic.100" }, { ref: "Neutral.100" }], // var(--triplex-next-Button-General_Color_Active)
    General_Color_Default: [{ ref: "Basic.100" }, { ref: "Neutral.100" }], // var(--triplex-next-Button-General_Color_Default)
    General_Color_Disabled: [{ ref: "Basic.100" }, { ref: "Neutral.900" }], // var(--triplex-next-Button-General_Color_Disabled)
    General_Color_Hover: [{ ref: "Basic.100" }, { ref: "Neutral.100" }], // var(--triplex-next-Button-General_Color_Hover)
    General_Shadow_Focus: [{ value: "0 0 0 1px #FFDD64 inset" }, { value: "0 0 0 1px #FFDD64 inset" }], // var(--triplex-next-Button-General_Shadow_Focus)
};
