import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента FormField.
export const designTokensComponentsFormFieldKeys = [
    "Background_Active",
    "Background_Default",
    "Background_Disabled",
    "Background_Error",
    "Background_Error_Hover",
    "Background_Hover",
    "Background_Warning",
    "Background_Warning_Hover",

    "Input_Color_Default",
    "Input_Color_Disabled",
    
    "Target_Color_Default",
    "Target_Color_Disabled",
    "Target_PlaceholderColor_Default",

    "Label_Color_Default",
    "Label_Color_Disabled",

    "Shadow_Active",
    "Shadow_Default",
    "Shadow_Error_Active",
    "Shadow_Warning_Active",

    "Placeholder_Color",
] as const;
// Тип, содержащий названия токенов компонента FormField.
export type TDesignTokensComponentsFormFieldKeys = (typeof designTokensComponentsFormFieldKeys)[number];
// Тип, содержащий названия токенов компонента FormField и их значения.
export type TDesignTokensComponentsFormFieldValue = Record<TDesignTokensComponentsFormFieldKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента FormField и их значения в светлой и темной теме.
export type TDesignTokensComponentsFormFieldValues = Record<TDesignTokensComponentsFormFieldKeys, TDesignTokenValues>;
// Тип локальных токенов компонента FormField.
export type TDesignTokensComponentsFormField = { FormField: TDesignTokensComponentsFormFieldValue };

// Токены компонента FormField в светлой и темной темах.
export const FormField_Tokens: TDesignTokensComponentsFormFieldValues = {
    Background_Active: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-FormField-Background_Active)
    Background_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-FormField-Background_Default)
    Background_Disabled: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-FormField-Background_Disabled)
    Background_Error: [{ ref: "ColorError.100" }, { ref: "ColorError.0" }], // var(--triplex-next-FormField-Background_Error)
    Background_Error_Hover: [{ ref: "ColorError.90" }, { ref: "ColorError.10" }], // var(--triplex-next-FormField-Background_Error_Hover)
    Background_Hover: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.90" }], // var(--triplex-next-FormField-Background_Hover)
    Background_Warning: [{ ref: "ColorWarning.100" }, { ref: "ColorWarning.0" }], // var(--triplex-next-FormField-Background_Warning)
    Background_Warning_Hover: [{ ref: "ColorWarning.90" }, { ref: "ColorWarning.10" }], // var(--triplex-next-FormField-Background_Warning_Hover)

    Input_Color_Default: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-FormField-Input_Color_Default)
    Input_Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.60" }, { ref: "ColorNeutralAlpha.70" }], // var(--triplex-next-FormField-Input_Color_Disabled)

    Target_Color_Default: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-FormField-Target_Color_Default)
    Target_Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.60" }, { ref: "ColorNeutralAlpha.70" }], // var(--triplex-next-FormField-Target_Color_Disabled)
    Target_PlaceholderColor_Default: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-FormField-Target_PlaceholderColor_Default)
    
    Label_Color_Default: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-FormField-Label_Color_Default)
    Label_Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.60" }, { ref: "ColorNeutralAlpha.70" }], // var(--triplex-next-FormField-Label_Color_Disabled)

    Shadow_Active: [{ value: "0 0 0 1px #21A19A inset" }, { value: "0 0 0 1px #21A19A inset" }], // var(--triplex-next-FormField-Shadow_Active)
    Shadow_Default: [{ value: "none" }, { value: "none" }], // var(--triplex-next-FormField-Shadow_Default)
    Shadow_Error_Active: [{ value: "0 0 0 1px #E60037 inset" }, { value: "0 0 0 1px #E60037 inset" }], // var(--triplex-next-FormField-Shadow_Error_Active)
    Shadow_Warning_Active: [{ value: "0 0 0 1px #FD6508 inset" }, { value: "0 0 0 1px #FD6508 inset" }], // var(--triplex-next-FormField-Shadow_Warning_Active)
    Placeholder_Color: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-FormField-Placeholder_Color)
};
