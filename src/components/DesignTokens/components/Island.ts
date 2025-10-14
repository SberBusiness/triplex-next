import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Island.
export const designTokensComponentsIslandKeys = ["Background"] as const;
// Тип, содержащий названия токенов компонента Island.
export type TDesignTokensComponentsIslandKeys = (typeof designTokensComponentsIslandKeys)[number];
// Тип, содержащий названия токенов компонента Island и их значения.
export type TDesignTokensComponentsIslandValue = Record<TDesignTokensComponentsIslandKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Island и их значения в светлой и темной теме.
export type TDesignTokensComponentsIslandValues = Record<TDesignTokensComponentsIslandKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Island.
export type TDesignTokensComponentsIsland = { Island: TDesignTokensComponentsIslandValue };

// Токены компонента Island в светлой и темной темах.
export const Island_Tokens: TDesignTokensComponentsIslandValues = {
    Background: [{ ref: "ColorDarkNeutral.0" }, { value: "#fff" }], // var(--triplex-next-Island-Background)
};
