import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента IslandWidget.
export const designTokensComponentsIslandWidgetKeys = ["ExtraFooter_Background", "ExtraFooter_Shadow"] as const;
// Тип, содержащий названия токенов компонента IslandWidget.
export type TDesignTokensComponentsIslandWidgetKeys = (typeof designTokensComponentsIslandWidgetKeys)[number];
// Тип, содержащий названия токенов компонента IslandWidget и их значения.
export type TDesignTokensComponentsIslandWidgetValue = Record<
    TDesignTokensComponentsIslandWidgetKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента IslandWidget и их значения в светлой и темной теме.
export type TDesignTokensComponentsIslandWidgetValues = Record<
    TDesignTokensComponentsIslandWidgetKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента IslandWidget.
export type TDesignTokensComponentsIslandWidget = { IslandWidget: TDesignTokensComponentsIslandWidgetValue };

// Токены компонента IslandWidget в светлой и темной темах.
export const IslandWidget_Tokens: TDesignTokensComponentsIslandWidgetValues = {
    ExtraFooter_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.40" }], // var(--triplex-next-IslandWidget-ExtraFooter_Background)
    ExtraFooter_Shadow: [
        { value: "0 8px 7px -6px rgba(31, 31, 34, 0.08)" },
        { value: "0 8px 7px -6px rgba(0, 0, 0, 0.35)" },
    ], // var(--triplex-next-IslandWidget-ExtraFooter_Shadow)
};
