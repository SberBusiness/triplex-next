import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Typography.
export const designTokensComponentsTypographyKeys = [
    "Primary_Color",
    "Complementary_Color",
    "Secondary_Color",
    "Tertiary_Color",
    "Disabled_Color",
    "Brand_Color",
    "Info_Color",
    "Success_Color",
    "Error_Color",
    "Warning_Color",
    "System_Color",

    "PrimaryInvert_Color",
    "ComplementaryInvert_Color",
    "SecondaryInvert_Color",
    "TertiaryInvert_Color",
    "DisabledInvert_Color",
    "BrandInvert_Color",
    "InfoInvert_Color",
    "SuccessInvert_Color",
    "ErrorInvert_Color",
    "WarningInvert_Color",
    "SystemInvert_Color",
] as const;
// Тип, содержащий названия токенов компонента Typography.
export type TDesignTokensComponentsTypographyKeys = (typeof designTokensComponentsTypographyKeys)[number];
// Тип, содержащий названия токенов компонента Typography и их значения.
export type TDesignTokensComponentsTypographyValue = Record<TDesignTokensComponentsTypographyKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Typography и их значения в светлой и темной теме.
export type TDesignTokensComponentsTypographyValues = Record<TDesignTokensComponentsTypographyKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Typography.
export type TDesignTokensComponentsTypography = { Typography: TDesignTokensComponentsTypographyValue };

// Токены компонента Typography в светлой и темной темах.
export const Typography_Tokens: TDesignTokensComponentsTypographyValues = {
    Primary_Color: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Typography-Primary_Color)
    Complementary_Color: [{ ref: "ColorDarkNeutralAlpha.20" }, { ref: "ColorNeutralAlpha.30" }], // var(--triplex-next-Typography-Complementary_Color)
    Secondary_Color: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-Typography-Secondary_Color)
    Tertiary_Color: [{ ref: "ColorDarkNeutralAlpha.50" }, { ref: "ColorNeutralAlpha.60" }], // var(--triplex-next-Typography-Tertiary_Color)
    Disabled_Color: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-Typography-Disabled_Color)
    Brand_Color: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.60" }], // var(--triplex-next-Typography-Brand_Color)
    Info_Color: [{ ref: "ColorInfo.40" }, { ref: "ColorInfo.60" }], // var(--triplex-next-Typography-Info_Color)
    Success_Color: [{ ref: "ColorSuccess.40" }, { ref: "ColorSuccess.60" }], // var(--triplex-next-Typography-Success_Color)
    Error_Color: [{ ref: "ColorError.40" }, { ref: "ColorError.60" }], // var(--triplex-next-Typography-Error_Color)
    Warning_Color: [{ ref: "ColorWarning.40" }, { ref: "ColorWarning.60" }], // var(--triplex-next-Typography-Warning_Color)
    System_Color: [{ ref: "ColorSystem.40" }, { ref: "ColorSystem.60" }], // var(--triplex-next-Typography-System_Color)

    PrimaryInvert_Color: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorDarkNeutralAlpha.0" }], // var(--triplex-next-Typography-PrimaryInvert_Color)
    ComplementaryInvert_Color: [{ ref: "ColorNeutralAlpha.30" }, { ref: "ColorDarkNeutralAlpha.20" }], // var(--triplex-next-Typography-ComplementaryInvert_Color)
    SecondaryInvert_Color: [{ ref: "ColorNeutralAlpha.50" }, { ref: "ColorDarkNeutralAlpha.40" }], // var(--triplex-next-Typography-SecondaryInvert_Color)
    TertiaryInvert_Color: [{ ref: "ColorNeutralAlpha.60" }, { ref: "ColorDarkNeutralAlpha.50" }], // var(--triplex-next-Typography-TertiaryInvert_Color)
    DisabledInvert_Color: [{ ref: "ColorNeutralAlpha.80" }, { ref: "ColorDarkNeutralAlpha.70" }], // var(--triplex-next-Typography-DisabledInvert_Color)
    BrandInvert_Color: [{ ref: "ColorBrand.60" }, { ref: "ColorBrand.40" }], // var(--triplex-next-Typography-BrandInvert_Color)
    InfoInvert_Color: [{ ref: "ColorInfo.60" }, { ref: "ColorInfo.40" }], // var(--triplex-next-Typography-InfoInvert_Color)
    SuccessInvert_Color: [{ ref: "ColorSuccess.60" }, { ref: "ColorSuccess.40" }], // var(--triplex-next-Typography-SuccessInvert_Color)
    ErrorInvert_Color: [{ ref: "ColorError.60" }, { ref: "ColorError.40" }], // var(--triplex-next-Typography-ErrorInvert_Color)
    WarningInvert_Color: [{ ref: "ColorWarning.60" }, { ref: "ColorWarning.40" }], // var(--triplex-next-Typography-WarningInvert_Color)
    SystemInvert_Color: [{ ref: "ColorSystem.60" }, { ref: "ColorSystem.40" }], // var(--triplex-next-Typography-SystemInvert_Color)
};
