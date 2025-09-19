import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sber-business/triplex/components/DesignTokens/types/DesignTokenTypes";

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
    Background: [{ ref: "Basic.100" }, { ref: "Basic.900" }], // var(--triplex-ListMaster-Background)
    Footer_Background: [{ ref: "Neutral.300" }, { ref: "Basic.700" }], // var(--triplex-ListMaster-Footer_Background)
    Footer_Color: [{ ref: "Basic.700" }, { ref: "Neutral.100" }], // var(--triplex-ListMaster-Footer_Color)
    Header_Background: [{ ref: "Neutral.300" }, { ref: "Basic.500" }], // var(--triplex-ListMaster-Header_Background)
    Header_Color: [{ ref: "Basic.700" }, { ref: "Neutral.100" }], // var(--triplex-ListMaster-Header_Color)
};
