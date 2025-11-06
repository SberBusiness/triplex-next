import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Marker.
export const designTokensComponentsMarkerKeys = [
    "Background_Error",
    "Background_Success",
    "Background_Waiting",
    "Background_Warning",
] as const;
// Тип, содержащий названия токенов компонента Marker.
export type TDesignTokensComponentsMarkerKeys = (typeof designTokensComponentsMarkerKeys)[number];
// Тип, содержащий названия токенов компонента Marker и их значения.
export type TDesignTokensComponentsMarkerValue = Record<TDesignTokensComponentsMarkerKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Marker и их значения в светлой и темной теме.
export type TDesignTokensComponentsMarkerValues = Record<TDesignTokensComponentsMarkerKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Marker.
export type TDesignTokensComponentsMarker = { Marker: TDesignTokensComponentsMarkerValue };

// Токены компонента Marker в светлой и темной темах.
export const Marker_Tokens: TDesignTokensComponentsMarkerValues = {
    Background_Error: [{ ref: "ColorError.60" }, { ref: "ColorError.60" }], // var(--triplex-next-Marker-Background_Error)
    Background_Success: [{ ref: "ColorBrand.60" }, { ref: "ColorBrand.70" }], // var(--triplex-next-Marker-Background_Success)
    Background_Waiting: [{ ref: "ColorSystem.60" }, { ref: "ColorSystem.70" }], // var(--triplex-next-Marker-Background_Waiting)
    Background_Warning: [{ ref: "ColorWarning.60" }, { ref: "ColorWarning.70" }], // var(--triplex-next-Marker-Background_Warning)
};
