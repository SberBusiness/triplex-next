import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента Dropdown.
export const designTokensComponentsDropdownKeys = ["Background", "Shadow"] as const;
// Тип, содержащий названия токенов компонента Dropdown.
export type TDesignTokensComponentsDropdownKeys = (typeof designTokensComponentsDropdownKeys)[number];
// Тип, содержащий названия токенов компонента Dropdown и их значения.
export type TDesignTokensComponentsDropdownValue = Record<TDesignTokensComponentsDropdownKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Dropdown и их значения в светлой и темной теме.
export type TDesignTokensComponentsDropdownValues = Record<TDesignTokensComponentsDropdownKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Dropdown.
export type TDesignTokensComponentsDropdown = { Dropdown: TDesignTokensComponentsDropdownValue };

// Токены компонента Dropdown в светлой и темной темах.
export const Dropdown_Tokens: TDesignTokensComponentsDropdownValues = {
    Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Dropdown-Background)
    Shadow: [{ value: "0px 2px 7px rgba(31, 31, 34, 0.25)" }, { value: "none" }], // var(--triplex-next-Dropdown-Shadow)
};
