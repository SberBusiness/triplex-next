import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента ListMaster.
export const designTokensComponentsListMasterKeys = [
    "Background",
    "Footer_Color",
    "Footer_Background",
    "Header_Background",
    "Header_Color",
] as const;
// Тип, содержащий названия токенов компонента ListMaster.
export type TDesignTokensComponentsListMasterKeys = (typeof designTokensComponentsListMasterKeys)[number];
// Тип, содержащий названия токенов компонента ListMaster и их значения.
export type TDesignTokensComponentsListMasterValue = Record<TDesignTokensComponentsListMasterKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента ListMaster и их значения в светлой и темной теме.
export type TDesignTokensComponentsListMasterValues = Record<TDesignTokensComponentsListMasterKeys, TDesignTokenValues>;
// Тип локальных токенов компонента ListMaster.
export type TDesignTokensComponentsListMaster = { ListMaster: TDesignTokensComponentsListMasterValue };

// Токены компонента ListMaster в светлой и темной темах.
export const ListMaster_Tokens: TDesignTokensComponentsListMasterValues = {
    Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.0" }], // var(--triplex-next-ListMaster-Background)
    Footer_Background: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-ListMaster-Footer_Background)
    Footer_Color: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.100" }], // var(--triplex-next-ListMaster-Footer_Color)
    Header_Background: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-ListMaster-Header_Background)
    Header_Color: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.100" }], // var(--triplex-next-ListMaster-Header_Color)
};
