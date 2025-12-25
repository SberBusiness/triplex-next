import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента TagColor.
export const designTokensComponentsTagColorKeys = [
    "Background_Default",
    "Background_Success",
    "Background_Info",
    "Background_Warning",
    "Background_Error",
] as const;
// Тип, содержащий названия токенов компонента TagColor.
export type TDesignTokensComponentsTagColorKeys = (typeof designTokensComponentsTagColorKeys)[number];
// Тип, содержащий названия токенов компонента TagColor и их значения.
export type TDesignTokensComponentsTagColorValue = Record<TDesignTokensComponentsTagColorKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента TagColor и их значения в светлой и темной теме.
export type TDesignTokensComponentsTagColorValues = Record<TDesignTokensComponentsTagColorKeys, TDesignTokenValues>;
// Тип локальных токенов компонента TagColor.
export type TDesignTokensComponentsTagColor = { TagColor: TDesignTokensComponentsTagColorValue };

// Токены компонента TagColor в светлой и темной темах.
export const TagColor_Tokens: TDesignTokensComponentsTagColorValues = {
    Background_Default: [{ ref: "ColorSystem.100" }, { ref: "ColorSystem.80" }], // var(--triplex-next-TagColor-Background_Default)
    Background_Success: [{ ref: "ColorBrand.100" }, { ref: "ColorBrand.70" }], // var(--triplex-next-TagColor-Background_Success)
    Background_Info: [{ ref: "ColorInfo.100" }, { ref: "ColorInfo.80" }], // var(--triplex-next-TagColor-Background_Info)
    Background_Warning: [{ ref: "ColorWarning.100" }, { ref: "ColorWarning.80" }], // var(--triplex-next-TagColor-Background_Warning)
    Background_Error: [{ ref: "ColorError.100" }, { ref: "ColorError.80" }], // var(--triplex-next-TagColor-Background_Error)
};
