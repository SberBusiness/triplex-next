import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Skeleton.
export const designTokensComponentsSkeletonKeys = [
    "BackgroundColor_Light_Start",
    "BackgroundColor_Light_End",
    "BackgroundColor_Dark_Start",
    "BackgroundColor_Dark_End",
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
    BackgroundColor_Light_Start: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Skeleton-BackgroundColor_Light_Start)
    BackgroundColor_Light_End: [{ ref: "ColorNeutral.40" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-Skeleton-BackgroundColor_Light_End)

    BackgroundColor_Dark_Start: [{ ref: "ColorDarkNeutralAlpha.100" }, { ref: "ColorNeutralAlpha.90" }], // var(--triplex-next-Skeleton-BackgroundColor_Dark_Start)
    BackgroundColor_Dark_End: [{ ref: "ColorDarkNeutralAlpha.90" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-Skeleton-BackgroundColor_Dark_End)
};
