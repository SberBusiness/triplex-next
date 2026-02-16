import React from "react";
import { clsx } from "clsx";
import { EFontWeightCaption, ECaptionSize, EFontType } from "./enums";
import { ITypographyProps } from "./types";
import { PolymorphicComponentPropsWithRef } from "../../types/CoreTypes";
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

interface ICaptionProps extends ITypographyProps {
    /** Размер текста. */
    size: ECaptionSize;
    /** Толщина шрифта. */
    weight?: EFontWeightCaption;
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
            weight = EFontWeightCaption.REGULAR,
            type = EFontType.PRIMARY,
            underline,
            strikethrough,
            ...props
        }: TCaptionProps<T>,
        ref: React.ForwardedRef<HTMLElement>,
    ) => {
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

        const Tag = tag || "span";

        return (
            <Tag ref={ref} className={classes} {...props}>
                {children}
            </Tag>
        );
    },
);

Caption.displayName = "Caption";
