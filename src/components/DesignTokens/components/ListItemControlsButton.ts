import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента ListItemControlsButton.
export const designTokensComponentsListItemControlsButtonKeys = [
    "Background_Active",
    "Background_Default",
    "Background_Hover",

    "Color_Active",
    "Color_Default",
    "Color_Hover",
] as const;
// Тип, содержащий названия токенов компонента ListItemControlsButton.
export type TDesignTokensComponentsListItemControlsButtonKeys =
    (typeof designTokensComponentsListItemControlsButtonKeys)[number];
// Тип, содержащий названия токенов компонента ListItemControlsButton и их значения.
export type TDesignTokensComponentsListItemControlsButtonValue = Record<
    TDesignTokensComponentsListItemControlsButtonKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента ListItemControlsButton и их значения в светлой и темной теме.
export type TDesignTokensComponentsListItemControlsButtonValues = Record<
    TDesignTokensComponentsListItemControlsButtonKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента ListItemControlsButton.
export type TDesignTokensComponentsListItemControlsButton = {
    ListItemControlsButton: TDesignTokensComponentsListItemControlsButtonValue;
};

// Токены компонента ListItemControlsButton в светлой и темной темах.
export const ListItemControlsButton_Tokens: TDesignTokensComponentsListItemControlsButtonValues = {
    Background_Active: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.100" }], // var(--triplex-next-ListItemControlsButton-Background_Active)
    Background_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-ListItemControlsButton-Background_Default)
    Background_Hover: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-ListItemControlsButton-Background_Hover)

    Color_Active: [{ ref: "ColorBrand.30" }, { ref: "ColorBrand.40" }], // var(--triplex-next-ListItemControlsButton-Color_Active)
    Color_Default: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.60" }], // var(--triplex-next-ListItemControlsButton-Color_Default)
    Color_Hover: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.70" }], // var(--triplex-next-ListItemControlsButton-Color_Hover)
};
