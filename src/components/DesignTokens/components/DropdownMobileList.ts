import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента DropdownMobileList.
export const designTokensComponentsDropdownMobileListKeys = ["Active_Background", "Selected_Background"] as const;
// Тип, содержащий названия токенов компонента DropdownMobileList.
export type TDesignTokensComponentsDropdownMobileListKeys =
    (typeof designTokensComponentsDropdownMobileListKeys)[number];
// Тип, содержащий названия токенов компонента DropdownMobileList и их значения.
export type TDesignTokensComponentsDropdownMobileListValue = Record<
    TDesignTokensComponentsDropdownMobileListKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента DropdownMobileList и их значения в светлой и темной теме.
export type TDesignTokensComponentsDropdownMobileListValues = Record<
    TDesignTokensComponentsDropdownMobileListKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента DropdownMobileList.
export type TDesignTokensComponentsDropdownMobileList = {
    DropdownMobileList: TDesignTokensComponentsDropdownMobileListValue;
};

// Токены компонента DropdownMobileList в светлой и темной темах.
export const DropdownMobileList_Tokens: TDesignTokensComponentsDropdownMobileListValues = {
    Active_Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.100" }], // var(--triplex-next-DropdownMobileList-Active_Background)
    Selected_Background: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-DropdownMobileList-Selected_Background)
};
