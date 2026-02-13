import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { EFontWeightCaption, ECaptionSize, EFontType } from "./enums";
import { ITypographyProps } from "./types";
import { FONT_TYPE_TO_CLASS_NAME_MAP } from "./constants";
import styles from "./styles/Caption.module.less";
import typographyStyles from "./styles/Typography.module.less";

// Соответствие размера имени класса.
const SIZE_TO_CLASS_NAME_MAP: Record<ECaptionSize, string> = {
    [ECaptionSize.C1]: styles.c1,
    [ECaptionSize.C2]: styles.c2,
    [ECaptionSize.D1]: styles.d1,
};

// Соответствие веса шрифта имени класса.
const FONT_WEIGHT_TO_CLASS_NAME_MAP: Record<EFontWeightCaption, string> = {
    [EFontWeightCaption.REGULAR]: styles.regular,
    [EFontWeightCaption.SEMIBOLD]: styles.semibold,
};

/** Свойства компонента Caption. */
export type TCaptionProps<T extends keyof JSX.IntrinsicElements> = {
    /** Размер текста. */
    size: ECaptionSize;
    /** Толщина шрифта. */
    weight?: EFontWeightCaption;
} & ITypographyProps &
    JSX.IntrinsicElements[T];

/** Подпись (типографика). */
export const Caption = forwardRef<HTMLElement, TCaptionProps<keyof JSX.IntrinsicElements>>(
    <T extends keyof JSX.IntrinsicElements = "span">(
        {
            children,
            className,
            size,
            weight = EFontWeightCaption.REGULAR,
            type = EFontType.PRIMARY,
            underline,
            strikethrough,
            tag = "span" as T,
            ...props
        }: TCaptionProps<T>,
        ref: React.ForwardedRef<HTMLElement>,
    ): React.JSX.Element => {
        const classes = clsx(
            typographyStyles.typography,
            styles.caption,
            SIZE_TO_CLASS_NAME_MAP[size],
            FONT_WEIGHT_TO_CLASS_NAME_MAP[weight],
            FONT_TYPE_TO_CLASS_NAME_MAP[type],
            {
                [typographyStyles.strikethrough]: !!strikethrough && !underline,
                [typographyStyles.underline]: !!underline && !strikethrough,
                [typographyStyles.underlineStrikethrough]: !!strikethrough && !!underline,
            },
            className,
        );

        const Tag = tag;

        return (
            <Tag ref={ref} className={classes} {...props}>
                {children}
            </Tag>
        );
    },
);

Caption.displayName = "Caption";
