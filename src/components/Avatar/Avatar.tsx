import React from "react";
import clsx from "clsx";
import { IAvatarProps } from "./types";
import { EAvatarSize, TAvatarBorderRadius } from "./enums";
import styles from "./styles/Avatar.module.less";

/** Соответствие размера имени CSS-класса. */
const SIZE_TO_CLASS_NAME_MAP: Record<EAvatarSize, string> = {
    [EAvatarSize.XXS]: styles.xxs,
    [EAvatarSize.XS]: styles.xs,
    [EAvatarSize.SM]: styles.sm,
    [EAvatarSize.MD]: styles.md,
    [EAvatarSize.LG]: styles.lg,
    [EAvatarSize.XL]: styles.xl,
    [EAvatarSize.XXL]: styles.xxl,
};

/** Соответствие радиуса скругления имени CSS-класса. */
const BORDER_RADIUS_TO_CLASS_NAME_MAP: Record<TAvatarBorderRadius, string> = {
    6: styles.borderRadius6,
    8: styles.borderRadius8,
    10: styles.borderRadius10,
    12: styles.borderRadius12,
    16: styles.borderRadius16,
};

/**
 * Аватар, предназначен для отображения изображений профиля пользователя, инициалов или иконок.
 * Содержимое передаётся через children, фоновое изображение — через className или style.
 */
export const Avatar = React.forwardRef<HTMLDivElement, IAvatarProps>(
    ({ className, size, borderRadius, ...restProps }, ref) => (
        <div
            className={clsx(
                styles.avatar,
                SIZE_TO_CLASS_NAME_MAP[size],
                BORDER_RADIUS_TO_CLASS_NAME_MAP[borderRadius],
                className,
            )}
            {...restProps}
            ref={ref}
        />
    ),
);

Avatar.displayName = "Avatar";
