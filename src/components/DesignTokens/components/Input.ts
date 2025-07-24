import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Input.
export const designTokensComponentsInputKeys = [
    "Background_Default",

    "BorderColor_Default",

    "Caret_Color",
    "Color_Default",
] as const;
// Тип, содержащий названия токенов компонента Input.
export type TDesignTokensComponentsInputKeys = (typeof designTokensComponentsInputKeys)[number];
// Тип, содержащий названия токенов компонента Input и их значения.
export type TDesignTokensComponentsInputValue = Record<TDesignTokensComponentsInputKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Input и их значения в светлой и темной теме.
export type TDesignTokensComponentsInputValues = Record<TDesignTokensComponentsInputKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Input.
export type TDesignTokensComponentsInput = { Input: TDesignTokensComponentsInputValue };

// Токены компонента Input в светлой и темной темах.
export const Input_Tokens: TDesignTokensComponentsInputValues = {
    Background_Default: [{ ref: "ColorNeutral.100" }, { value: "none" }],

    BorderColor_Default: [{ ref: "ColorNeutral.40" }, { ref: "ColorNeutral.70" }],

    Caret_Color: [{ ref: "ColorDarkNeutral.30" }, { ref: "ColorNeutralAlpha.90" }],
    Color_Default: [{ ref: "ColorDarkNeutral.30" }, { ref: "ColorNeutralAlpha.90" }],
};
