import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Input.
export const designTokensComponentsInputKeys = [
    "Background_Default",
    "Background_Disabled",

    "BorderColor_Default",
    "BorderColor_Disabled",
    "BorderColor_Error",
    "BorderColor_Focus",

    "Caret_Color",
    "Color_Default",
    "Color_Disabled",

    "Placeholder_Color",
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
    Background_Default: [{ ref: "Basic.100" }, { value: "none" }],
    Background_Disabled: [{ ref: "Neutral.100" }, { ref: "Basic.700" }],

    BorderColor_Default: [{ ref: "Neutral.500" }, { ref: "Neutral.900" }],
    BorderColor_Disabled: [{ ref: "Neutral.500" }, { ref: "Basic.300" }],
    BorderColor_Error: [{ ref: "Error.700" }, { ref: "Error.500" }],
    BorderColor_Focus: [{ ref: "Basic.700" }, { ref: "Neutral.700" }],

    Caret_Color: [{ ref: "Basic.700" }, { ref: "Neutral.100" }],
    Color_Default: [{ ref: "Basic.700" }, { ref: "Neutral.100" }],
    Color_Disabled: [{ ref: "Neutral.900" }, { ref: "Basic.300" }],

    Placeholder_Color: [{ ref: "Neutral.900" }, { ref: "Neutral.900" }],
};
