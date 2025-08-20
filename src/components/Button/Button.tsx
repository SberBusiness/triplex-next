import React from "react";
import { EButtonSize, EButtonTheme } from "./enums";
import styles from "./styles/Button.module.less";
import generalStyles from "./styles/ButtonGeneral.module.less";
import secondaryStyles from "./styles/ButtonSecondary.module.less";
import dangerStyles from "./styles/ButtonDanger.module.less";
import linkStyles from "./styles/ButtonLink.module.less";
import clsx from "clsx";
import { LoadingDots, ELoadingDotsSize, ELoadingDotsTheme } from "../LoadingDots";

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
}

/** Свойства Button. */
export type TButtonProps = IButtonGeneralProps | IButtonSecondaryProps | IButtonDangerProps | IButtonLinkProps;

/** Возвращает CSS класс темы кнопки. */
const getButtonThemeCssClass = (theme: EButtonTheme, expanded?: boolean) => {
    switch (theme) {
        case EButtonTheme.GENERAL:
            return { [generalStyles.general]: true, [generalStyles.expanded]: expanded };
        case EButtonTheme.SECONDARY:
            return { [secondaryStyles.secondary]: true, [secondaryStyles.expanded]: expanded };
        case EButtonTheme.DANGER:
            return { [dangerStyles.danger]: true, [dangerStyles.expanded]: expanded };
        case EButtonTheme.LINK:
            return { [linkStyles.link]: true, [linkStyles.expanded]: expanded };
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

/** Отрисовка анимации загрузки. */
const renderLoadingIcon = (theme: EButtonTheme, size: EButtonSize) => {
    const dotsTheme = theme === EButtonTheme.SECONDARY ? ELoadingDotsTheme.SECONDARY : ELoadingDotsTheme.GENERAL;
    const dotsSize =
        size === EButtonSize.SM
            ? ELoadingDotsSize.SM
            : size === EButtonSize.LG
              ? ELoadingDotsSize.LG
              : ELoadingDotsSize.MD;
    return <LoadingDots theme={dotsTheme} size={dotsSize} />;
};

/** Кнопка. */
export const Button = React.forwardRef<HTMLButtonElement, TButtonProps>((props, ref) => {
    const { children, className, disabled, theme, size = EButtonSize.MD, block, loading, icon, ...rest } = props;
    const { "aria-expanded": expanded } = props;
    const classNames = clsx(
        styles.button,
        getButtonThemeCssClass(theme, !!expanded),
        getButtonSizeCssClass(size),
        { [styles.block]: !!block, [styles.loading]: !!loading },
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

    return (
        <button
            type="button"
            className={classNames}
            tabIndex={loading ? -1 : undefined}
            ref={ref}
            disabled={disabled}
            {...rest}
        >
            <span className={styles.content}>
                {icon}
                {children}
            </span>
            <div className={clsx(styles.loadingDots, !loading && styles.hidden)}>{renderLoadingIcon(theme, size)}</div>
        </button>
    );
});

Button.displayName = "Button";
