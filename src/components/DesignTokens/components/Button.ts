import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Button.
export const designTokensComponentsButtonKeys = [
    "General_Background_Active",
    "General_Background_Default",
    "General_Background_Disabled",
    "General_Background_Hover",
    "General_Color_Active",
    "General_Color_Default",
    "General_Color_Disabled",
    "General_Color_Hover",
    "General_Shadow_Focus",

    "Secondary_Background_Active",
    "Secondary_Background_Default",
    "Secondary_Background_Disabled",
    "Secondary_Background_Hover",
    "Secondary_Color_Active",
    "Secondary_Color_Default",
    "Secondary_Color_Disabled",
    "Secondary_Color_Hover",
    "Secondary_Shadow_Focus",

    "Danger_Background_Active",
    "Danger_Background_Default",
    "Danger_Background_Disabled",
    "Danger_Background_Hover",
    "Danger_Color_Active",
    "Danger_Color_Default",
    "Danger_Color_Disabled",
    "Danger_Color_Hover",
    "Danger_Shadow_Focus",

    "Icon_Shadow_Focus",

    "Link_Color_Active",
    "Link_Color_Default",
    "Link_Color_Disabled",
    "Link_Color_Hover",
    "Link_Shadow_Focus",
] as const;

// Тип, содержащий названия токенов компонента Button.
export type TDesignTokensComponentsButtonKeys = (typeof designTokensComponentsButtonKeys)[number];
// Тип, содержащий названия токенов компонента Button и их значения.
export type TDesignTokensComponentsButtonValue = Record<TDesignTokensComponentsButtonKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Button и их значения в светлой и темной теме.
export type TDesignTokensComponentsButtonValues = Record<TDesignTokensComponentsButtonKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Button.
export type TDesignTokensComponentsButton = { Button: TDesignTokensComponentsButtonValue };

// Токены компонента Button в светлой и темной темах.
export const Button_Tokens: TDesignTokensComponentsButtonValues = {
    General_Background_Active: [{ ref: "ColorBrand.30" }, { ref: "ColorBrand.30" }], // var(--triplex-next-Button-General_Background_Active)
    General_Background_Default: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-Button-General_Background_Default)
    General_Background_Disabled: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.40" }], // var(--triplex-next-Button-General_Background_Disabled)
    General_Background_Hover: [{ ref: "ColorBrand.60" }, { ref: "ColorBrand.60" }], // var(--triplex-next-Button-General_Background_Hover)
    General_Color_Active: [{ ref: "ColorBasicAlpha.0" }, { ref: "ColorBasicAlpha.0" }], // var(--triplex-next-Button-General_Color_Active)
    General_Color_Default: [{ ref: "ColorBasicAlpha.0" }, { ref: "ColorBasicAlpha.0" }], // var(--triplex-next-Button-General_Color_Default)
    General_Color_Disabled: [{ ref: "ColorDarkBasicAlpha.90" }, { ref: "ColorBasicAlpha.90" }], // var(--triplex-next-Button-General_Color_Disabled)
    General_Color_Hover: [{ ref: "ColorBasicAlpha.0" }, { ref: "ColorBasicAlpha.0" }], // var(--triplex-next-Button-General_Color_Hover)
    General_Shadow_Focus: [{ value: "0 0 0 1px #FFDD64 inset" }, { value: "0 0 0 1px #FFDD64 inset" }], // var(--triplex-next-Button-General_Shadow_Focus)

    Secondary_Background_Active: [{ ref: "ColorNeutral.60" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-Button-Secondary_Background_Active)
    Secondary_Background_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Button-Secondary_Background_Default)
    Secondary_Background_Disabled: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Button-Secondary_Background_Disabled)
    Secondary_Background_Hover: [{ ref: "ColorNeutral.80" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-Button-Secondary_Background_Hover)
    Secondary_Color_Active: [{ ref: "ColorBrand.30" }, { ref: "ColorBrand.40" }], // var(--triplex-next-Button-Secondary_Color_Active)
    Secondary_Color_Default: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.60" }], // var(--triplex-next-Button-Secondary_Color_Default)
    Secondary_Color_Disabled: [{ ref: "ColorDarkBasicAlpha.90" }, { ref: "ColorBasicAlpha.90" }], // var(--triplex-next-Button-Secondary_Color_Disabled)
    Secondary_Color_Hover: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.70" }], // var(--triplex-next-Button-Secondary_Color_Hover)
    Secondary_Shadow_Focus: [{ value: "0 0 0 1px #FFDD64 inset" }, { value: "0 0 0 1px #FFDD64 inset" }], // var(--triplex-next-Button-Secondary_Shadow_Focus)

    Danger_Background_Active: [{ ref: "ColorError.30" }, { ref: "ColorWarning.80" }], // var(--triplex-next-Button-Danger_Background_Active)
    Danger_Background_Default: [{ ref: "ColorError.50" }, { ref: "ColorError.50" }], // var(--triplex-next-Button-Danger_Background_Default)
    Danger_Background_Disabled: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.40" }], // var(--triplex-next-Button-Danger_Background_Disabled)
    Danger_Background_Hover: [{ ref: "ColorError.60" }, { ref: "ColorError.60" }], // var(--triplex-next-Button-Danger_Background_Hover)
    Danger_Color_Active: [{ ref: "ColorBasicAlpha.0" }, { ref: "ColorBasicAlpha.0" }], // var(--triplex-next-Button-Danger_Color_Active)
    Danger_Color_Default: [{ ref: "ColorBasicAlpha.0" }, { ref: "ColorBasicAlpha.0" }], // var(--triplex-next-Button-Danger_Color_Default)
    Danger_Color_Disabled: [{ ref: "ColorDarkBasicAlpha.90" }, { ref: "ColorBasicAlpha.90" }], // var(--triplex-next-Button-Danger_Color_Disabled)
    Danger_Color_Hover: [{ ref: "ColorBasicAlpha.0" }, { ref: "ColorBasicAlpha.0" }], // var(--triplex-next-Button-Danger_Color_Hover)
    Danger_Shadow_Focus: [{ value: "0 0 0 1px #FFDD64 inset" }, { value: "0 0 0 1px #FFDD64 inset" }], // var(--triplex-next-Button-Danger_Shadow_Focus)

    Icon_Shadow_Focus: [{ value: "0 0 0 1px #FFDD64" }, { value: "0 0 0 1px #FFDD64" }], // var(--triplex-next-Button-Icon_Shadow_Focus)

    Link_Color_Active: [{ ref: "ColorBrand.30" }, { ref: "ColorBrand.40" }], // var(--triplex-next-Button-Link_Color_Active)
    Link_Color_Default: [{ ref: "ColorBrand.40" }, { ref: "ColorBrand.60" }], // var(--triplex-next-Button-Link_Color_Default)
    Link_Color_Disabled: [{ ref: "ColorDarkBasicAlpha.90" }, { ref: "ColorBasicAlpha.90" }], // var(--triplex-next-Button-Link_Color_Disabled)
    Link_Color_Hover: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.70" }], // var(--triplex-next-Button-Link_Color_Hover)
    Link_Shadow_Focus: [{ value: "0 0 0 1px #FFDD64 inset" }, { value: "0 0 0 1px #FFDD64 inset" }], // var(--triplex-next-Button-Link_Shadow_Focus)
};
