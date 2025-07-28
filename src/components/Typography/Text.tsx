import React from 'react';
import {clsx} from 'clsx';
import {EFontType, EFontWeightText, ELineType, ETextSize} from './enums';
import {ITypographyProps} from './types';
import {mapTextSizeToCssClass, mapFontTypeToCssClass, mapFontWeightTextToCssClass, mapTextLineTypeToCssClass} from './utils';
import styles from './styles/Typography.module.less';

/** Свойства компонента Text. */
type TTextProps<T extends keyof JSX.IntrinsicElements> = {
    /** Размер текста. */
    size: ETextSize;
    /** Высота блока строки. */
    line?: ELineType;
     /** Толщина шрифта. */
     weight?: EFontWeightText;
} & ITypographyProps &
    JSX.IntrinsicElements[T];

/** Текст (типографика). */
export function Text<T extends keyof JSX.IntrinsicElements = 'span'>({
    children,
    className,
    size,
    tag = 'span',
    type = EFontType.PRIMARY,
    weight = EFontWeightText.REGULAR,
    line = ELineType.NORMAL,
    underline,
    strikethrough,
    ...props
}: TTextProps<T>): JSX.Element {
    const classes = clsx(
        styles.typography,
        styles.text,
        mapTextSizeToCssClass[size],
        mapFontTypeToCssClass[type],
        mapFontWeightTextToCssClass[weight],
        mapTextLineTypeToCssClass[line],
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

Text.displayName = 'Text';
