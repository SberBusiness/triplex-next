import React from "react";
import clsx from "clsx";
import { IAvatarProps } from "./types";
import { EAvatarSize } from "./enums";
import styles from "./styles/Avatar.module.less";

// Соответствие размера имени класса.
const sizeToClassNameMap = {
    [EAvatarSize.XXS]: styles.xxs,
    [EAvatarSize.XS]: styles.xs,
    [EAvatarSize.SM]: styles.sm,
    [EAvatarSize.MD]: styles.md,
    [EAvatarSize.LG]: styles.lg,
    [EAvatarSize.XL]: styles.xl,
    [EAvatarSize.XXL]: styles.xxl,
};

/** Аватар, предназначен для отображения изображений профиля пользователя, инициалов или иконок. */
export const Avatar = React.forwardRef<HTMLDivElement, IAvatarProps>(({ className, size, ...restProps }, ref) => (
    <div className={clsx(styles.avatar, sizeToClassNameMap[size], className)} {...restProps} ref={ref} />
));

Avatar.displayName = "Avatar";
