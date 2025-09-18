import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sber-business/triplex/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента Body.
export const designTokensComponentsBodyKeys = ["Background_White", "Background_Gray", "Background_Darkgray"] as const;
// Тип, содержащий названия токенов компонента Body.
export type TDesignTokensComponentsBodyKeys = (typeof designTokensComponentsBodyKeys)[number];
// Тип, содержащий названия токенов компонента Body и их значения.
export type TDesignTokensComponentsBodyValue = Record<TDesignTokensComponentsBodyKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Body и их значения в светлой и темной теме.
export type TDesignTokensComponentsBodyValues = Record<TDesignTokensComponentsBodyKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Body.
export type TDesignTokensComponentsBody = { Body: TDesignTokensComponentsBodyValue };

// Токены компонента Body в светлой и темной темах.
export const Body_Tokens: TDesignTokensComponentsBodyValues = {
    Background_Darkgray: [{ ref: "Neutral.900" }, { ref: "Basic.700" }], // var(--triplex-Body-Background_Darkgray)
    Background_Gray: [{ ref: "Neutral.100" }, { ref: "Basic.700" }], // var(--triplex-Body-Background_Gray)
    Background_White: [{ ref: "Basic.100" }, { ref: "Basic.900" }], // var(--triplex-Body-Background_White)
};
