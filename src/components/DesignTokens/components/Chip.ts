import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента Chip.
export const designTokensComponentsChipKeys = [
    "Background_Active",
    "Background_Default",
    "Background_Disabled",
    "Background_Hover",
    "Background_Selected_Active",
    "Background_Selected_Default",
    "Background_Selected_Disabled",
    "Background_Selected_Hover",

    "Color_Active",
    "Color_Default",
    "Color_Disabled",
    "Color_Hover",
    "Color_Selected_Active",
    "Color_Selected_Default",
    "Color_Selected_Disabled",
    "Color_Selected_Hover",

    "Shadow_Focus",
] as const;
// Тип, содержащий названия токенов компонента Chip.
export type TDesignTokensComponentsChipKeys = (typeof designTokensComponentsChipKeys)[number];
// Тип, содержащий названия токенов компонента Chip и их значения.
export type TDesignTokensComponentsChipValue = Record<TDesignTokensComponentsChipKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Chip и их значения в светлой и темной теме.
export type TDesignTokensComponentsChipValues = Record<TDesignTokensComponentsChipKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Chip.
export type TDesignTokensComponentsChip = { Chip: TDesignTokensComponentsChipValue };

// Токены компонента Chip в светлой и темной темах.
export const Chip_Tokens: TDesignTokensComponentsChipValues = {
    Background_Active: [{ ref: "ColorNeutral.40" }, { ref: "ColorDarkNeutral.100" }], // var(--triplex-next-Chip-Background_Active)
    Background_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-Chip-Background_Default)
    Background_Disabled: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-Chip-Background_Disabled)
    Background_Hover: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.90" }], // var(--triplex-next-Chip-Background_Hover)
    Background_Selected_Active: [{ ref: "ColorDarkNeutral.100" }, { ref: "ColorNeutral.40" }], // var(--triplex-next-Chip-Background_Selected_Active)
    Background_Selected_Default: [{ ref: "ColorDarkNeutral.70" }, { ref: "ColorNeutral.90" }], // var(--triplex-next-Chip-Background_Selected_Default)
    Background_Selected_Disabled: [{ ref: "ColorDarkNeutral.60" }, { ref: "ColorNeutral.90" }], // var(--triplex-next-Chip-Background_Selected_Disabled)
    Background_Selected_Hover: [{ ref: "ColorDarkNeutral.90" }, { ref: "ColorNeutral.70" }], // var(--triplex-next-Chip-Background_Selected_Hover)

    Color_Active: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Chip-Color_Active)
    Color_Default: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Chip-Color_Default)
    Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-Chip-Color_Disabled)
    Color_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Chip-Color_Hover)
    Color_Selected_Active: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorDarkNeutralAlpha.0" }], // var(--triplex-next-Chip-Color_Selected_Active)
    Color_Selected_Default: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorDarkNeutralAlpha.0" }], // var(--triplex-next-Chip-Color_Selected_Default)
    Color_Selected_Disabled: [{ ref: "ColorNeutralAlpha.80" }, { ref: "ColorDarkNeutralAlpha.70" }], // var(--triplex-next-Chip-Color_Selected_Disabled)
    Color_Selected_Hover: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorDarkNeutralAlpha.0" }], // var(--triplex-next-Chip-Color_Selected_Hover)

    Shadow_Focus: [{ value: "0 0 0 1px #FFD169 inset" }, { value: "0 0 0 1px #FFD169 inset" }], // var(--triplex-next-Chip-Shadow_Focus)
};
