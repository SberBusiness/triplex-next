import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента TopOverlay.
export const designTokensComponentsTopOverlayKeys = ["Background"] as const;
// Тип, содержащий названия токенов компонента TopOverlay.
export type TDesignTokensComponentsTopOverlayKeys = (typeof designTokensComponentsTopOverlayKeys)[number];
// Тип, содержащий названия токенов компонента TopOverlay и их значения.
export type TDesignTokensComponentsTopOverlayValue = Record<TDesignTokensComponentsTopOverlayKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента TopOverlay и их значения в светлой и темной теме.
export type TDesignTokensComponentsTopOverlayValues = Record<TDesignTokensComponentsTopOverlayKeys, TDesignTokenValues>;
// Тип локальных токенов компонента TopOverlay.
export type TDesignTokensComponentsTopOverlay = { TopOverlay: TDesignTokensComponentsTopOverlayValue };

// Токены компонента TopOverlay в светлой и темной темах.
export const TopOverlay_Tokens: TDesignTokensComponentsTopOverlayValues = {
    Background: [{ ref: "ColorDarkNeutralAlpha.50" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-TopOverlay-Background)
};
