import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Pagination.
export const designTokensComponentsPaginationKeys = [
    "PageButton_Background_Active",
    "PageButton_Background_Hover",
    "PageButton_Background_Selected",
    "PageButton_BorderColor_Focus",
    "PageButton_Color",
] as const;
// Тип, содержащий названия токенов компонента Pagination.
export type TDesignTokensComponentsPaginationKeys = (typeof designTokensComponentsPaginationKeys)[number];
// Тип, содержащий названия токенов компонента Pagination и их значения.
export type TDesignTokensComponentsPaginationValue = Record<TDesignTokensComponentsPaginationKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Pagination и их значения в светлой и темной теме.
export type TDesignTokensComponentsPaginationValues = Record<TDesignTokensComponentsPaginationKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Pagination.
export type TDesignTokensComponentsPagination = { Pagination: TDesignTokensComponentsPaginationValue };

// Токены компонента Pagination в светлой и темной темах.
export const Pagination_Tokens: TDesignTokensComponentsPaginationValues = {
    PageButton_Background_Active: [{ ref: "ColorNeutral.50" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Pagination-PageButton_Background_Active)
    PageButton_Background_Hover: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.90" }], // var(--triplex-next-Pagination-PageButton_Background_Hover)
    PageButton_Background_Selected: [{ ref: "ColorNeutral.50" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-Pagination-PageButton_Background_Selected)
    PageButton_BorderColor_Focus: [{ ref: "ColorWarning.80" }, { ref: "ColorWarning.80" }], // var(--triplex-next-Pagination-PageButton_BorderColor_Focus)
    PageButton_Color: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Pagination-PageButton_Color)
};
