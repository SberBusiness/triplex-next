import React from "react";
import { clsx } from "clsx";
import { EFontType, EFontWeightText, ELineType, ETextSize } from "./enums";
import { ITypographyProps } from "./types";
import { mapFontTypeToCssClass } from "./utils";
import { PolymorphicComponentPropsWithRef } from "../../types/CoreTypes";
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

interface ITextProps extends ITypographyProps {
    /** Размер текста. */
    size: ETextSize;
    /** Высота блока строки. */
    line?: ELineType;
    weight?: EFontWeightText;
}

/** Свойства компонента Text. */
export type TTextProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<T, ITextProps>;

type TextComponent = (<T extends React.ElementType = "span">(props: TTextProps<T>) => React.ReactElement | null) & {
    displayName?: string;
};

/** Текст (типографика). */
export const Text: TextComponent = React.forwardRef(
    <T extends React.ElementType = "span">(
        {
            children,
            className,
            size,
            tag,
            type = EFontType.PRIMARY,
            weight = EFontWeightText.REGULAR,
            line = ELineType.NORMAL,
            underline,
            strikethrough,
            ...props
        }: TTextProps<T>,
        ref: React.ForwardedRef<HTMLElement>,
    ) => {
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

        const Tag = tag || "span";

        return (
            <Tag ref={ref} className={classes} {...props}>
                {children}
            </Tag>
        );
    },
);

Text.displayName = "Text";
