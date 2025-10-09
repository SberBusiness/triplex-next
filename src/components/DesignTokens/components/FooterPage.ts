import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента FooterPage.
export const designTokensComponentsFooterPageKeys = ["Background"] as const;
// Тип, содержащий названия токенов компонента FooterPage.
export type TDesignTokensComponentsFooterPageKeys = (typeof designTokensComponentsFooterPageKeys)[number];
// Тип, содержащий названия токенов компонента FooterPage и их значения.
export type TDesignTokensComponentsFooterPageValue = Record<TDesignTokensComponentsFooterPageKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента FooterPage и их значения в светлой и темной теме.
export type TDesignTokensComponentsFooterPageValues = Record<TDesignTokensComponentsFooterPageKeys, TDesignTokenValues>;
// Тип локальных токенов компонента FooterPage.
export type TDesignTokensComponentsFooterPage = { FooterPage: TDesignTokensComponentsFooterPageValue };

// Токены компонента FooterPage в светлой и темной темах.
export const FooterPage_Tokens: TDesignTokensComponentsFooterPageValues = {
    Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.40" }], // var(--triplex-next-FooterPage-Background)
};
