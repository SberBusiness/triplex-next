/** Возможные размеры компонента Text. */
export enum ETextSize {
    B1 = "B1", // В дизайне S1, B1
    B2 = "B2", // В дизайне S2, B2
    B3 = "B3", // В дизайне S3, B3
    B4 = "B4", // В дизайне S4, B4
}

/** Возможные размеры компонента Caption. */
export enum ECaptionSize {
    C1 = "C1", // В дизайне C1
    C2 = "C2", // В дизайне C2
    D1 = "D1", // В дизайне D1
}

/** Возможные размеры компонента Title. */
export enum ETitleSize {
    H1 = "h1", // В дизайне H1
    H2 = "h2", // В дизайне H2
    H3 = "h3", // В дизайне H3
}

/** Возможные типы компонентов типографики. */
export enum EFontType {
    PRIMARY = "primary",
    COMPLEMENTARY = "complementary",
    SECONDARY = "secondary",
    TERTIARY = "tertiary",
    DISABLED = "disabled",
    BRAND = "brand",
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
    SYSTEM = "system",

    // Инвертированные цвета
    PRIMARY_INVERT = "primary-invert",
    COMPLEMENTARY_INVERT = "complementary-invert",
    SECONDARY_INVERT = "secondary-invert",
    TERTIARY_INVERT = "tertiary-invert",
    DISABLED_INVERT = "disabled-invert",
    BRAND_INVERT = "brand-invert",
    INFO_INVERT = "info-invert",
    SUCCESS_INVERT = "success-invert",
    WARNING_INVERT = "warning-invert",
    ERROR_INVERT = "error-invert",
    SYSTEM_INVERT = "system-invert",
}

/** Возможные начертания шрифта компонента Text. */
export enum EFontWeightText {
    REGULAR = "regular",
    SEMIBOLD = "semibold",
}

/** Возможные начертания шрифта компонента Caption. */
export enum EFontWeightCaption {
    REGULAR = "regular",
    SEMIBOLD = "semibold",
}

/** Возможные начертания шрифта компонента Title. */
export enum EFontWeightTitle {
    MEDIUM = "medium",
    REGULAR = "regular",
    SEMIBOLD = "semibold",
    BOLD = "bold",
}

/** Возможные типы интерлиньяжа компонентов типографики. */
export enum ELineType {
    NORMAL = "normal",
    COMPACT = "compact",
}
