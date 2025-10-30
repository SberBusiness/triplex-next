import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента HeaderPage.
export const designTokensComponentsHeaderPageKeys = ["StickyShadow"] as const;
// Тип, содержащий названия токенов компонента HeaderPage.
export type TDesignTokensComponentsHeaderPageKeys = (typeof designTokensComponentsHeaderPageKeys)[number];
// Тип, содержащий названия токенов компонента HeaderPage и их значения.
export type TDesignTokensComponentsHeaderPageValue = Record<TDesignTokensComponentsHeaderPageKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента HeaderPage и их значения в светлой и темной теме.
export type TDesignTokensComponentsHeaderPageValues = Record<TDesignTokensComponentsHeaderPageKeys, TDesignTokenValues>;
// Тип локальных токенов компонента HeaderPage.
export type TDesignTokensComponentsHeaderPage = { HeaderPage: TDesignTokensComponentsHeaderPageValue };

// Токены компонента HeaderPage в светлой и темной темах.
export const HeaderPage_Tokens: TDesignTokensComponentsHeaderPageValues = {
    StickyShadow: [{ value: "0 2px 7px 0 rgba(31, 31, 34, 0.08)" }, { value: "0 2px 7px 0 rgba(0, 0, 0, 0.35)" }], // var(--triplex-next-HeaderPage-StickyShadow)
};
