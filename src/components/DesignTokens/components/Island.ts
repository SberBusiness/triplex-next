import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Island.
export const designTokensComponentsIslandKeys = [
    "Type1_Background",
    "Type2_Background",
    "Type3_Background",
    "Type1_Shadow",
    "Type2_Shadow",
    "Type3_Shadow",
] as const;
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
    Type1_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.40" }], // var(--triplex-next-Island-Type1_Background)
    Type2_Background: [{ ref: "ColorNeutralAlpha.70" }, { ref: "ColorDarkNeutralAlpha.50" }], // var(--triplex-next-Island-Type2_Background)
    Type3_Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.30" }], // var(--triplex-next-Island-Type3_Background)
    Type1_Shadow: [{ value: "none" }, { value: "none" }], // var(--triplex-next-Island-Type1_Shadow)
    Type2_Shadow: [{ value: "0 0 0 1px #FFFFFF inset" }, { value: "0 0 0 1px #19BDB0 inset" }], // var(--triplex-next-Island-Type2_Shadow)
    Type3_Shadow: [{ value: "none" }, { value: "none" }], // var(--triplex-next-Island-Type3_Shadow)
};
