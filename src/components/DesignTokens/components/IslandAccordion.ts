import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента IslandAccordion.
export const designTokensComponentsIslandAccordionKeys = [
    "Type1_Header_Background_Hover",
    "Type2_Header_Background_Hover",
    "Type3_Header_Background_Hover",

    "Shadow_Focus",
] as const;
// Тип, содержащий названия токенов компонента IslandAccordion.
export type TDesignTokensComponentsIslandAccordionKeys = (typeof designTokensComponentsIslandAccordionKeys)[number];
// Тип, содержащий названия токенов компонента IslandAccordion и их значения.
export type TDesignTokensComponentsIslandAccordionValue = Record<
    TDesignTokensComponentsIslandAccordionKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента IslandAccordion и их значения в светлой и темной теме.
export type TDesignTokensComponentsIslandAccordionValues = Record<
    TDesignTokensComponentsIslandAccordionKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента IslandAccordion.
export type TDesignTokensComponentsIslandAccordion = { IslandAccordion: TDesignTokensComponentsIslandAccordionValue };

// Токены компонента IslandAccordion в светлой и темной темах.
export const IslandAccordion_Tokens: TDesignTokensComponentsIslandAccordionValues = {
    Type1_Header_Background_Hover: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-IslandAccordion-Type1_Header_Background_Hover)
    Type2_Header_Background_Hover: [{ ref: "ColorDarkNeutralAlpha.100" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-IslandAccordion-Type2_Header_Background_Hover)
    Type3_Header_Background_Hover: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-IslandAccordion-Type3_Header_Background_Hover)

    Shadow_Focus: [{ value: "0 0 0 1px #FFD169 inset" }, { value: "0 0 0 1px #FFD169 inset" }], // var(--triplex-next-IslandAccordion-Shadow_Focus)
};
