import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента SegmentedControlSegment.
export const designTokensComponentsSegmentedControlSegmentKeys = [
    "General_1_Color_Default",
    "General_1_Color_Hover",
    "General_1_Color_Disabled",
    "General_1_Color_Selected_Default",
    "General_1_Color_Selected_Hover",
    "General_1_Color_Selected_Disabled",

    "General_1_Background_Default",
    "General_1_Background_Hover",
    "General_1_Background_Disabled",
    "General_1_Background_Selected_Default",
    "General_1_Background_Selected_Hover",
    "General_1_Background_Selected_Disabled",

    "General_2_Color_Default",
    "General_2_Color_Hover",
    "General_2_Color_Disabled",
    "General_2_Color_Selected_Default",
    "General_2_Color_Selected_Hover",
    "General_2_Color_Selected_Disabled",

    "General_2_Background_Default",
    "General_2_Background_Hover",
    "General_2_Background_Disabled",
    "General_2_Background_Selected_Default",
    "General_2_Background_Selected_Hover",
    "General_2_Background_Selected_Disabled",

    "Secondary_1_Color_Default",
    "Secondary_1_Color_Hover",
    "Secondary_1_Color_Disabled",
    "Secondary_1_Color_Selected_Default",
    "Secondary_1_Color_Selected_Hover",
    "Secondary_1_Color_Selected_Disabled",

    "Secondary_1_Background_Default",
    "Secondary_1_Background_Hover",
    "Secondary_1_Background_Disabled",
    "Secondary_1_Background_Selected_Default",
    "Secondary_1_Background_Selected_Hover",
    "Secondary_1_Background_Selected_Disabled",

    "Secondary_2_Color_Default",
    "Secondary_2_Color_Hover",
    "Secondary_2_Color_Disabled",
    "Secondary_2_Color_Selected_Default",
    "Secondary_2_Color_Selected_Hover",
    "Secondary_2_Color_Selected_Disabled",

    "Secondary_2_Background_Default",
    "Secondary_2_Background_Hover",
    "Secondary_2_Background_Disabled",
    "Secondary_2_Background_Selected_Default",
    "Secondary_2_Background_Selected_Hover",
    "Secondary_2_Background_Selected_Disabled",

    "BorderColor_Default",
    "BorderColor_Focus",
] as const;
// Тип, содержащий названия токенов компонента SegmentedControlSegment.
export type TDesignTokensComponentsSegmentedControlSegmentKeys =
    (typeof designTokensComponentsSegmentedControlSegmentKeys)[number];
// Тип, содержащий названия токенов компонента SegmentedControlSegment и их значения.
export type TDesignTokensComponentsSegmentedControlSegmentValue = Record<
    TDesignTokensComponentsSegmentedControlSegmentKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента SegmentedControlSegment и их значения в светлой и темной теме.
export type TDesignTokensComponentsSegmentedControlSegmentValues = Record<
    TDesignTokensComponentsSegmentedControlSegmentKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента SegmentedControlSegment.
export type TDesignTokensComponentsSegmentedControlSegment = {
    SegmentedControlSegment: TDesignTokensComponentsSegmentedControlSegmentValue;
};

