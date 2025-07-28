import React from 'react';
import {clsx} from 'clsx';
import {EFontType, EFontWeightText, ECaptionSize} from './enums';
import {ITypographyProps} from './types';
import {mapFontTypeToCssClass, mapFontWeightTextToCssClass, mapCaptionSizeToCssClass} from './utils';
import styles from './styles/Typography.module.less';

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
        styles.typography,
        styles.caption,
        mapCaptionSizeToCssClass[size],
        mapFontTypeToCssClass[type],
        mapFontWeightTextToCssClass[weight],
        {
            [styles.strikethrough]: !!strikethrough && !underline,
            [styles.underline]: !!underline && !strikethrough,
            [styles.underlineStrikethrough]: !!strikethrough && !!underline,
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
