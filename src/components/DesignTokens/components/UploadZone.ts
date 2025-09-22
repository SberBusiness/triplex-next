import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента UploadZone.
export const designTokensComponentsUploadZoneKeys = [
    "Background_Default",
    "Background_Hover",
    "BorderColor_Default",
    "DragArea_Background",
    "DragArea_BorderColor",
] as const;
// Тип, содержащий названия токенов компонента UploadZone.
export type TDesignTokensComponentsUploadZoneKeys = (typeof designTokensComponentsUploadZoneKeys)[number];
// Тип, содержащий названия токенов компонента UploadZone и их значения.
export type TDesignTokensComponentsUploadZoneValue = Record<TDesignTokensComponentsUploadZoneKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента UploadZone и их значения в светлой и темной теме.
export type TDesignTokensComponentsUploadZoneValues = Record<TDesignTokensComponentsUploadZoneKeys, TDesignTokenValues>;
// Тип локальных токенов компонента UploadZone.
export type TDesignTokensComponentsUploadZone = { UploadZone: TDesignTokensComponentsUploadZoneValue };

// Токены компонента UploadZone в светлой и темной темах.
export const UploadZone_Tokens: TDesignTokensComponentsUploadZoneValues = {
    Background_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-UploadZone-Background_Default)
    Background_Hover: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-UploadZone-Background_Hover)

    BorderColor_Default: [{ ref: "ColorDarkNeutralAlpha.60" }, { ref: "ColorNeutralAlpha.40" }], // var(--triplex-next-UploadZone-BorderColor_Default)

    DragArea_Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-UploadZone-DragArea_Background)
    DragArea_BorderColor: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-UploadZone-DragArea_BorderColor)
};
