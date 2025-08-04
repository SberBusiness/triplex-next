import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { EFontType, EFontWeightTitle, ETitleSize } from './enums';
import { ITypographyProps } from './types';
import { mapFontTypeToCssClass } from './utils';
import styles from './styles/Title.module.less';
import typographyStyles from './styles/Typography.module.less';

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

/** Свойства компонента Title. */
type TTitleProps<T extends keyof JSX.IntrinsicElements> = {
    /** Размер текста. */
    size: ETitleSize;
    /** Толщина шрифта. */
    weight?: EFontWeightTitle;
} & ITypographyProps &
    JSX.IntrinsicElements[T];

/** Заголовок (типографика). */
export const Title = forwardRef<HTMLElement, TTitleProps<keyof JSX.IntrinsicElements>>(
    <T extends keyof JSX.IntrinsicElements = 'h1'>({
        children,
        className,
        size,
        tag = `h${size}` as T,
        type = EFontType.PRIMARY,
        weight = EFontWeightTitle.SEMIBOLD,
        underline,
        strikethrough,
        ...props
    }: TTitleProps<T>, ref: React.ForwardedRef<HTMLElement>): JSX.Element => {
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
            className
        );

        const Tag = tag;

        return (
            <Tag ref={ref} className={classes} {...props}>
                {children}
            </Tag>
        );
    }
);

Title.displayName = 'Title';