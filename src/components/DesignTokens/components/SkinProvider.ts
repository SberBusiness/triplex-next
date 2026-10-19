import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

/** Отдельная палитра WordArt: не переопределяет семантические цвета темы. */
export const designTokensComponentsSkinProviderKeys = [
    "WordArt_Surface",
    "WordArt_Ink",
    "WordArt_Muted",
    "WordArt_LabelSurface",
    "WordArt_LabelInk",
    "WordArt_Purple",
    "WordArt_Violet",
    "WordArt_Pink",
    "WordArt_Gold",
    "WordArt_Amber",
    "WordArt_Green",
    "WordArt_Blue",
    "WordArt_Cyan",
    "WordArt_Gloss",
    "WordArt_Shadow",
] as const;
export type TDesignTokensComponentsSkinProviderKeys = (typeof designTokensComponentsSkinProviderKeys)[number];
export type TDesignTokensComponentsSkinProviderValue = Record<
    TDesignTokensComponentsSkinProviderKeys,
    TDesignTokenValue
>;
export type TDesignTokensComponentsSkinProviderValues = Record<
    TDesignTokensComponentsSkinProviderKeys,
    TDesignTokenValues
>;
export type TDesignTokensComponentsSkinProvider = { SkinProvider: TDesignTokensComponentsSkinProviderValue };

export const SkinProvider_Tokens: TDesignTokensComponentsSkinProviderValues = {
    WordArt_Surface: [{ value: "#FFFFFF" }, { value: "#241C33" }], // var(--triplex-next-SkinProvider-WordArt_Surface)
    WordArt_Ink: [{ value: "#37136D" }, { value: "#F6F0FF" }], // var(--triplex-next-SkinProvider-WordArt_Ink)
    WordArt_Muted: [{ value: "#6626B4" }, { value: "#D4BFFA" }], // var(--triplex-next-SkinProvider-WordArt_Muted)
    WordArt_LabelSurface: [{ value: "#FFFFFF" }, { value: "#FFFFFF" }], // var(--triplex-next-SkinProvider-WordArt_LabelSurface)
    WordArt_LabelInk: [{ value: "#37136D" }, { value: "#37136D" }], // var(--triplex-next-SkinProvider-WordArt_LabelInk)
    WordArt_Purple: [{ value: "#6626B4" }, { value: "#6626B4" }], // var(--triplex-next-SkinProvider-WordArt_Purple)
    WordArt_Violet: [{ value: "#9063EF" }, { value: "#9063EF" }], // var(--triplex-next-SkinProvider-WordArt_Violet)
    WordArt_Pink: [{ value: "#EC358E" }, { value: "#EC358E" }], // var(--triplex-next-SkinProvider-WordArt_Pink)
    WordArt_Gold: [{ value: "#FFD84D" }, { value: "#FFD84D" }], // var(--triplex-next-SkinProvider-WordArt_Gold)
    WordArt_Amber: [{ value: "#EFA61B" }, { value: "#EFA61B" }], // var(--triplex-next-SkinProvider-WordArt_Amber)
    WordArt_Green: [{ value: "#C4E79B" }, { value: "#C4E79B" }], // var(--triplex-next-SkinProvider-WordArt_Green)
    WordArt_Blue: [{ value: "#18ABEF" }, { value: "#18ABEF" }], // var(--triplex-next-SkinProvider-WordArt_Blue)
    WordArt_Cyan: [{ value: "#6BD4FF" }, { value: "#6BD4FF" }], // var(--triplex-next-SkinProvider-WordArt_Cyan)
    WordArt_Gloss: [{ value: "rgba(255, 255, 255, 0.8)" }, { value: "rgba(255, 255, 255, 0.8)" }], // var(--triplex-next-SkinProvider-WordArt_Gloss)
    WordArt_Shadow: [{ value: "#EADDFF" }, { value: "#120C1C" }], // var(--triplex-next-SkinProvider-WordArt_Shadow)
};
