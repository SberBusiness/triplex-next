import React from "react";
import { EButtonSize, EButtonTheme } from "./enums";

import styles from "./styles/Button.module.less";
import generalStyles from "./styles/ButtonGeneral.module.less";
import secondaryStyles from "./styles/ButtonSecondary.module.less";
import dangerStyles from "./styles/ButtonDanger.module.less";
import linkStyles from "./styles/ButtonLink.module.less";

import clsx from "clsx";
import { ButtonBase } from "../protected/ButtonBase/ButtonBase";

/** Свойства кнопки типа General. */
export interface IButtonGeneralProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Тема кнопки. */
    theme: EButtonTheme.GENERAL;
    /** Размер кнопки. */
    size: EButtonSize;
    /** Блочный режим. */
    block?: boolean;
    /** Режим загрузки. */
    loading?: boolean;
    /** Иконка. */
    icon?: React.ReactElement;
    /** Радиус скругления кнопки. */
    borderRadius?: number;
}

/** Свойства кнопки типа Secondary. */
export interface IButtonSecondaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Тема кнопки. */
    theme: EButtonTheme.SECONDARY;
    /** Размер кнопки. */
    size: EButtonSize;
    /** Блочный режим. */
    block?: boolean;
    /** Режим загрузки. */
    loading?: boolean;
    /** Иконка. */
    icon?: React.ReactElement;
    /** Радиус скругления кнопки. */
    borderRadius?: number;
}

/** Свойства кнопки типа Danger. */
export interface IButtonDangerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Тема кнопки. */
    theme: EButtonTheme.DANGER;
    /** Размер кнопки. */
    size: EButtonSize;
    /** Блочный режим. */
    block?: boolean;
    /** Режим загрузки. */
    loading?: boolean;
    /** Иконка. */
    icon?: React.ReactElement;
    /** Радиус скругления кнопки. */
    borderRadius?: number;
}

/** Свойства кнопки типа Link. */
export interface IButtonLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Тема кнопки. */
    theme: EButtonTheme.LINK;
    /** Размер кнопки. */
    size: EButtonSize;
    /** Блочный режим. */
    block?: never;
    /** Режим загрузки. */
    loading?: never;
    /** Иконка. */
    icon?: never;
    /** Радиус скругления кнопки. */
    borderRadius?: never;
}

/** Свойства Button. */
export type TButtonProps = IButtonGeneralProps | IButtonSecondaryProps | IButtonDangerProps | IButtonLinkProps;

/** Возвращает CSS класс темы кнопки. */
const getButtonThemeCssClass = (theme: EButtonTheme) => {
    switch (theme) {
        case EButtonTheme.GENERAL:
            return generalStyles.general;
        case EButtonTheme.SECONDARY:
            return secondaryStyles.secondary;
        case EButtonTheme.DANGER:
            return dangerStyles.danger;
        case EButtonTheme.LINK:
            return linkStyles.link;
    }
};

/** Возвращает CSS класс размера кнопки. */
const getButtonSizeCssClass = (size?: EButtonSize) => {
    switch (size) {
        case EButtonSize.LG:
            return styles.lg;
        case EButtonSize.MD:
            return styles.md;
        case EButtonSize.SM:
            return styles.sm;
    }
};

/** Возвращает радиус скругления по умолчанию в зависимости от размера кнопки. */
const getDefaultBorderRadius = (size: EButtonSize): number => {
    switch (size) {
        case EButtonSize.LG:
            return 10;
        case EButtonSize.MD:
            return 8;
        case EButtonSize.SM:
            return 6;
    }
};

/** Кнопка. */
export const Button = React.forwardRef<HTMLButtonElement, TButtonProps>((props, ref) => {
    const {
        children,
        className,
        disabled,
        theme,
        size = EButtonSize.MD,
        block,
        loading,
        icon,
        borderRadius,
        ...rest
    } = props;
    const { "aria-expanded": expanded } = props;
    const classNames = clsx(
        styles.button,
        getButtonThemeCssClass(theme),
        getButtonSizeCssClass(size),
        { [styles.block]: !!block, [styles.loading]: !!loading, [styles.expanded]: !!expanded },
        { [styles.icon]: !!icon },
        // Классы для иконок, начало.
        "hoverable",
        {
            active: !!expanded,
            disabled: !!disabled,
        },
        // Классы для иконок, конец.
        className,
    );

    const finalBorderRadius = borderRadius ?? getDefaultBorderRadius(size);
    const style = { borderRadius: `${finalBorderRadius}px` };

    return (
        <ButtonBase
            className={classNames}
            tabIndex={loading ? -1 : undefined}
            ref={ref}
            disabled={disabled}
            style={style}
            {...rest}
        >
            <span className={styles.content}>{icon ? icon : children}</span>
        </ButtonBase>
    );
});

Button.displayName = "Button";
