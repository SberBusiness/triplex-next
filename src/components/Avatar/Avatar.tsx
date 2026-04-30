import React from "react";
import clsx from "clsx";
import { IAvatarProps } from "./types";
import { EAvatarSize, TAvatarBorderRadius } from "./enums";
import styles from "./styles/Avatar.module.less";

// Соответствие размера имени класса.
const SIZE_TO_CLASS_NAME_MAP: Record<EAvatarSize, string> = {
    [EAvatarSize.XXS]: styles.xxs,
    [EAvatarSize.XS]: styles.xs,
    [EAvatarSize.SM]: styles.sm,
    [EAvatarSize.MD]: styles.md,
    [EAvatarSize.LG]: styles.lg,
    [EAvatarSize.XL]: styles.xl,
    [EAvatarSize.XXL]: styles.xxl,
};

const BORDER_RADIUS_TO_CLASS_NAME_MAP: Record<TAvatarBorderRadius, string> = {
    10: styles.borderRadius10,
    12: styles.borderRadius12,
    14: styles.borderRadius14,
};

/** Аватар, предназначен для отображения изображений профиля пользователя, инициалов или иконок. */
export const Avatar = React.forwardRef<HTMLDivElement, IAvatarProps>(
    ({ className, size, borderRadius = 10, ...restProps }, ref) => (
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
