/** Palette for the experimental skins, scoped to the demo through ThemeProvider. */
export const LAB_TOKENS = {
    ColorNeutral: {
        100: { value: "#ffffff" },
        95: { value: "#f8f7f3" },
        90: { value: "#eae8e1" },
        80: { value: "#c0c0c0" },
        70: { value: "#aaaaaa" },
        50: { value: "#808080" },
        30: { value: "#5b5b61" },
        10: { value: "#202027" },
        0: { value: "#000000" },
    },
    ColorBrand: {
        0: { value: "#000080" },
        20: { value: "#074477" },
        30: { value: "#008080" },
        40: { value: "#0069aa" },
        50: { value: "#0086d8" },
        60: { value: "#18abef" },
        70: { value: "#6bd4ff" },
        80: { value: "#b6e7ff" },
        90: { value: "#e0f3ff" },
        100: { value: "#f0faff" },
    },
    ColorInfo: {
        10: { value: "#37136d" },
        30: { value: "#6626b4" },
        50: { value: "#9063ef" },
        80: { value: "#d4bffa" },
        90: { value: "#eaddff" },
        100: { value: "#f8f1ff" },
    },
    ColorWarning: {
        20: { value: "#795207" },
        40: { value: "#b9760b" },
        50: { value: "#efa61b" },
        70: { value: "#ffd84d" },
        90: { value: "#fff09b" },
        100: { value: "#fffce2" },
    },
    ColorError: { 50: { value: "#ec358e" }, 70: { value: "#ff8caa" } },
    ColorSuccess: { 50: { value: "#66b323" }, 80: { value: "#c4e79b" } },
};

export const SKIN_TOKENS = {
    ...LAB_TOKENS,
    FormField: {
        Background_Default: { value: "#ffffff" },
        Background_Hover: { value: "#ffffff" },
        Background_Active: { value: "#ffffff" },
        Input_Color_Default: { value: "#202027" },
        Label_Color_Default: { value: "#5b5b61" },
        Shadow_Default: { value: "none" },
        Shadow_Active: { value: "none" },
    },
};
