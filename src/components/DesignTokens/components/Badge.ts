import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Badge.
export const designTokensComponentsBadgeKeys = ["Background"] as const;
// Тип, содержащий названия токенов компонента Badge.
export type TDesignTokensComponentsBadgeKeys = (typeof designTokensComponentsBadgeKeys)[number];
// Тип, содержащий названия токенов компонента Badge и их значения.
export type TDesignTokensComponentsBadgeValue = Record<TDesignTokensComponentsBadgeKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Badge и их значения в светлой и темной теме.
export type TDesignTokensComponentsBadgeValues = Record<TDesignTokensComponentsBadgeKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Badge.
export type TDesignTokensComponentsBadge = { Badge: TDesignTokensComponentsBadgeValue };

// Токены компонента Badge в светлой и темной темах.
export const Badge_Tokens: TDesignTokensComponentsBadgeValues = {
    Background: [{ ref: "ColorWarning.70" }, { ref: "ColorWarning.70" }], // var(--triplex-next-Badge-Background)
};
