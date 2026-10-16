import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Carousel.
export const designTokensComponentsCarouselKeys = [
    "Button_BackgroundColor_Default",
    "Button_BackgroundColor_Hover",
    "Button_BackgroundColor_Active",
    "Button_BackgroundColor_Disabled",
    "Button_BorderColor",
] as const;
// Тип, содержащий названия токенов компонента Carousel.
export type TDesignTokensComponentsCarouselKeys = (typeof designTokensComponentsCarouselKeys)[number];
// Тип, содержащий названия токенов компонента Carousel и их значения.
export type TDesignTokensComponentsCarouselValue = Record<TDesignTokensComponentsCarouselKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Carousel и их значения в светлой и темной теме.
export type TDesignTokensComponentsCarouselValues = Record<TDesignTokensComponentsCarouselKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Carousel.
export type TDesignTokensComponentsCarousel = { Carousel: TDesignTokensComponentsCarouselValue };

// Токены компонента Carousel в светлой и темной темах.
export const Carousel_Tokens: TDesignTokensComponentsCarouselValues = {
    Button_BackgroundColor_Default: [{ ref: "ColorDarkNeutralAlpha.80" }, { ref: "ColorNeutralAlpha.70" }], // var(--triplex-next-Carousel-Button_BackgroundColor_Default)
    Button_BackgroundColor_Hover: [{ ref: "ColorDarkNeutralAlpha.60" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-Carousel-Button_BackgroundColor_Hover)
    Button_BackgroundColor_Active: [{ ref: "ColorDarkNeutralAlpha.50" }, { ref: "ColorNeutralAlpha.40" }], // var(--triplex-next-Carousel-Button_BackgroundColor_Active)
    Button_BackgroundColor_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-Carousel-Button_BackgroundColor_Disabled)
    Button_BorderColor: [{ ref: "ColorDarkNeutralAlpha.80" }, { ref: "ColorNeutralAlpha.70" }], // var(--triplex-next-Carousel-Button_BorderColor)
};
