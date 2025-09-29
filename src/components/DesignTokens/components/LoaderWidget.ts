import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента LoaderWidget.
export const designTokensComponentsLoaderWidgetKeys = [
    "Small_Backdrop_Default",
    "Middle_Backdrop_Default",
    "Middle_Background_Default",
] as const;
// Тип, содержащий названия токенов компонента LoaderWidget.
export type TDesignTokensComponentsLoaderWidgetKeys = (typeof designTokensComponentsLoaderWidgetKeys)[number];
// Тип, содержащий названия токенов компонента LoaderWidget и их значения.
export type TDesignTokensComponentsLoaderWidgetValue = Record<
    TDesignTokensComponentsLoaderWidgetKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента LoaderWidget и их значения в светлой и темной теме.
export type TDesignTokensComponentsLoaderWidgetValues = Record<
    TDesignTokensComponentsLoaderWidgetKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента LoaderWidget.
export type TDesignTokensComponentsLoaderWidget = { LoaderWidget: TDesignTokensComponentsLoaderWidgetValue };

// Токены компонента LoaderWidget в светлой и темной темах.
export const LoaderWidget_Tokens: TDesignTokensComponentsLoaderWidgetValues = {
    Small_Backdrop_Default: [{ value: "rgba(255, 255, 255, .8)" }, { value: "rgba(24, 24, 25, .8)" }], // var(--triplex-next-LoaderWidget-Small_Backdrop_Default)
    Middle_Backdrop_Default: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.20" }], // var(--triplex-next-LoaderWidget-Middle_Backdrop_Default)
    Middle_Background_Default: [{ ref: "ColorNeutral.80" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-LoaderWidget-Middle_Background_Default)
};
