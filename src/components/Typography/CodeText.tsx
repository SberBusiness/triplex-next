import React from "react";
import { clsx } from "clsx";
import { EFontType } from "./enums";
import { ITypographyProps } from "./types";
import { FONT_TYPE_TO_CLASS_NAME_MAP } from "./constants";
import { PolymorphicComponentPropsWithRef } from "../../types/CoreTypes";
import styles from "./styles/CodeText.module.less";
import typographyStyles from "./styles/Typography.module.less";

/** Свойства компонента CodeText. */
export type TCodeTextProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<T, ITypographyProps>;

type CodeTextComponent = (<T extends React.ElementType = "span">(
    props: TCodeTextProps<T>,
) => React.ReactElement | null) & {
    displayName?: string;
};

/** Моноширинный текст (типографика). */
export const CodeText: CodeTextComponent = React.forwardRef(
    <T extends React.ElementType = "span">(
        { children, className, type = EFontType.PRIMARY, underline, strikethrough, tag, ...props }: TCodeTextProps<T>,
        ref: React.ForwardedRef<HTMLElement>,
    ) => {
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

        const Tag = tag || "span";

        return (
            <Tag ref={ref} className={classes} {...props}>
                {children}
            </Tag>
        );
    },
);

CodeText.displayName = "CodeText";
