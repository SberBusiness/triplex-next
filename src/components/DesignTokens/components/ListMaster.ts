import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента ListMaster.
export const designTokensComponentsListMasterKeys = [
    "Background",
    "Footer_Background",
    "Footer_Shadow",
    "Header_Background",
    "Header_Shadow",
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
    Footer_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-ListMaster-Footer_Background)
    Footer_Shadow: [{ value: "0 -2px 7px 0 rgba(31, 31, 34, 0.08)" }, { value: "0 -2px 7px 0 rgba(0, 0, 0, 0.35)" }], // var(--triplex-next-ListMaster-Footer_Shadow)
    Header_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-ListMaster-Header_Background)
    Header_Shadow: [{ value: "0 2px 7px 0 rgba(31, 31, 34, 0.08)" }, { value: "0 2px 7px 0 rgba(0, 0, 0, 0.35)" }], // var(--triplex-next-ListMaster-Header_Shadow)
};
