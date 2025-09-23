import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Body.
export const designTokensComponentsBodyKeys = ['Background'] as const;
// Тип, содержащий названия токенов компонента Body.
export type TDesignTokensComponentsBodyKeys = (typeof designTokensComponentsBodyKeys)[number];
// Тип, содержащий названия токенов компонента Body и их значения.
export type TDesignTokensComponentsBodyValue = Record<TDesignTokensComponentsBodyKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Body и их значения в светлой и темной теме.
export type TDesignTokensComponentsBodyValues = Record<TDesignTokensComponentsBodyKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Body.
export type TDesignTokensComponentsBody = {Body: TDesignTokensComponentsBodyValue};

// Токены компонента Body в светлой и темной темах.
export const Body_Tokens: TDesignTokensComponentsBodyValues = {
    Background: [{ref: 'ColorBrand.40'}, {ref: 'ColorBrand.60'}], // var(--triplex-next-Body-Background)
};
