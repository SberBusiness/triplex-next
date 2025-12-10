import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента Slider.
export const designTokensComponentsSliderKeys = [
    "Dot_Background_Default",
    "Dot_Background_Disabled",
    "Dot_Background_Hover",
    "Dot_Background_Select",
    "Dot_Focus",
    "Dot_Inner_Background",
    "Dot_Inner_Background_Disabled",

    "Mark_Dot_Background_Default",
    "Mark_Dot_Background_Selected",
    "Mark_Dot_Background_Selected_Disabled",

    "Rail_Background",
    "Rail_Background_Disabled",

    "Tooltip_Background",
    "Tooltip_Color",

    "Track_Background_Default",
    "Track_Background_Disabled",
    "Track_Background_Hover",
] as const;
// Тип, содержащий названия токенов компонента Slider.
export type TDesignTokensComponentsSliderKeys = (typeof designTokensComponentsSliderKeys)[number];
// Тип, содержащий названия токенов компонента Slider и их значения.
export type TDesignTokensComponentsSliderValue = Record<TDesignTokensComponentsSliderKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Slider и их значения в светлой и темной теме.
export type TDesignTokensComponentsSliderValues = Record<TDesignTokensComponentsSliderKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Slider.
export type TDesignTokensComponentsSlider = { Slider: TDesignTokensComponentsSliderValue };

// Токены компонента Slider в светлой и темной темах.
export const Slider_Tokens: TDesignTokensComponentsSliderValues = {
    Dot_Background_Default: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-Slider-Dot_Background_Default)
    Dot_Background_Disabled: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-Slider-Dot_Background_Disabled)
    Dot_Background_Hover: [{ ref: "ColorBrand.60" }, { ref: "ColorBrand.60" }], // var(--triplex-next-Slider-Dot_Background_Hover)
    Dot_Background_Select: [{ ref: "ColorBrand.30" }, { ref: "ColorBrand.30" }], // var(--triplex-next-Slider-Dot_Background_Select)
    Dot_Focus: [{ ref: "ColorWarning.80" }, { ref: "ColorWarning.80" }], // var(--triplex-next-Slider-Dot_Focus)
    Dot_Inner_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.20" }], // var(--triplex-next-Slider-Dot_Inner_Background)
    Dot_Inner_Background_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-Slider-Dot_Inner_Background_Disabled)

    Mark_Dot_Background_Default: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.100" }], // var(--triplex-next-Slider-Mark_Dot_Background_Default)
    Mark_Dot_Background_Selected: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-Slider-Mark_Dot_Background_Selected)
    Mark_Dot_Background_Selected_Disabled: [{ ref: "ColorNeutral.60" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-Slider-Mark_Dot_Background_Selected_Disabled)

    Rail_Background: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.100" }], // var(--triplex-next-Slider-Rail_Background)
    Rail_Background_Disabled: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-Slider-Rail_Background_Disabled)

    Tooltip_Background: [{ ref: "ColorDarkNeutral.20" }, { ref: "ColorNeutral.80" }], // var(--triplex-next-Slider-Tooltip_Background)
    Tooltip_Color: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorDarkNeutral.0" }], // var(--triplex-next-Slider-Tooltip_Color)

    Track_Background_Default: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-Slider-Track_Background_Default)
    Track_Background_Disabled: [{ ref: "ColorNeutral.60" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-Slider-Track_Background_Disabled)
    Track_Background_Hover: [{ ref: "ColorBrand.30" }, { ref: "ColorBrand.30" }], // var(--triplex-next-Slider-Track_Background_Hover)
};
