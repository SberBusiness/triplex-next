import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента AlertContext.
export const designTokensComponentsAlertContextKeys = [
    "Error_Color",
    "Info_Color",
    "System_Color",
    "Warning_Color",
] as const;
// Тип, содержащий названия токенов компонента AlertContext.
export type TDesignTokensComponentsAlertContextKeys = (typeof designTokensComponentsAlertContextKeys)[number];
// Тип, содержащий названия токенов компонента AlertContext и их значения.
export type TDesignTokensComponentsAlertContextValue = Record<
    TDesignTokensComponentsAlertContextKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента AlertContext и их значения в светлой и темной теме.
export type TDesignTokensComponentsAlertContextValues = Record<
    TDesignTokensComponentsAlertContextKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента AlertContext.
export type TDesignTokensComponentsAlertContext = { AlertContext: TDesignTokensComponentsAlertContextValue };

// Токены компонента AlertContext в светлой и темной темах.
export const AlertContext_Tokens: TDesignTokensComponentsAlertContextValues = {
    Error_Color: [{ ref: "ColorError.40" }, { ref: "ColorError.60" }], // var(--triplex-next-AlertContext-Error_Color)
    Info_Color: [{ ref: "ColorDarkBasicAlpha.0" }, { ref: "ColorBasicAlpha.0" }], // var(--triplex-next-AlertContext-Info_Color)
    System_Color: [{ ref: "ColorDarkBasicAlpha.0" }, { ref: "ColorBasicAlpha.0" }], // var(--triplex-next-AlertContext-System_Color)
    Warning_Color: [{ ref: "ColorDarkBasicAlpha.0" }, { ref: "ColorBasicAlpha.0" }], // var(--triplex-next-AlertContext-Warning_Color)
};
