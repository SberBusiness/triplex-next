import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { EFontType, EFontWeightText, ELineType, ETextSize } from "./enums";
import { ITypographyProps } from "./types";
import { mapFontTypeToCssClass } from "./utils";
import styles from "./styles/Text.module.less";
import typographyStyles from "./styles/Typography.module.less";

/** Соответствие размера текста стилевому классу. */
export const mapTextSizeToCssClass = {
    [ETextSize.B1]: styles.b1,
    [ETextSize.B2]: styles.b2,
    [ETextSize.B3]: styles.b3,
    [ETextSize.B4]: styles.b4,
};

/** Соответствие цвета шрифта стилевому классу. */
export const mapFontWeightTextToCssClass = {
    [EFontWeightText.REGULAR]: styles.regular,
    [EFontWeightText.SEMIBOLD]: styles.semibold,
};

/** Соответствие типа высоты блока строки стилевому классу. */
export const mapTextLineTypeToCssClass = {
    [ELineType.NORMAL]: "",
    [ELineType.COMPACT]: typographyStyles.compact,
};

/** Свойства компонента Text. */
export type TTextProps<T extends keyof JSX.IntrinsicElements> = {
    /** Размер текста. */
    size: ETextSize;
    /** Высота блока строки. */
    line?: ELineType;
    /** Толщина шрифта. */
    weight?: EFontWeightText;
} & ITypographyProps &
    JSX.IntrinsicElements[T];

/** Текст (типографика). */
export const Text = forwardRef<HTMLElement, TTextProps<keyof JSX.IntrinsicElements>>(
    <T extends keyof JSX.IntrinsicElements = "span">(
        {
            children,
            className,
            size,
            tag = "span" as T,
            type = EFontType.PRIMARY,
            weight = EFontWeightText.REGULAR,
            line = ELineType.NORMAL,
            underline,
            strikethrough,
            ...props
        }: TTextProps<T>,
        ref: React.ForwardedRef<HTMLElement>,
    ): React.JSX.Element => {
        const classes = clsx(
            typographyStyles.typography,
            styles.text,
            mapTextSizeToCssClass[size],
            mapFontTypeToCssClass[type],
            mapFontWeightTextToCssClass[weight],
            mapTextLineTypeToCssClass[line],
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

Text.displayName = "Text";
