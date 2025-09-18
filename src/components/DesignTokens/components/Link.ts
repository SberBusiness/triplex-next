import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Link.
export const designTokensComponentsLinkKeys = [
    "BorderColor_Focus",

    "Text_Color_Active",
    "Text_Color_Default",
    "Text_Color_Hover",
] as const;
// Тип, содержащий названия токенов компонента Link.
export type TDesignTokensComponentsLinkKeys = (typeof designTokensComponentsLinkKeys)[number];
// Тип, содержащий названия токенов компонента Link и их значения.
export type TDesignTokensComponentsLinkValue = Record<TDesignTokensComponentsLinkKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Link и их значения в светлой и темной теме.
export type TDesignTokensComponentsLinkValues = Record<TDesignTokensComponentsLinkKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Link.
export type TDesignTokensComponentsLink = { Link: TDesignTokensComponentsLinkValue };

// Токены компонента Link в светлой и темной темах.
export const Link_Tokens: TDesignTokensComponentsLinkValues = {
    BorderColor_Focus: [{ value: "0 0 0 1px #FFD169 inset" }, { value: "0 0 0 1px #FFD169 inset" }], // var(--triplex-next-Link-BorderColor_Focus)

    Text_Color_Active: [{ ref: "ColorBrand.30" }, { ref: "ColorBrand.40" }], // var(--triplex-next-Link-Text-Color_Active)
    Text_Color_Default: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.60" }], // var(--triplex-next-Link-Text_Color_Default)
    Text_Color_Hover: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.70" }], // var(--triplex-next-Link-Text_Color_Hover)
};
