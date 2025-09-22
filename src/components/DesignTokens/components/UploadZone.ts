import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sber-business/triplex/components/DesignTokens/types/DesignTokenTypes";

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
    BorderColor_Default: [{ ref: "Neutral.500" }, { ref: "Basic.300" }], // var(--triplex-UploadZone-BorderColor_Default)
    BorderColor_Hover: [{ ref: "Basic.700" }, { ref: "Neutral.500" }], // var(--triplex-UploadZone-BorderColor_Hover)

    DragArea_Background: [{ ref: "Basic.100" }, { ref: "Basic.900" }], // var(--triplex-UploadZone-DragArea_Background)
    DragArea_BorderColor: [{ ref: "Basic.700" }, { ref: "Neutral.500" }], // var(--triplex-UploadZone-DragArea_BorderColor)
};
