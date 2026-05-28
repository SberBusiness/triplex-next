import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента ImageGallery.
export const designTokensComponentsImageGalleryKeys = [
    "Arrow_Background_Default",
    "Arrow_Background_Hover",
    "Arrow_Background_Active",
    "Arrow_Background_Disabled",
    "Arrow_BorderColor_Default",
    "Arrow_BorderColor_Hover",
    "Arrow_BorderColor_Active",
    "Arrow_BorderColor_Disabled",
    "ThumbCarouselButton_Background_Default",
    "Dot_Background_Default",
    "Dot_Background_Hover",
    "Dot_Background_Active",
    "Accent_Color",
] as const;
// Тип, содержащий названия токенов компонента ImageGallery.
export type TDesignTokensComponentsImageGalleryKeys = (typeof designTokensComponentsImageGalleryKeys)[number];
// Тип, содержащий названия токенов компонента ImageGallery и их значения.
export type TDesignTokensComponentsImageGalleryValue = Record<
    TDesignTokensComponentsImageGalleryKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента ImageGallery и их значения в светлой и темной теме.
export type TDesignTokensComponentsImageGalleryValues = Record<
    TDesignTokensComponentsImageGalleryKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента ImageGallery.
export type TDesignTokensComponentsImageGallery = { ImageGallery: TDesignTokensComponentsImageGalleryValue };

// Токены компонента ImageGallery в светлой и темной темах.
export const ImageGallery_Tokens: TDesignTokensComponentsImageGalleryValues = {
    Arrow_Background_Default: [{ ref: "ColorDarkNeutralAlpha.80" }, { ref: "ColorNeutralAlpha.70" }], // var(--triplex-next-ImageGallery-Arrow_Background_Default)
    Arrow_Background_Hover: [{ ref: "ColorDarkNeutralAlpha.60" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-ImageGallery-Arrow_Background_Hover)
    Arrow_Background_Active: [{ ref: "ColorDarkNeutralAlpha.50" }, { ref: "ColorNeutralAlpha.40" }], // var(--triplex-next-ImageGallery-Arrow_Background_Active)
    Arrow_Background_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-ImageGallery-Arrow_Background_Disabled)
    Arrow_BorderColor_Default: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-ImageGallery-Arrow_BorderColor_Default)
    Arrow_BorderColor_Hover: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-ImageGallery-Arrow_BorderColor_Hover)
    Arrow_BorderColor_Active: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-ImageGallery-Arrow_BorderColor_Active)
    Arrow_BorderColor_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-ImageGallery-Arrow_BorderColor_Disabled)
    ThumbCarouselButton_Background_Default: [{ ref: "ColorDarkNeutralAlpha.50" }, { ref: "ColorDarkNeutralAlpha.50" }], // var(--triplex-next-ImageGallery-ThumbCarouselButton_Background_Default)
    Dot_Background_Default: [{ ref: "ColorDarkNeutralAlpha.80" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-ImageGallery-Dot_Background_Default)
    Dot_Background_Hover: [{ ref: "ColorDarkNeutralAlpha.60" }, { ref: "ColorNeutralAlpha.60" }], // var(--triplex-next-ImageGallery-Dot_Background_Hover)
    Dot_Background_Active: [{ ref: "ColorDarkNeutralAlpha.30" }, { ref: "ColorNeutralAlpha.30" }], // var(--triplex-next-ImageGallery-Dot_Background_Active)
    Accent_Color: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.60" }], // var(--triplex-next-ImageGallery-Accent_Color)
};