// Токены компонента SegmentedControlSegment в светлой и темной темах.
export const SegmentedControlSegment_Tokens: TDesignTokensComponentsSegmentedControlSegmentValues = {
    General_1_Color_Default: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-SegmentedControlSegment-General_1_Color_Default)
    General_1_Color_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-SegmentedControlSegment-General_1_Color_Hover)
    General_1_Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SegmentedControlSegment-General_1_Color_Disabled)
    General_1_Color_Selected_Default: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorDarkNeutralAlpha.0" }], // var(--triplex-next-SegmentedControlSegment-General_1_Color_Selected_Default)
    General_1_Color_Selected_Hover: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorDarkNeutralAlpha.0" }], // var(--triplex-next-SegmentedControlSegment-General_1_Color_Selected_Hover)
    General_1_Color_Selected_Disabled: [{ ref: "ColorNeutralAlpha.80" }, { ref: "ColorDarkNeutralAlpha.70" }], // var(--triplex-next-SegmentedControlSegment-General_1_Color_Selected_Disabled)

    General_1_Background_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-SegmentedControlSegment-General_1_Background_Default)
    General_1_Background_Hover: [{ ref: "ColorNeutral.40" }, { ref: "ColorDarkNeutral.90" }], // var(--triplex-next-SegmentedControlSegment-General_1_Background_Hover)
    General_1_Background_Disabled: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-SegmentedControlSegment-General_1_Background_Disabled)
    General_1_Background_Selected_Default: [{ ref: "ColorDarkNeutral.70" }, { ref: "ColorNeutral.100" }], // var(--triplex-next-SegmentedControlSegment-General_1_Background_Selected_Default)
    General_1_Background_Selected_Hover: [{ ref: "ColorDarkNeutral.90" }, { ref: "ColorNeutral.40" }], // var(--triplex-next-SegmentedControlSegment-General_1_Background_Selected_Hover)
    General_1_Background_Selected_Disabled: [{ ref: "ColorDarkNeutral.60" }, { ref: "ColorNeutral.90" }], // var(--triplex-next-SegmentedControlSegment-General_1_Background_Selected_Disabled)

    General_2_Color_Default: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-SegmentedControlSegment-General_2_Color_Default)
    General_2_Color_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-SegmentedControlSegment-General_2_Color_Hover)
    General_2_Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SegmentedControlSegment-General_2_Color_Disabled)
    General_2_Color_Selected_Default: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorDarkNeutralAlpha.0" }], // var(--triplex-next-SegmentedControlSegment-General_2_Color_Selected_Default)
    General_2_Color_Selected_Hover: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorDarkNeutralAlpha.0" }], // var(--triplex-next-SegmentedControlSegment-General_2_Color_Selected_Hover)
    General_2_Color_Selected_Disabled: [{ ref: "ColorNeutralAlpha.80" }, { ref: "ColorDarkNeutralAlpha.70" }], // var(--triplex-next-SegmentedControlSegment-General_2_Color_Selected_Disabled)

    General_2_Background_Default: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-SegmentedControlSegment-General_2_Background_Default)
    General_2_Background_Hover: [{ ref: "ColorNeutral.80" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-SegmentedControlSegment-General_2_Background_Hover)
    General_2_Background_Disabled: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-SegmentedControlSegment-General_2_Background_Disabled)
    General_2_Background_Selected_Default: [{ ref: "ColorDarkNeutral.70" }, { ref: "ColorNeutral.100" }], // var(--triplex-next-SegmentedControlSegment-General_2_Background_Selected_Default)
    General_2_Background_Selected_Hover: [{ ref: "ColorDarkNeutral.90" }, { ref: "ColorNeutral.40" }], // var(--triplex-next-SegmentedControlSegment-General_2_Background_Selected_Hover)
    General_2_Background_Selected_Disabled: [{ ref: "ColorDarkNeutral.60" }, { ref: "ColorNeutral.90" }], // var(--triplex-next-SegmentedControlSegment-General_2_Background_Selected_Disabled)

    Secondary_1_Color_Default: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-SegmentedControlSegment-Secondary_1_Color_Default)
    Secondary_1_Color_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-SegmentedControlSegment-Secondary_1_Color_Hover)
    Secondary_1_Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SegmentedControlSegment-Secondary_1_Color_Disabled)
    Secondary_1_Color_Selected_Default: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-SegmentedControlSegment-Secondary_1_Color_Selected_Default)
    Secondary_1_Color_Selected_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-SegmentedControlSegment-Secondary_1_Color_Selected_Default)
    Secondary_1_Color_Selected_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SegmentedControlSegment-Secondary_1_Color_Selected_Disabled)

    Secondary_1_Background_Default: [{ ref: "ColorNeutral.90" }, { value: "ColorDarkNeutral.70" }], // var(--triplex-next-SegmentedControlSegment-Secondary_1_Background_Default)
    Secondary_1_Background_Hover: [{ ref: "ColorNeutral.40" }, { value: "ColorDarkNeutral.90" }], // var(--triplex-next-SegmentedControlSegment-Secondary_1_Background_Hover)
    Secondary_1_Background_Disabled: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-SegmentedControlSegment-Secondary_1_Background_Disabled)
    Secondary_1_Background_Selected_Default: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SegmentedControlSegment-Secondary_1_Background_Selected_Default)
    Secondary_1_Background_Selected_Hover: [{ ref: "ColorNeutral.40" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-SegmentedControlSegment-Secondary_1_Background_Selected_Hover)
    Secondary_1_Background_Selected_Disabled: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SegmentedControlSegment-Secondary_1_Background_Selected_Disabled)

    Secondary_2_Color_Default: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-SegmentedControlSegment-Secondary_2_Color_Default)
    Secondary_2_Color_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-SegmentedControlSegment-Secondary_2_Color_Hover)
    Secondary_2_Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SegmentedControlSegment-Secondary_2_Color_Disabled)
    Secondary_2_Color_Selected_Default: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-SegmentedControlSegment-Secondary_2_Color_Selected_Default)
    Secondary_2_Color_Selected_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-SegmentedControlSegment-Secondary_2_Color_Selected_Default)
    Secondary_2_Color_Selected_Disabled: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SegmentedControlSegment-Secondary_2_Color_Selected_Disabled)

    Secondary_2_Background_Default: [{ ref: "ColorNeutral.100" }, { value: "ColorDarkNeutral.50" }], // var(--triplex-next-SegmentedControlSegment-Secondary_2_Background_Default)
    Secondary_2_Background_Hover: [{ ref: "ColorNeutral.80" }, { value: "ColorNeutralAlpha.80" }], // var(--triplex-next-SegmentedControlSegment-Secondary_2_Background_Hover)
    Secondary_2_Background_Disabled: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-SegmentedControlSegment-Secondary_2_Background_Disabled)
    Secondary_2_Background_Selected_Default: [{ ref: "ColorNeutral.50" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SegmentedControlSegment-Secondary_2_Background_Selected_Default)
    Secondary_2_Background_Selected_Hover: [{ ref: "ColorNeutral.20" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-SegmentedControlSegment-Secondary_2_Background_Selected_Hover)
    Secondary_2_Background_Selected_Disabled: [{ ref: "ColorNeutral.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-SegmentedControlSegment-Secondary_2_Background_Selected_Disabled)

    BorderColor_Default: [{ value: "transparent" }, { value: "transparent" }], // var(--triplex-next-SegmentedControlSegment-BorderColor_Default)
    BorderColor_Focus: [{ ref: "ColorWarning.80" }, { ref: "ColorWarning.80" }], // var(--triplex-next-SegmentedControlSegment-BorderColor_Focus)
};
