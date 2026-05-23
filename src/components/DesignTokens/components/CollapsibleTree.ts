import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента CollapsibleTree.
export const designTokensComponentsCollapsibleTreeKeys = ["Header_Background_Hover", "Header_Shadow_Focus"] as const;
// Тип, содержащий названия токенов компонента CollapsibleTree.
export type TDesignTokensComponentsCollapsibleTreeKeys = (typeof designTokensComponentsCollapsibleTreeKeys)[number];
// Тип, содержащий названия токенов компонента CollapsibleTree и их значения.
export type TDesignTokensComponentsCollapsibleTreeValue = Record<
    TDesignTokensComponentsCollapsibleTreeKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента CollapsibleTree и их значения в светлой и темной теме.
export type TDesignTokensComponentsCollapsibleTreeValues = Record<
    TDesignTokensComponentsCollapsibleTreeKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента CollapsibleTree.
export type TDesignTokensComponentsCollapsibleTree = { CollapsibleTree: TDesignTokensComponentsCollapsibleTreeValue };

// Токены компонента CollapsibleTree в светлой и темной темах.
export const CollapsibleTree_Tokens: TDesignTokensComponentsCollapsibleTreeValues = {
    Header_Background_Hover: [{ ref: "ColorNeutral.50" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-CollapsibleTree-Header_Background_Hover)
    Header_Shadow_Focus: [{ value: "0 0 0 1px #FFD169 inset" }, { value: "0 0 0 1px #FFD169 inset" }], // var(--triplex-next-CollapsibleTree-Header_Shadow_Focus)
};
