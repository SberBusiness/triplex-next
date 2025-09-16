import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sber-business/triplex/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента DropdownList.
export const designTokensComponentsDropdownListKeys = [
    "Background_Active",
    "Background_Default",
    "Background_Selected",
    "Color",
] as const;
// Тип, содержащий названия токенов компонента DropdownList.
export type TDesignTokensComponentsDropdownListKeys = (typeof designTokensComponentsDropdownListKeys)[number];
// Тип, содержащий названия токенов компонента DropdownList и их значения.
export type TDesignTokensComponentsDropdownListValue = Record<
    TDesignTokensComponentsDropdownListKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента DropdownList и их значения в светлой и темной теме.
export type TDesignTokensComponentsDropdownListValues = Record<
    TDesignTokensComponentsDropdownListKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента DropdownList.
export type TDesignTokensComponentsDropdownList = { DropdownList: TDesignTokensComponentsDropdownListValue };

// Токены компонента DropdownList в светлой и темной темах.
export const DropdownList_Tokens: TDesignTokensComponentsDropdownListValues = {
    Background_Active: [{ ref: "Neutral.100" }, { ref: "Neutral.900" }], // var(--triplex-DropdownList-Background_Active)
    Background_Default: [{ value: "none" }, { value: "none" }], // var(--triplex-DropdownList-Background_Default)
    Background_Selected: [{ ref: "Neutral.500" }, { ref: "Basic.300" }], // var(--triplex-DropdownList-Background_Selected)

    Color: [{ ref: "Basic.700" }, { ref: "Neutral.100" }], // var(--triplex-DropdownList-Color)
};
