import React from 'react';
import { clsx } from 'clsx';
import { EFontType, EFontWeightText, ECaptionSize } from './enums';
import { ITypographyProps } from './types';
import {mapFontTypeToCssClass} from './utils';

import styles from './styles/Caption.module.less';
import typographyStyles from './styles/Typography.module.less';

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

/** Свойства компонента Text. */
type TTextProps<T extends keyof JSX.IntrinsicElements> = {
    /** Размер текста. */
    size: ECaptionSize;
    /** Толщина шрифта. */
    weight?: EFontWeightText;
} & ITypographyProps &
    JSX.IntrinsicElements[T];

/** Текст (типографика). */
export function Caption<T extends keyof JSX.IntrinsicElements = 'span'>({
    children,
    className,
    size,
    tag = 'span',
    type = EFontType.PRIMARY,
    weight = EFontWeightText.REGULAR,
    underline,
    strikethrough,
    ...props
}: TTextProps<T>): JSX.Element {
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
        className
    );

    const Tag = tag;

    return (
        <Tag className={classes} {...props}>
            {children}
        </Tag>
    );
}

Caption.displayName = 'Caption';
