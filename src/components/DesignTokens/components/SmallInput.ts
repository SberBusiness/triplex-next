import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента SmallInput.
export const designTokensComponentsSmallInputKeys = ["Background", "Color", "PlaceholderColor", "Shadow"] as const;
// Тип, содержащий названия токенов компонента SmallInput.
export type TDesignTokensComponentsSmallInputKeys = (typeof designTokensComponentsSmallInputKeys)[number];
// Тип, содержащий названия токенов компонента SmallInput и их значения.
export type TDesignTokensComponentsSmallInputValue = Record<TDesignTokensComponentsSmallInputKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента SmallInput и их значения в светлой и темной теме.
export type TDesignTokensComponentsSmallInputValues = Record<TDesignTokensComponentsSmallInputKeys, TDesignTokenValues>;
// Тип локальных токенов компонента SmallInput.
export type TDesignTokensComponentsSmallInput = { SmallInput: TDesignTokensComponentsSmallInputValue };

// Токены компонента SmallInput в светлой и темной темах.
export const SmallInput_Tokens: TDesignTokensComponentsSmallInputValues = {
    Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-SmallInput-Background)
    Color: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-SmallInput-Color)
    PlaceholderColor: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-SmallInput-PlaceholderColor)
    Shadow: [{ value: "0 0 0 1px rgba(33, 161, 154) inset" }, { value: "0 0 0 1px rgba(33, 161, 154) inset" }], // var(--triplex-next-SmallInput-Shadow)
};
