import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента Puller.
export const designTokensComponentsPullerKeys = [
    "Backdrop",
    "Body_Background",
    "Border_Color",
    "Footer_Background",
    "Header_Background",
] as const;
// Тип, содержащий названия токенов компонента Puller.
export type TDesignTokensComponentsPullerKeys = (typeof designTokensComponentsPullerKeys)[number];
// Тип, содержащий названия токенов компонента Puller и их значения.
export type TDesignTokensComponentsPullerValue = Record<TDesignTokensComponentsPullerKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Puller и их значения в светлой и темной теме.
export type TDesignTokensComponentsPullerValues = Record<TDesignTokensComponentsPullerKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Puller.
export type TDesignTokensComponentsPuller = { Puller: TDesignTokensComponentsPullerValue };

// Токены компонента Puller в светлой и темной темах.
export const Puller_Tokens: TDesignTokensComponentsPullerValues = {
    Backdrop: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorDarkNeutralAlpha.20" }], // var(--triplex-next-Puller-Backdrop)
    Body_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Puller-Body_Background)
    Border_Color: [{ ref: "ColorNeutral.20" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-Puller-Border_Color)
    Footer_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Puller-Footer_Background)
    Header_Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-Puller-Header_Background)
};
