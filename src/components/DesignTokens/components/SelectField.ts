import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента SelectField.
export const designTokensComponentsSelectFieldKeys = [
    "Color_Caret_Opened",
    "Color_Default",
    "Color_Disabled",
    "Color_Selected",
];
// Тип, содержащий названия токенов компонента SelectField.
export type TDesignTokensComponentsSelectFieldKeys = (typeof designTokensComponentsSelectFieldKeys)[number];
// Тип, содержащий названия токенов компонента SelectField и их значения.
export type TDesignTokensComponentsSelectFieldValue = Record<TDesignTokensComponentsSelectFieldKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента SelectField и их значения в светлой и темной теме.
export type TDesignTokensComponentsSelectFieldValues = Record<
    TDesignTokensComponentsSelectFieldKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента SelectField.
export type TDesignTokensComponentsSelectField = { SelectField: TDesignTokensComponentsSelectFieldValue };

// Токены компонента SelectField в светлой и темной темах.
export const Select_Field_Tokens: TDesignTokensComponentsSelectFieldValues = {
    Color_Caret_Opened: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-SelectField-Color_Caret_Opened)
    Color_Default: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-SelectField-Color_Default)
    Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-SelectField-Color_Disabled)
    Color_Selected: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-SelectField-Color_Selected)
};
