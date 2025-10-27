import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sber-business/triplex/components/DesignTokens/types/DesignTokenTypes";

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
    Background_Active: [{ ref: "Neutral.500" }, { ref: "Neutral.900" }], // var(--triplex-Chip-Background_Active)
    Background_Default: [{ ref: "Neutral.100" }, { ref: "Basic.500" }], // var(--triplex-Chip-Background_Default)
    Background_Disabled: [{ ref: "Neutral.100" }, { ref: "Basic.500" }], // var(--triplex-Chip-Background_Disabled)
    Background_Hover: [{ ref: "Neutral.300" }, { ref: "Basic.300" }], // var(--triplex-Chip-Background_Hover)
    Background_Selected_Active: [{ ref: "Neutral.900" }, { ref: "Neutral.700" }], // var(--triplex-Chip-Background_Selected_Active)
    Background_Selected_Default: [{ ref: "Basic.700" }, { ref: "Neutral.100" }], // var(--triplex-Chip-Background_Selected_Default)
    Background_Selected_Disabled: [{ ref: "Basic.700" }, { ref: "Neutral.100" }], // var(--triplex-Chip-Background_Selected_Disabled)
    Background_Selected_Hover: [{ ref: "Basic.300" }, { ref: "Neutral.500" }], // var(--triplex-Chip-Background_Selected_Hover)

    Color_Active: [{ ref: "Basic.700" }, { ref: "Neutral.100" }], // var(--triplex-Chip-Color_Active)
    Color_Default: [{ ref: "Basic.700" }, { ref: "Neutral.100" }], // var(--triplex-Chip-Color_Default)
    Color_Disabled: [{ ref: "Neutral.700" }, { ref: "Basic.300" }], // var(--triplex-Chip-Color_Disabled)
    Color_Hover: [{ ref: "Basic.700" }, { ref: "Neutral.100" }], // var(--triplex-Chip-Color_Hover)
    Color_Selected_Active: [{ ref: "Neutral.100" }, { ref: "Basic.700" }], // var(--triplex-Chip-Color_Selected_Active)
    Color_Selected_Default: [{ ref: "Neutral.100" }, { ref: "Basic.700" }], // var(--triplex-Chip-Color_Selected_Default)
    Color_Selected_Disabled: [{ ref: "Basic.300" }, { ref: "Neutral.700" }], // var(--triplex-Chip-Color_Selected_Disabled)
    Color_Selected_Hover: [{ ref: "Neutral.100" }, { ref: "Basic.700" }], // var(--triplex-Chip-Color_Selected_Hover)

    Shadow_Focus: [{ value: "0 0 0 1px #FFDD64 inset" }, { value: "0 0 0 1px #FFDD64 inset" }], // var(--triplex-Chip-Shadow_Focus)
};
