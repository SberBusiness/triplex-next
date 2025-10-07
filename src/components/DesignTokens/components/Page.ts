import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента Page.
export const designTokensComponentsPageKeys = ["Background"] as const;
// Тип, содержащий названия токенов компонента Page.
export type TDesignTokensComponentsPageKeys = (typeof designTokensComponentsPageKeys)[number];
// Тип, содержащий названия токенов компонента Page и их значения.
export type TDesignTokensComponentsPageValue = Record<TDesignTokensComponentsPageKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Page и их значения в светлой и темной теме.
export type TDesignTokensComponentsPageValues = Record<TDesignTokensComponentsPageKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Page.
export type TDesignTokensComponentsPage = { Page: TDesignTokensComponentsPageValue };

// Токены компонента Page в светлой и темной темах.
export const Page_Tokens: TDesignTokensComponentsPageValues = {
    Background: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.10" }], // var(--triplex-next-Page-Background)
};
