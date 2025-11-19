import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента LoaderScreen.
export const designTokensComponentsLoaderScreenKeys = [
    "Small_Backdrop_Default",
    "Middle_Backdrop_Default",
    "Middle_Background_Default",
] as const;
// Тип, содержащий названия токенов компонента LoaderScreen.
export type TDesignTokensComponentsLoaderScreenKeys = (typeof designTokensComponentsLoaderScreenKeys)[number];
// Тип, содержащий названия токенов компонента LoaderScreen и их значения.
export type TDesignTokensComponentsLoaderScreenValue = Record<
    TDesignTokensComponentsLoaderScreenKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента LoaderScreen и их значения в светлой и темной теме.
export type TDesignTokensComponentsLoaderScreenValues = Record<
    TDesignTokensComponentsLoaderScreenKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента LoaderScreen.
export type TDesignTokensComponentsLoaderScreen = { LoaderScreen: TDesignTokensComponentsLoaderScreenValue };

// Токены компонента LoaderScreen в светлой и темной темах.
export const LoaderScreen_Tokens: TDesignTokensComponentsLoaderScreenValues = {
    Small_Backdrop_Default: [{ ref: "ColorNeutralAlpha.30" }, { ref: "ColorDarkNeutralAlpha.30" }], // var(--triplex-next-LoaderScreen-Small_Backdrop_Default)
    Middle_Backdrop_Default: [{ ref: "ColorNeutralAlpha.30" }, { ref: "ColorDarkNeutralAlpha.30" }], // var(--triplex-next-LoaderScreen-Middle_Backdrop_Default)
    Middle_Background_Default: [{ ref: "ColorNeutral.80" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-LoaderScreen-Middle_Background_Default)
};
