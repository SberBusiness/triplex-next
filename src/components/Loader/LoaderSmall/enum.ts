/** Тема компонента LoaderSmall. */
export enum ELoaderSmallTheme {
    /** Для светлых поверхностей. */
    BRAND = "brand",
    /** Для тёмных и цветных поверхностей. */
    NEUTRAL = "neutral",
}

/**
 * Размер компонента LoaderSmall.
 * Самим компонентом не используется — размер задаётся общим для библиотеки `EComponentSize`.
 * Сохраняется как часть публичного API для обратной совместимости.
 */
export enum ELoaderSmallSize {
    SM = "sm",
    MD = "md",
    LG = "lg",
}
