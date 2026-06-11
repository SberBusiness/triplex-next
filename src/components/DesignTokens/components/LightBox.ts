import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента LightBox.
export const designTokensComponentsLightBoxKeys = [
    "Backdrop_Background",
    "Content_Background",
    "SideOverlay_Background",
] as const;
// Тип, содержащий названия токенов компонента LightBox.
export type TDesignTokensComponentsLightBoxKeys = (typeof designTokensComponentsLightBoxKeys)[number];
// Тип, содержащий названия токенов компонента LightBox и их значения.
export type TDesignTokensComponentsLightBoxValue = Record<TDesignTokensComponentsLightBoxKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента LightBox и их значения в светлой и темной теме.
export type TDesignTokensComponentsLightBoxValues = Record<TDesignTokensComponentsLightBoxKeys, TDesignTokenValues>;
// Тип локальных токенов компонента LightBox.
export type TDesignTokensComponentsLightBox = { LightBox: TDesignTokensComponentsLightBoxValue };

// Токены компонента LightBox в светлой и темной темах.
export const LightBox_Tokens: TDesignTokensComponentsLightBoxValues = {
    Backdrop_Background: [{ ref: "ColorDarkNeutralAlpha.30" }, { ref: "ColorDarkNeutralAlpha.30" }], // var(--triplex-next-LightBox-Backdrop_Background)
    Content_Background: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.0" }], // var(--triplex-next-LightBox-Content_Background)
    SideOverlay_Background: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.20" }], // var(--triplex-next-LightBox-SideOverlay_Background)
};
