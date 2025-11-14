import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Tag.
export const designTokensComponentsTagKeys = ["Background"] as const;
// Тип, содержащий названия токенов компонента Tag.
export type TDesignTokensComponentsTagKeys = (typeof designTokensComponentsTagKeys)[number];
// Тип, содержащий названия токенов компонента Tag и их значения.
export type TDesignTokensComponentsTagValue = Record<TDesignTokensComponentsTagKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Tag и их значения в светлой и темной теме.
export type TDesignTokensComponentsTagValues = Record<TDesignTokensComponentsTagKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Tag.
export type TDesignTokensComponentsTag = { Tag: TDesignTokensComponentsTagValue };

// Токены компонента Tag в светлой и темной темах.
export const Tag_Tokens: TDesignTokensComponentsTagValues = {
    Background: [{ ref: "ColorNeutral.40" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-Tag-Background)
};
