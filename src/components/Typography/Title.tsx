import React from 'react';
import {clsx} from 'clsx';
import {EFontType, EFontWeightTitle, ETitleSize} from './enums';
import {ITypographyProps} from './types';
import {mapTitleSizeToCssClass, mapFontTypeToCssClass, mapFontWeightTitleToCssClass} from './utils';
import styles from './styles/Typography.module.less';

/** Свойства компонента Title. */
type TTitleProps<T extends keyof JSX.IntrinsicElements> = {
    /** Размер текста. */
    size: ETitleSize;
    /** Толщина шрифта. */
    weight?: EFontWeightTitle;
} & ITypographyProps &
    JSX.IntrinsicElements[T];

/** Заголовок (типографика). */
export function Title<T extends keyof JSX.IntrinsicElements = `h1`>({
    children,
    className,
    size,
    tag = `h${size}`,
    type = EFontType.PRIMARY,
    weight = EFontWeightTitle.SEMIBOLD,
    underline,
    strikethrough,
    ...props
}: TTitleProps<T>): JSX.Element {
    const classes = clsx(
        styles.typography,
        styles.title,
        mapTitleSizeToCssClass[size],
        mapFontTypeToCssClass[type],
        mapFontWeightTitleToCssClass[weight],
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

Title.displayName = 'Title';
