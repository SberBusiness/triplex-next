import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента ListItemControlsButton.
export const designTokensComponentsListItemControlsButtonKeys = ["Background", "Color"] as const;
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
    Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.10" }], // var(--triplex-next-ListItemControlsButton-Background)
    Color: [{ ref: "ColorDarkNeutral.10" }, { ref: "ColorNeutral.90" }], // var(--triplex-next-ListItemControlsButton-Color)
};
