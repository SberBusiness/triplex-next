import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента FooterPage.
export const designTokensComponentsFooterPageKeys = ["StickyShadow"] as const;
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
    StickyShadow: [{ value: "0 -2px 7px 0 rgba(31, 31, 34, 0.08)" }, { value: "0 -2px 7px 0 rgba(0, 0, 0, 0.35)" }], // var(--triplex-next-FooterPage-StickyShadow)
};
