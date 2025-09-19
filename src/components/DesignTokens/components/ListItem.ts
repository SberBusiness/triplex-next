import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента ListItem.
export const designTokensComponentsListItemKeys = [
    "Background",
    "Background_Dragging",
    "Background_Selected",
    "Shadow",
] as const;
// Тип, содержащий названия токенов компонента ListItem.
export type TDesignTokensComponentsListItemKeys = (typeof designTokensComponentsListItemKeys)[number];
// Тип, содержащий названия токенов компонента ListItem и их значения.
export type TDesignTokensComponentsListItemValue = Record<TDesignTokensComponentsListItemKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента ListItem и их значения в светлой и темной теме.
export type TDesignTokensComponentsListItemValues = Record<TDesignTokensComponentsListItemKeys, TDesignTokenValues>;
// Тип локальных токенов компонента ListItem.
export type TDesignTokensComponentsListItem = { ListItem: TDesignTokensComponentsListItemValue };

// Токены компонента ListItem в светлой и темной темах.
export const ListItem_Tokens: TDesignTokensComponentsListItemValues = {
    Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.0" }], // var(--triplex-next-ListItem-Background)
    Background_Dragging: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.0" }], // var(--triplex-next-ListItem-Background_Dragging)
    Background_Selected: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.10" }], // var(--triplex-next-ListItem-Background_Selected)
    Shadow: [{ value: "0 2px 7px rgba(31, 31, 34, 0.25)" }, { value: "none" }], // var(--triplex-next-ListItem-Background_Shadow)
};
