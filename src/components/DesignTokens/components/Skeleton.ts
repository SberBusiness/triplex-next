import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Skeleton.
export const designTokensComponentsSkeletonKeys = [
    "BackgroundColor_Type1_Start",
    "BackgroundColor_Type1_End",
    "BackgroundColor_Type2_Start",
    "BackgroundColor_Type2_End",
    "BackgroundColor_Type3_Start",
    "BackgroundColor_Type3_End",
] as const;
// Тип, содержащий названия токенов компонента Skeleton.
export type TDesignTokensComponentsSkeletonKeys = (typeof designTokensComponentsSkeletonKeys)[number];
// Тип, содержащий названия токенов компонента Skeleton и их значения.
export type TDesignTokensComponentsSkeletonValue = Record<TDesignTokensComponentsSkeletonKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Skeleton и их значения в светлой и темной теме.
export type TDesignTokensComponentsSkeletonValues = Record<TDesignTokensComponentsSkeletonKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Skeleton.
export type TDesignTokensComponentsSkeleton = { Skeleton: TDesignTokensComponentsSkeletonValue };

// Токены компонента Skeleton в светлой и темной темах.
export const Skeleton_Tokens: TDesignTokensComponentsSkeletonValues = {
    BackgroundColor_Type1_Start: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Skeleton-BackgroundColor_Type1_Start)
    BackgroundColor_Type1_End: [{ ref: "ColorNeutral.40" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-Skeleton-BackgroundColor_Type1_End)

    BackgroundColor_Type2_Start: [{ ref: "ColorDarkNeutralAlpha.100" }, { ref: "ColorNeutralAlpha.100" }], // var(--triplex-next-Skeleton-BackgroundColor_Type2_Start)
    BackgroundColor_Type2_End: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-Skeleton-BackgroundColor_Type2_End)

    BackgroundColor_Type3_Start: [{ ref: "ColorNeutralAlpha.70" }, { ref: "ColorDarkNeutralAlpha.80" }], // var(--triplex-next-Skeleton-BackgroundColor_Type3_Start)
    BackgroundColor_Type3_End: [{ ref: "ColorNeutralAlpha.90" }, { ref: "ColorDarkNeutralAlpha.70" }], // var(--triplex-next-Skeleton-BackgroundColor_Type3_End)
};
