import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента StatusTracker.
export const designTokensComponentsStatusTrackerKeys = [
    "Draft_Background",
    "Warning_Background",
    "Waiting_Background",
    "Rejected_Background",
    "Approved_Background",
    "Waiting_Color",
    "Rejected_Color",
    "Approved_Color",
    "Border_Color",
] as const;
// Тип, содержащий названия токенов компонента StatusTracker.
export type TDesignTokensComponentsStatusTrackerKeys = (typeof designTokensComponentsStatusTrackerKeys)[number];
// Тип, содержащий названия токенов компонента StatusTracker и их значения.
export type TDesignTokensComponentsStatusTrackerValue = Record<
    TDesignTokensComponentsStatusTrackerKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента StatusTracker и их значения в светлой и темной теме.
export type TDesignTokensComponentsStatusTrackerValues = Record<
    TDesignTokensComponentsStatusTrackerKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента StatusTracker.
export type TDesignTokensComponentsStatusTracker = { StatusTracker: TDesignTokensComponentsStatusTrackerValue };

// Токены компонента StatusTracker в светлой и темной темах.
export const StatusTracker_Tokens: TDesignTokensComponentsStatusTrackerValues = {
    Draft_Background: [{ ref: "ColorNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.100" }], // var(--triplex-next-StatusTracker-Draft_Background)

    Warning_Background: [{ ref: "ColorWarning.60" }, { ref: "ColorWarning.20" }], // var(--triplex-next-StatusTracker-Warning_Background)

    Waiting_Background: [{ ref: "ColorSystem.80" }, { ref: "ColorNeutralAlpha.60" }], // var(--triplex-next-StatusTracker-Waiting_Background)

    Rejected_Background: [{ ref: "ColorError.70" }, { ref: "ColorError.30" }], // var(--triplex-next-StatusTracker-Rejected_Background)

    Approved_Background: [{ ref: "ColorSuccess.60" }, { ref: "ColorSuccess.50" }], // var(--triplex-next-StatusTracker-Approved_Background)

    Waiting_Color: [{ ref: "ColorSystem.70" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-StatusTracker-Waiting_Color)

    Rejected_Color: [{ ref: "ColorError.80" }, { ref: "ColorError.20" }], // var(--triplex-next-StatusTracker-Rejected_Color)

    Approved_Color: [{ ref: "ColorSuccess.60" }, { ref: "ColorSuccess.30" }], // var(--triplex-next-StatusTracker-Approved_Color)

    Border_Color: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-StatusTracker-Border_Color)
};
