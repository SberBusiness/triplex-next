import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Loader.
export const designTokensComponentsLoaderKeys = ["Neutral_Background_Default", "Brand_Background_Default"] as const;
// Тип, содержащий названия токенов компонента Loader.
export type TDesignTokensComponentsLoaderKeys = (typeof designTokensComponentsLoaderKeys)[number];
// Тип, содержащий названия токенов компонента Loader и их значения.
export type TDesignTokensComponentsLoaderValue = Record<TDesignTokensComponentsLoaderKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Loader и их значения в светлой и темной теме.
export type TDesignTokensComponentsLoaderValues = Record<TDesignTokensComponentsLoaderKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Loader.
export type TDesignTokensComponentsLoader = { Loader: TDesignTokensComponentsLoaderValue };

// Токены компонента Loader в светлой и темной темах.
export const Loader_Tokens: TDesignTokensComponentsLoaderValues = {
    Neutral_Background_Default: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Loader-Neutral_Background_Default)
    Brand_Background_Default: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-Loader-Brand_Background_Default)
};
