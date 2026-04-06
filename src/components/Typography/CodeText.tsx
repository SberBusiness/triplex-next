import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { EFontType } from "./enums";
import { ITypographyProps } from "./types";
import { FONT_TYPE_TO_CLASS_NAME_MAP } from "./constants";
import styles from "./styles/CodeText.module.less";
import typographyStyles from "./styles/Typography.module.less";

/** Свойства компонента CodeText. */
export type TCodeTextProps<T extends keyof JSX.IntrinsicElements> = ITypographyProps & JSX.IntrinsicElements[T];

/** Моноширинный текст (типографика). */
export const CodeText = forwardRef<HTMLElement, TCodeTextProps<keyof JSX.IntrinsicElements>>(
    <T extends keyof JSX.IntrinsicElements = "span">(
        {
            children,
            className,
            type = EFontType.PRIMARY,
            underline,
            strikethrough,
            tag = "span" as T,
            ...props
        }: TCodeTextProps<T>,
        ref: React.ForwardedRef<HTMLElement>,
    ): React.JSX.Element => {
        const classes = clsx(
            typographyStyles.typography,
            styles.codeText,
            FONT_TYPE_TO_CLASS_NAME_MAP[type],
            {
                [typographyStyles.strikethrough]: !!strikethrough && !underline,
                [typographyStyles.underline]: !!underline && !strikethrough,
                [typographyStyles.underlineStrikethrough]: !!strikethrough && !!underline,
            },
            className,
        );

        const Tag = tag;

        return (
            <Tag ref={ref} className={classes} {...props}>
                {children}
            </Tag>
        );
    },
);

CodeText.displayName = "CodeText";
