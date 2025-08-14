import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента FormField.
export const designTokensComponentsFormFieldKeys = [
    'Background_Active',
    'Background_Default',
    'Background_Disabled',
    'Background_Error',
    'Background_Hover',

    'Input_Color_Default',
    'Input_Color_Disabled',

    'Label_Color_Default',
    'Label_Color_Disabled',

    'Shadow_Active',
    'Shadow_Default',

    'Placeholder_Color',
] as const;
// Тип, содержащий названия токенов компонента FormField.
export type TDesignTokensComponentsFormFieldKeys = (typeof designTokensComponentsFormFieldKeys)[number];
// Тип, содержащий названия токенов компонента FormField и их значения.
export type TDesignTokensComponentsFormFieldValue = Record<TDesignTokensComponentsFormFieldKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента FormField и их значения в светлой и темной теме.
export type TDesignTokensComponentsFormFieldValues = Record<TDesignTokensComponentsFormFieldKeys, TDesignTokenValues>;
// Тип локальных токенов компонента FormField.
export type TDesignTokensComponentsFormField = {FormField: TDesignTokensComponentsFormFieldValue};

// Токены компонента FormField в светлой и темной темах.
export const FormField_Tokens: TDesignTokensComponentsFormFieldValues = {
    Background_Active: [{ref: 'ColorNeutral.80'}, {ref: 'ColorDarkNeutral.60'}], // var(--triplex-next-FormField-Background_Active)
    Background_Default: [{ref: 'ColorNeutral.90'}, {ref: 'ColorDarkNeutral.50'}], // var(--triplex-next-FormField-Background_Default)
    Background_Disabled: [{ref: 'ColorNeutral.70'}, {ref: 'ColorDarkNeutral.70'}], // var(--triplex-next-FormField-Background_Disabled)
    Background_Error: [{ref: 'ColorError.100'}, {ref: 'ColorError.0'}], // var(--triplex-next-FormField-Background_Error)
    Background_Hover: [{ref: 'ColorNeutral.80'}, {ref: 'ColorDarkNeutral.60'}], // var(--triplex-next-FormField-Background_Hover)

    Input_Color_Default: [{ref: 'ColorDarkBasicAlpha.0'}, {ref: 'ColorBasicAlpha.0'}], // var(--triplex-next-FormField-Input_Color_Default)
    Input_Color_Disabled: [{ref: 'ColorDarkBasicAlpha.90'}, {ref: 'ColorBasicAlpha.80'}], // var(--triplex-next-FormField-Input_Color_Disabled)

    Label_Color_Default: [{ref: 'ColorDarkBasicAlpha.60'}, {ref: 'ColorBasicAlpha.60'}], // var(--triplex-next-FormField-Label_Color_Default)
    Label_Color_Disabled: [{ref: 'ColorDarkBasicAlpha.90'}, {ref: 'ColorBasicAlpha.80'}], // var(--triplex-next-FormField-Label_Color_Disabled)

    Shadow_Active: [{value: '0 0 0 1px #21A19A inset'}, {value: '0 0 0 1px #21A19A inset'}], // var(--triplex-next-FormField-Shadow_Active)
    Shadow_Default: [{value: 'none'}, {value: 'none'}], // var(--triplex-next-FormField-Shadow_Default)

    Placeholder_Color: [{ref: 'ColorDarkBasicAlpha.60'}, {ref: 'ColorBasicAlpha.60'}], // var(--triplex-next-FormField-Placeholder_Color)
};
