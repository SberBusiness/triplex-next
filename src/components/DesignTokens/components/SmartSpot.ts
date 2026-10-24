import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента SmartSpot.
export const designTokensComponentsSmartSpotKeys = [
    "Success_Spot1_Color",
    "Success_Spot2_Color",
    "Success_Spot3_Color",
    "Success_Spot4_Color",
    "Warning_Spot1_Color",
    "Warning_Spot2_Color",
    "Warning_Spot3_Color",
    "Warning_Spot4_Color",
    "Error_Spot1_Color",
    "Error_Spot2_Color",
    "Error_Spot3_Color",
    "Error_Spot4_Color",
    "Waiting_Spot1_Color",
    "Waiting_Spot2_Color",
    "Waiting_Spot3_Color",
    "Waiting_Spot4_Color",
] as const;
// Тип, содержащий названия токенов компонента SmartSpot.
export type TDesignTokensComponentsSmartSpotKeys = (typeof designTokensComponentsSmartSpotKeys)[number];
// Тип, содержащий названия токенов компонента SmartSpot и их значения.
export type TDesignTokensComponentsSmartSpotValue = Record<TDesignTokensComponentsSmartSpotKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента SmartSpot и их значения в светлой и темной теме.
export type TDesignTokensComponentsSmartSpotValues = Record<TDesignTokensComponentsSmartSpotKeys, TDesignTokenValues>;
// Тип локальных токенов компонента SmartSpot.
export type TDesignTokensComponentsSmartSpot = { SmartSpot: TDesignTokensComponentsSmartSpotValue };

// Токены компонента SmartSpot в светлой и темной темах.
export const SmartSpot_Tokens: TDesignTokensComponentsSmartSpotValues = {
    Success_Spot1_Color: [{ ref: "ColorSuccess.80" }, { ref: "ColorSuccess.80" }], // var(--triplex-next-SmartSpot-Success_Spot1_Color)
    Success_Spot2_Color: [{ ref: "ColorSuccess.50" }, { ref: "ColorSuccess.50" }], // var(--triplex-next-SmartSpot-Success_Spot2_Color)
    Success_Spot3_Color: [{ ref: "ColorBrand.60" }, { ref: "ColorBrand.60" }], // var(--triplex-next-SmartSpot-Success_Spot3_Color)
    Success_Spot4_Color: [{ ref: "ColorSuccess.80" }, { ref: "ColorSuccess.80" }], // var(--triplex-next-SmartSpot-Success_Spot4_Color)
    Warning_Spot1_Color: [{ ref: "ColorWarning.30" }, { ref: "ColorWarning.30" }], // var(--triplex-next-SmartSpot-Warning_Spot1_Color)
    Warning_Spot2_Color: [{ ref: "ColorWarning.70" }, { ref: "ColorWarning.70" }], // var(--triplex-next-SmartSpot-Warning_Spot2_Color)
    Warning_Spot3_Color: [{ ref: "ColorWarning.50" }, { ref: "ColorWarning.50" }], // var(--triplex-next-SmartSpot-Warning_Spot3_Color)
    Warning_Spot4_Color: [{ ref: "ColorWarning.80" }, { ref: "ColorWarning.80" }], // var(--triplex-next-SmartSpot-Warning_Spot4_Color)
    Error_Spot1_Color: [{ ref: "ColorWarning.30" }, { ref: "ColorWarning.30" }], // var(--triplex-next-SmartSpot-Error_Spot1_Color)
    Error_Spot2_Color: [{ ref: "ColorWarning.30" }, { ref: "ColorWarning.30" }], // var(--triplex-next-SmartSpot-Error_Spot2_Color)
    Error_Spot3_Color: [{ ref: "ColorWarning.50" }, { ref: "ColorWarning.50" }], // var(--triplex-next-SmartSpot-Error_Spot3_Color)
    Error_Spot4_Color: [{ ref: "ColorError.70" }, { ref: "ColorError.70" }], // var(--triplex-next-SmartSpot-Error_Spot4_Color)
    Waiting_Spot1_Color: [{ ref: "ColorSystem.100" }, { ref: "ColorSystem.100" }], // var(--triplex-next-SmartSpot-Waiting_Spot1_Color)
    Waiting_Spot2_Color: [{ ref: "ColorSystem.60" }, { ref: "ColorSystem.60" }], // var(--triplex-next-SmartSpot-Waiting_Spot2_Color)
    Waiting_Spot3_Color: [{ ref: "ColorSystem.90" }, { ref: "ColorSystem.90" }], // var(--triplex-next-SmartSpot-Waiting_Spot3_Color)
    Waiting_Spot4_Color: [{ ref: "ColorSystem.90" }, { ref: "ColorSystem.90" }], // var(--triplex-next-SmartSpot-Waiting_Spot4_Color)
};
