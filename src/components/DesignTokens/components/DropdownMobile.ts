import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента DropdownMobile.
export const designTokensComponentsDropdownMobileKeys = [
    "Backdrop",
    "Border_Color",
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
    Backdrop: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorDarkNeutralAlpha.20" }], // var(--triplex-next-DropdownMobile-Backdrop)
    Border_Color: [{ ref: "ColorNeutral.20" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-DropdownMobile-Border_Color)
    Content_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-DropdownMobile-Content_Background)
    Footer_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-DropdownMobile-Footer_Background)
    Header_Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-DropdownMobile-Header_Background)
};
