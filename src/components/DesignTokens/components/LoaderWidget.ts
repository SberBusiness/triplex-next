import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента LoaderWidget.
export const designTokensComponentsLoaderWidgetKeys = ["Middle_Background_Default"] as const;
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
    Middle_Background_Default: [{ ref: "ColorNeutral.80" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-LoaderWidget-Middle_Background_Default)
};
