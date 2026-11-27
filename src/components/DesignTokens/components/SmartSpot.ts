import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента SmartSpot.
export const designTokensComponentsSmartSpotKeys = ["Background"] as const;
// Тип, содержащий названия токенов компонента SmartSpot.
export type TDesignTokensComponentsSmartSpotKeys = (typeof designTokensComponentsSmartSpotKeys)[number];
// Тип, содержащий названия токенов компонента SmartSpot и их значения.
export type TDesignTokensComponentsSmartSpotValue = Record<TDesignTokensComponentsSmartSpotKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента SmartSpot и их значения в светлой и темной теме.
export type TDesignTokensComponentsSmartSpotValues = Record<TDesignTokensComponentsSmartSpotKeys, TDesignTokenValues>;
// Тип локальных токенов компонента SmartSpot.
export type TDesignTokensComponentsSmartSpot = { SmartSpot: TDesignTokensComponentsSmartSpotValue };

// Токены компонента SmartSpot в светлой и темной темах.
export const SmartSpot_Tokens: TDesignTokensComponentsSmartSpotValues = {
    Background: [{ ref: "ColorSuccess.50" }, { ref: "ColorSuccess.50" }], // var(--triplex-next-SmartSpot-Background)
};
