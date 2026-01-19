import React from "react";
import { clsx } from "clsx";
import { EFontType, EFontWeightText, ECaptionSize } from "./enums";
import { ITypographyProps } from "./types";
import { mapFontTypeToCssClass } from "./utils";
import { PolymorphicComponentPropsWithRef } from "../../types/CoreTypes";
import styles from "./styles/Caption.module.less";
import typographyStyles from "./styles/Typography.module.less";

/** Соответствие цвета шрифта стилевому классу. */
export const mapFontWeightTextToCssClass = {
    [EFontWeightText.REGULAR]: styles.regular,
    [EFontWeightText.SEMIBOLD]: styles.semibold,
};

/** Соответствие размера подписи стилевому классу. */
export const mapCaptionSizeToCssClass = {
    [ECaptionSize.C1]: styles.c1,
    [ECaptionSize.C2]: styles.c2,
    [ECaptionSize.D1]: styles.d1,
};

interface ICaptionProps extends ITypographyProps {
    /** Размер текста. */
    size: ECaptionSize;
    /** Толщина шрифта. */
    weight?: EFontWeightText;
}

/** Свойства компонента Caption. */
export type TCaptionProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<T, ICaptionProps>;

type TitleComponent = (<T extends React.ElementType = "span">(props: TCaptionProps<T>) => React.ReactElement | null) & {
    displayName?: string;
};

/** Заголовок (типографика). */
export const Caption: TitleComponent = React.forwardRef(
    <T extends React.ElementType = `h1`>(
        {
            children,
            className,
            size,
            tag,
            type = EFontType.PRIMARY,
            weight = EFontWeightText.REGULAR,
            underline,
            strikethrough,
            ...props
        }: TCaptionProps<T>,
        ref: React.ForwardedRef<HTMLElement>,
    ) => {
        const classes = clsx(
            typographyStyles.typography,
            styles.caption,
            mapCaptionSizeToCssClass[size],
            mapFontTypeToCssClass[type],
            mapFontWeightTextToCssClass[weight],
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

Caption.displayName = "Caption";
