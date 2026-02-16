import React from "react";
import { clsx } from "clsx";
import { EFontType, EFontWeightTitle, ETitleSize } from "./enums";
import { ITypographyProps } from "./types";
import { FONT_TYPE_TO_CLASS_NAME_MAP } from "./constants";
import { PolymorphicComponentPropsWithRef } from "../../types/CoreTypes";
import styles from "./styles/Title.module.less";
import typographyStyles from "./styles/Typography.module.less";

// Соответствие размера имени класса.
const SIZE_TO_CLASS_NAME_MAP: Record<ETitleSize, string> = {
    [ETitleSize.H1]: styles.h1,
    [ETitleSize.H2]: styles.h2,
    [ETitleSize.H3]: styles.h3,
};

// Соответствие веса шрифта имени класса.
const FONT_WEIGHT_TO_CLASS_NAME_MAP: Record<EFontWeightTitle, string> = {
    [EFontWeightTitle.MEDIUM]: styles.medium,
    [EFontWeightTitle.REGULAR]: styles.regular,
    [EFontWeightTitle.SEMIBOLD]: styles.semibold,
    [EFontWeightTitle.BOLD]: styles.bold,
};

interface ITitleProps extends ITypographyProps {
    /** Размер текста. */
    size: ETitleSize;
    /** Толщина шрифта. */
    weight?: EFontWeightTitle;
}

/** Свойства компонента Text. */
export type TTitleProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<T, ITitleProps>;

type TitleComponent = (<T extends React.ElementType = "span">(props: TTitleProps<T>) => React.ReactElement | null) & {
    displayName?: string;
};

/** Заголовок (типографика). */
export const Title: TitleComponent = React.forwardRef(
    <T extends React.ElementType = `h1`>(
        {
            children,
            className,
            size,
            tag,
            weight = EFontWeightTitle.SEMIBOLD,
            type = EFontType.PRIMARY,
            underline,
            strikethrough,
            ...props
        }: TTitleProps<T>,
        ref: React.ForwardedRef<HTMLElement>,
    ) => {
        const classes = clsx(
            typographyStyles.typography,
            styles.title,
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

        const Tag = tag || "h1";

        return (
            <Tag ref={ref} className={classes} {...props}>
                {children}
            </Tag>
        );
    },
);

Title.displayName = "Title";
