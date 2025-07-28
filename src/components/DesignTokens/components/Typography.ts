import {TDesignTokenValue, TDesignTokenValues} from '../types/DesignTokenTypes';

// Название токенов компонента Typography.
export const designTokensComponentsTypographyKeys = [
    'Primary_Color',
    'Complementary_Color',
    'Secondary_Color',
    'Tertiary_Color',
    'Disabled_Color',
    'Brand_Color',
    'Info_Color',
    'Success_Color',
    'Error_Color',
    'Warning_Color'
] as const;
// Тип, содержащий названия токенов компонента Typography.
export type TDesignTokensComponentsTypographyKeys = (typeof designTokensComponentsTypographyKeys)[number];
// Тип, содержащий названия токенов компонента Typography и их значения.
export type TDesignTokensComponentsTypographyValue = Record<TDesignTokensComponentsTypographyKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Typography и их значения в светлой и темной теме.
export type TDesignTokensComponentsTypographyValues = Record<TDesignTokensComponentsTypographyKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Typography.
export type TDesignTokensComponentsTypography = {Typography: TDesignTokensComponentsTypographyValue};

// Токены компонента Typography в светлой и темной темах.
export const Typography_Tokens: TDesignTokensComponentsTypographyValues = {
    Primary_Color: [{ref: 'ColorDarkBasicAlpha.0'}, {ref: 'ColorBasicAlpha.0'}], // var(--triplex-next-Typography-Primary_Color)
    Complementary_Color: [{ref: 'ColorDarkBasicAlpha.40'}, {ref: 'ColorBasicAlpha.40'}], // var(--triplex-next-Typography-Complementary_Color)
    Secondary_Color: [{ref: 'ColorDarkBasicAlpha.60'}, {ref: 'ColorBasicAlpha.60'}], // var(--triplex-next-Typography-Secondary_Color)
    Tertiary_Color: [{ref: 'ColorDarkBasicAlpha.70'}, {ref: 'ColorBasicAlpha.70'}], // var(--triplex-next-Typography-Tertiary_Color)
    Disabled_Color: [{ref: 'ColorDarkBasicAlpha.90'}, {ref: 'ColorBasicAlpha.90'}], // var(--triplex-next-Typography-Disabled_Color)
    Brand_Color: [{ref: 'ColorBrand.40'}, {ref: 'ColorBrand.60'}], // var(--triplex-next-Typography-Brand_Color)
    Info_Color: [{ref: 'ColorInfo.40'}, {ref: 'ColorInfo.60'}], // var(--triplex-next-Typography-Info_Color)
    Success_Color: [{ref: 'ColorSuccess.40'}, {ref: 'ColorSuccess.60'}], // var(--triplex-next-Typography-Success_Color)
    Error_Color: [{ref: 'ColorError.40'}, {ref: 'ColorError.60'}], // var(--triplex-next-Typography-Error_Color)
    Warning_Color: [{ref: 'ColorWarning.40'}, {ref: 'ColorWarning.60'}], // var(--triplex-next-Typography-Warning_Color)
};