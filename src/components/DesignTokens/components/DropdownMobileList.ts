import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sber-business/triplex/components/DesignTokens/types/DesignTokenTypes";

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
    Active_Background: [{ ref: "Neutral.100" }, { ref: "Neutral.900" }], // var(--triplex-DropdownMobileList-Active_Background)
    Selected_Background: [{ ref: "Neutral.500" }, { ref: "Basic.300" }], // var(--triplex-DropdownMobileList-Selected_Background)
};
