import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента ImageGallery.
export const designTokensComponentsImageGalleryKeys = [
    "Container_Background_Default",
    "Arrow_Background_Default",
    "Arrow_Background_Hover",
    "Arrow_Background_Disabled",
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
    Container_Background_Default: [{ ref: "ColorDarkNeutralAlpha.100" }, { ref: "ColorNeutralAlpha.100" }], // var(--triplex-next-ImageGallery-Container_Background_Default)
    Arrow_Background_Default: [{ ref: "ColorDarkNeutralAlpha.50" }, { ref: "ColorDarkNeutralAlpha.50" }], // var(--triplex-next-ImageGallery-Arrow_Background_Default)
    Arrow_Background_Hover: [{ ref: "ColorDarkNeutralAlpha.30" }, { ref: "ColorDarkNeutralAlpha.30" }], // var(--triplex-next-ImageGallery-Arrow_Background_Hover)
    Arrow_Background_Disabled: [{ ref: "ColorDarkNeutralAlpha.80" }, { ref: "ColorDarkNeutralAlpha.80" }], // var(--triplex-next-ImageGallery-Arrow_Background_Disabled)
    ThumbCarouselButton_Background_Default: [{ ref: "ColorDarkNeutralAlpha.50" }, { ref: "ColorDarkNeutralAlpha.50" }], // var(--triplex-next-ImageGallery-ThumbCarouselButton_Background_Default)
    Dot_Background_Default: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorDarkNeutralAlpha.70" }], // var(--triplex-next-ImageGallery-Dot_Background_Default)
    Dot_Background_Hover: [{ ref: "ColorDarkNeutralAlpha.50" }, { ref: "ColorDarkNeutralAlpha.50" }], // var(--triplex-next-ImageGallery-Dot_Background_Hover)
    Dot_Background_Active: [{ ref: "ColorDarkNeutralAlpha.30" }, { ref: "ColorDarkNeutralAlpha.30" }], // var(--triplex-next-ImageGallery-Dot_Background_Active)
    Accent_Color: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.60" }], // var(--triplex-next-ImageGallery-Accent_Color)
};
