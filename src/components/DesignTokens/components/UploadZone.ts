import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента UploadZone.
export const designTokensComponentsUploadZoneKeys = [
    "BorderColor_Default",
    "BorderColor_Hover",
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
    BorderColor_Default: [{ ref: "ColorDarkNeutralAlpha.60" }, { ref: "ColorNeutralAlpha.40" }], // var(--triplex-next-UploadZone-BorderColor_Default)
    BorderColor_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-UploadZone-BorderColor_Hover)

    DragArea_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutralAlpha.0" }], // var(--triplex-next-UploadZone-DragArea_Background)
    DragArea_BorderColor: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-UploadZone-DragArea_BorderColor)
};
