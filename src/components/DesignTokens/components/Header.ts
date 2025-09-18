import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sber-business/triplex/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента Header.
export const designTokensComponentsHeaderKeys = ["Background", "Title_Color", "TitleSubhead_Color"] as const;
// Тип, содержащий названия токенов компонента Header.
export type TDesignTokensComponentsHeaderKeys = (typeof designTokensComponentsHeaderKeys)[number];
// Тип, содержащий названия токенов компонента Header и их значения.
export type TDesignTokensComponentsHeaderValue = Record<TDesignTokensComponentsHeaderKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Header и их значения в светлой и темной теме.
export type TDesignTokensComponentsHeaderValues = Record<TDesignTokensComponentsHeaderKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Header.
export type TDesignTokensComponentsHeader = { Header: TDesignTokensComponentsHeaderValue };

// Токены компонента Header в светлой и темной темах.
export const Header_Tokens: TDesignTokensComponentsHeaderValues = {
    Background: [{ ref: "Neutral.100" }, { ref: "Basic.700" }], // var(--triplex-Header-Background)
    Title_Color: [{ ref: "Basic.700" }, { ref: "Neutral.100" }], // var(--triplex-Header-Title_Color)
    TitleSubhead_Color: [{ ref: "Neutral.900" }, { ref: "Neutral.900" }], // var(--triplex-Header-TitleSubhead_Color)
};
