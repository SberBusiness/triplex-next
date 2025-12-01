import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Divider.
export const designTokensComponentsDividerKeys = ["Background"] as const;
// Тип, содержащий названия токенов компонента Divider.
export type TDesignTokensComponentsDividerKeys = (typeof designTokensComponentsDividerKeys)[number];
// Тип, содержащий названия токенов компонента Divider и их значения.
export type TDesignTokensComponentsDividerValue = Record<TDesignTokensComponentsDividerKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Divider и их значения в светлой и темной теме.
export type TDesignTokensComponentsDividerValues = Record<TDesignTokensComponentsDividerKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Divider.
export type TDesignTokensComponentsDivider = { Divider: TDesignTokensComponentsDividerValue };

// Токены компонента Divider в светлой и темной темах.
export const Divider_Tokens: TDesignTokensComponentsDividerValues = {
    Background: [{ ref: "ColorNeutral.20" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-Divider-Background)
};
