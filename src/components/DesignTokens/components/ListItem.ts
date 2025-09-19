import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sber-business/triplex/components/DesignTokens/types/DesignTokenTypes";

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
    Background: [{ ref: "Basic.100" }, { ref: "Basic.900" }], // var(--triplex-ListItem-Background)
    Background_Dragging: [{ ref: "Basic.100" }, { ref: "Basic.300" }], // var(--triplex-ListItem-Background_Dragging)
    Background_Selected: [{ ref: "Neutral.100" }, { ref: "Basic.500" }], // var(--triplex-ListItem-Background_Selected)
    Shadow: [{ value: "0 2px 7px rgba(31, 31, 34, 0.25)" }, { value: "none" }], // var(--triplex-ListItem-Background_Shadow)
};
