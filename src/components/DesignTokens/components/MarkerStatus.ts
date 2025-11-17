import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента MarkerStatus.
export const designTokensComponentsMarkerStatusKeys = ["Description_Color"] as const;
// Тип, содержащий названия токенов компонента MarkerStatus.
export type TDesignTokensComponentsMarkerStatusKeys = (typeof designTokensComponentsMarkerStatusKeys)[number];
// Тип, содержащий названия токенов компонента MarkerStatus и их значения.
export type TDesignTokensComponentsMarkerStatusValue = Record<
    TDesignTokensComponentsMarkerStatusKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента MarkerStatus и их значения в светлой и темной теме.
export type TDesignTokensComponentsMarkerStatusValues = Record<
    TDesignTokensComponentsMarkerStatusKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента MarkerStatus.
export type TDesignTokensComponentsMarkerStatus = { MarkerStatus: TDesignTokensComponentsMarkerStatusValue };

// Токены компонента MarkerStatus в светлой и темной темах.
export const MarkerStatus_Tokens: TDesignTokensComponentsMarkerStatusValues = {
    Description_Color: [{ value: "rgba(0, 0, 0, 0.55)" }, { value: "rgba(255, 255, 255, 0.55)" }], // var(--triplex-next-MarkerStatus-Description_Color)
};
