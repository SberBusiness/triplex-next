import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sber-business/triplex/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента Footer.
export const designTokensComponentsFooterKeys = ["Background", "Color"] as const;
// Тип, содержащий названия токенов компонента Footer.
export type TDesignTokensComponentsFooterKeys = (typeof designTokensComponentsFooterKeys)[number];
// Тип, содержащий названия токенов компонента Footer и их значения.
export type TDesignTokensComponentsFooterValue = Record<TDesignTokensComponentsFooterKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Footer и их значения в светлой и темной теме.
export type TDesignTokensComponentsFooterValues = Record<TDesignTokensComponentsFooterKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Footer.
export type TDesignTokensComponentsFooter = { Footer: TDesignTokensComponentsFooterValue };

// Токены компонента Footer в светлой и темной темах.
export const Footer_Tokens: TDesignTokensComponentsFooterValues = {
    Background: [{ ref: "Neutral.100" }, { ref: "Basic.700" }], // var(--triplex-Footer-Background)
    Color: [{ ref: "Basic.700" }, { ref: "Neutral.100" }], // var(--triplex-Footer-Color)
};
