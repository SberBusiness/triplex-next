import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента AlertProcess.
export const designTokensComponentsAlertProcessKeys = [
    "Info_Background",
    "Warning_Background",
    "Error_Background",
    "System_Background",
    "Feature_Background",
] as const;
// Тип, содержащий названия токенов компонента AlertProcess.
export type TDesignTokensComponentsAlertProcessKeys = (typeof designTokensComponentsAlertProcessKeys)[number];
// Тип, содержащий названия токенов компонента AlertProcess и их значения.
export type TDesignTokensComponentsAlertProcessValue = Record<
    TDesignTokensComponentsAlertProcessKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента AlertProcess и их значения в светлой и темной теме.
export type TDesignTokensComponentsAlertProcessValues = Record<
    TDesignTokensComponentsAlertProcessKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента AlertProcess.
export type TDesignTokensComponentsAlertProcess = { AlertProcess: TDesignTokensComponentsAlertProcessValue };

// Токены компонента AlertProcess в светлой и темной темах.
export const AlertProcess_Tokens: TDesignTokensComponentsAlertProcessValues = {
    Info_Background: [{ ref: "ColorInfo.100" }, { ref: "ColorInfo.0" }], // var(--triplex-next-AlertProcess-Info_Background)

    Warning_Background: [{ ref: "ColorWarning.100" }, { ref: "ColorWarning.0" }], // var(--triplex-next-AlertProcess-Warning_Background)

    Error_Background: [{ ref: "ColorError.100" }, { ref: "ColorError.0" }], // var(--triplex-next-AlertProcess-Error_Background)

    System_Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-AlertProcess-System_Background)

    Feature_Background: [{ ref: "ColorBrand.100" }, { ref: "ColorBrand.0" }], // var(--triplex-next-AlertProcess-Feature_Background)
};
