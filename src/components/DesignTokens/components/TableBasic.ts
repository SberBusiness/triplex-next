import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента TableBasic.
export const designTokensComponentsTableBasicKeys = [
    "Background_Hover",
    "Background_Selected",
    "Color",
    "Header_Background",

    "TableFooter_Background",
    "TableFooter_Highlight",

    "TableBasicSettings_Footer_BorderColor",
    "TableBasicSettings_ListItem_Background_Default",
    "TableBasicSettings_ListItem_Background_Hover",
    "TableBasicSettings_ListItem_Background_Dragging",
] as const;
// Тип, содержащий названия токенов компонента TableBasic.
export type TDesignTokensComponentsTableBasicKeys = (typeof designTokensComponentsTableBasicKeys)[number];
// Тип, содержащий названия токенов компонента TableBasic и их значения.
export type TDesignTokensComponentsTableBasicValue = Record<TDesignTokensComponentsTableBasicKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента TableBasic и их значения в светлой и темной теме.
export type TDesignTokensComponentsTableBasicValues = Record<TDesignTokensComponentsTableBasicKeys, TDesignTokenValues>;
// Тип локальных токенов компонента TableBasic.
export type TDesignTokensComponentsTableBasic = { TableBasic: TDesignTokensComponentsTableBasicValue };

// Токены компонента TableBasic в светлой и темной темах.
export const TableBasic_Tokens: TDesignTokensComponentsTableBasicValues = {
    Background_Hover: [{ ref: "ColorNeutral.50" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-TableBasic-Background_Hover)
    Background_Selected: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-TableBasic-Background_Selected)
    Color: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-TableBasic-Color)
    Header_Background: [{ ref: "ColorNeutral.60" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-TableBasic-Header_Background)

    TableFooter_Background: [{ ref: "ColorNeutral.60" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-TableBasic-TableFooter_Background)
    TableFooter_Highlight: [
        { value: "linear-gradient(transparent, #FFFFFF)" },
        { value: "linear-gradient(transparent, #27272A)" },
    ], // var(--triplex-next-TableBasic-TableFooter_Highlight)

    TableBasicSettings_Footer_BorderColor: [{ ref: "ColorNeutral.20" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-TableBasic-TableBasicSettings_Footer_BorderColor)
    TableBasicSettings_ListItem_Background_Default: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-TableBasic-TableBasicSettings_ListItem_Background_Default)
    TableBasicSettings_ListItem_Background_Hover: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-TableBasic-TableBasicSettings_ListItem_Background_Hover)
    TableBasicSettings_ListItem_Background_Dragging: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-TableBasic-TableBasicSettings_ListItem_Background_Dragging)
};
