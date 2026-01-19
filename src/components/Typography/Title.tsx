import React from "react";
import { clsx } from "clsx";
import { EFontType, EFontWeightTitle, ETitleSize } from "./enums";
import { ITypographyProps } from "./types";
import { mapFontTypeToCssClass } from "./utils";
import { PolymorphicComponentPropsWithRef } from "../../types/CoreTypes";
import styles from "./styles/Title.module.less";
import typographyStyles from "./styles/Typography.module.less";

/** Соответствие размера заголовка стилевому классу. */
export const mapTitleSizeToCssClass = {
    [ETitleSize.H1]: styles.h1,
    [ETitleSize.H2]: styles.h2,
    [ETitleSize.H3]: styles.h3,
};

/** Соответствие цвета шрифта стилевому классу. */
export const mapFontWeightTitleToCssClass = {
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
            type = EFontType.PRIMARY,
            weight = EFontWeightTitle.SEMIBOLD,
            underline,
            strikethrough,
            ...props
        }: TTitleProps<T>,
        ref: React.ForwardedRef<HTMLElement>,
    ) => {
        const classes = clsx(
            typographyStyles.typography,
            styles.title,
            mapTitleSizeToCssClass[size],
            mapFontTypeToCssClass[type],
            mapFontWeightTitleToCssClass[weight],
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
