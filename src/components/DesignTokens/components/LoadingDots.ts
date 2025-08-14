import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента LoadingDots.
export const designTokensComponentsLoadingDotsKeys = [
    "General_Background_Default",
    "Secondary_Background_Default",
] as const;
// Тип, содержащий названия токенов компонента LoadingDots.
export type TDesignTokensComponentsLoadingDotsKeys = (typeof designTokensComponentsLoadingDotsKeys)[number];
// Тип, содержащий названия токенов компонента LoadingDots и их значения.
export type TDesignTokensComponentsLoadingDotsValue = Record<TDesignTokensComponentsLoadingDotsKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента LoadingDots и их значения в светлой и темной теме.
export type TDesignTokensComponentsLoadingDotsValues = Record<
    TDesignTokensComponentsLoadingDotsKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента LoadingDots.
export type TDesignTokensComponentsLoadingDots = { LoadingDots: TDesignTokensComponentsLoadingDotsValue };

// Токены компонента LoadingDots в светлой и темной темах.
export const LoadingDots_Tokens: TDesignTokensComponentsLoadingDotsValues = {
    General_Background_Default: [{ ref: "ColorBasicAlpha.0" }, { ref: "ColorBasicAlpha.0" }], // var(--triplex-next-LoadingDots-General_Background_Default)
    Secondary_Background_Default: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-LoadingDots-Secondary_Background_Default)
};
