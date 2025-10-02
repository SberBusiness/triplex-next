import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента SegmentedControl.
export const designTokensComponentsSegmentedControlKeys = [
    "General_1_Background",
    "General_2_Background",

    "Secondary_1_Background",
    "Secondary_2_Background",
] as const;
// Тип, содержащий названия токенов компонента SegmentedControl.
export type TDesignTokensComponentsSegmentedControlKeys = (typeof designTokensComponentsSegmentedControlKeys)[number];
// Тип, содержащий названия токенов компонента SegmentedControl и их значения.
export type TDesignTokensComponentsSegmentedControlValue = Record<
    TDesignTokensComponentsSegmentedControlKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента SegmentedControl и их значения в светлой и темной теме.
export type TDesignTokensComponentsSegmentedControlValues = Record<
    TDesignTokensComponentsSegmentedControlKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента SegmentedControl.
export type TDesignTokensComponentsSegmentedControl = {
    SegmentedControl: TDesignTokensComponentsSegmentedControlValue;
};

// Токены компонента SegmentedControl в светлой и темной темах.
export const SegmentedControl_Tokens: TDesignTokensComponentsSegmentedControlValues = {
    General_1_Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-SegmentedControl-General_1_Background)
    General_2_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-SegmentedControl-General_2_Background)

    Secondary_1_Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-SegmentedControl-Secondary_1_Background)
    Secondary_2_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-SegmentedControl-Secondary_2_Background)
};
