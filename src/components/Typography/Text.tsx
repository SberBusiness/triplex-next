import React from "react";
import { clsx } from "clsx";
import { EFontType, EFontWeightText, ELineType, ETextSize } from "./enums";
import { ITypographyProps } from "./types";
import { FONT_TYPE_TO_CLASS_NAME_MAP } from "./constants";
import { PolymorphicComponentPropsWithRef } from "../../types/CoreTypes";
import styles from "./styles/Text.module.less";
import typographyStyles from "./styles/Typography.module.less";

// Соответствие размера имени класса.
const SIZE_TO_CLASS_NAME_MAP: Record<ETextSize, string> = {
    [ETextSize.B1]: styles.b1,
    [ETextSize.B2]: styles.b2,
    [ETextSize.B3]: styles.b3,
    [ETextSize.B4]: styles.b4,
};

// Соответствие веса шрифта имени класса.
const FONT_WEIGHT_TO_CLASS_NAME_MAP: Record<EFontWeightText, string> = {
    [EFontWeightText.REGULAR]: styles.regular,
    [EFontWeightText.SEMIBOLD]: styles.semibold,
};

// Соответствие типа высоты строки имени класса.
const LINE_TYPE_TO_CLASS_NAME_MAP: Record<ELineType, string> = {
    [ELineType.NORMAL]: "",
    [ELineType.COMPACT]: styles.compact,
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
            SIZE_TO_CLASS_NAME_MAP[size],
            FONT_WEIGHT_TO_CLASS_NAME_MAP[weight],
            LINE_TYPE_TO_CLASS_NAME_MAP[line],
            FONT_TYPE_TO_CLASS_NAME_MAP[type],
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
