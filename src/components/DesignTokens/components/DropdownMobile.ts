import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sber-business/triplex/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента DropdownMobile.
export const designTokensComponentsDropdownMobileKeys = [
    "Backdrop",
    "Border_Color",
    "Opacity",
    "Content_Background",
    "Footer_Background",
    "Header_Background",
] as const;
// Тип, содержащий названия токенов компонента DropdownMobile.
export type TDesignTokensComponentsDropdownMobileKeys = (typeof designTokensComponentsDropdownMobileKeys)[number];
// Тип, содержащий названия токенов компонента DropdownMobile и их значения.
export type TDesignTokensComponentsDropdownMobileValue = Record<
    TDesignTokensComponentsDropdownMobileKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента DropdownMobile и их значения в светлой и темной теме.
export type TDesignTokensComponentsDropdownMobileValues = Record<
    TDesignTokensComponentsDropdownMobileKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента DropdownMobile.
export type TDesignTokensComponentsDropdownMobile = { DropdownMobile: TDesignTokensComponentsDropdownMobileValue };

// Токены компонента DropdownMobile в светлой и темной темах.
export const DropdownMobile_Tokens: TDesignTokensComponentsDropdownMobileValues = {
    Backdrop: [{ ref: "Basic.700" }, { ref: "Basic.900" }], // var(--triplex-DropdownMobile-Backdrop)
    Border_Color: [{ ref: "Neutral.500" }, { ref: "Basic.300" }], // var(--triplex-DropdownMobile-Border_Color)
    Content_Background: [{ ref: "Basic.100" }, { ref: "Basic.500" }], // var(--triplex-DropdownMobile-Content_Background)
    Footer_Background: [{ ref: "Basic.100" }, { ref: "Basic.500" }], // var(--triplex-DropdownMobile-Footer_Background)
    Header_Background: [{ ref: "Neutral.100" }, { ref: "Basic.700" }], // var(--triplex-DropdownMobile-Header_Background)
    Opacity: [{ value: "0.6" }, { value: "0.8" }], // var(--triplex-DropdownMobile-Opacity)
};
