import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

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
    Background_Active: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.100" }], // var(--triplex-next-DropdownList-Background_Active)
    Background_Default: [{ value: "none" }, { value: "none" }], // var(--triplex-next-DropdownList-Background_Default)
    Background_Selected: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-DropdownList-Background_Selected)

    Color: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-DropdownList-Color)
};
