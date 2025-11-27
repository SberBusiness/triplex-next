import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sber-business/triplex/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента TopOverlay.
export const designTokensComponentsTopOverlayKeys = ["Background", "Color", "Shadow"] as const;
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
    Background: [{ ref: "Error.100" }, { ref: "Basic.700" }], // var(--triplex-TopOverlay-Background)
    Color: [{ ref: "Basic.700" }, { ref: "Neutral.100" }], // var(--triplex-TopOverlay-Color)
    Shadow: [{ value: "0 -1px 0 0 #C11030 inset" }, { value: "0 -1px 0 0 #DB1237 inset" }], // var(--triplex-TopOverlay-Shadow)
};
