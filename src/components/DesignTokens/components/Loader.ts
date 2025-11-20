import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Loader.
export const designTokensComponentsLoaderKeys = [
    "Element_Background_Neutral",
    "Element_Background_Brand",

    "Middle_Background_Default",
] as const;
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
    Element_Background_Brand: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-Loader-Element_Background_Brand)
    Element_Background_Neutral: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Loader-Element_Background_Neutral)

    Middle_Background_Default: [{ ref: "ColorNeutral.80" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Loader-Middle_Background_Default)
};
