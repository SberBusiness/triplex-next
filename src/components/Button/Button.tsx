import React from "react";
import clsx from "clsx";
import { LoaderSmall, ELoaderSmallTheme } from "@sberbusiness/triplex-next/components/Loader";
import generalStyles from "./styles/ButtonGeneral.module.less";
import secondaryStyles from "./styles/ButtonSecondary.module.less";
import secondaryLightStyles from "./styles/ButtonSecondaryLight.module.less";
import dangerStyles from "./styles/ButtonDanger.module.less";
import linkStyles from "./styles/ButtonLink.module.less";
import styles from "./styles/Button.module.less";
import { ButtonBase, IButtonBaseProps } from "@sberbusiness/triplex-next/components/Button/ButtonBase";
import { EButtonTheme } from "@sberbusiness/triplex-next/components/Button/enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Свойства кнопки типа General. */
export interface IButtonGeneralProps extends IButtonBaseProps {
    /** Тема кнопки. */
    theme: EButtonTheme.GENERAL;
    /** Размер кнопки. */
    size: EComponentSize;
    /** Блочный режим. */
    block?: boolean;
    /** Режим загрузки. */
    loading?: boolean;
    /** Иконка. */
    icon?: React.ReactElement;
}

/** Свойства кнопки типа Secondary. */
export interface IButtonSecondaryProps extends IButtonBaseProps {
    /** Тема кнопки. */
    theme: EButtonTheme.SECONDARY;
    /** Размер кнопки. */
    size: EComponentSize;
    /** Блочный режим. */
    block?: boolean;
    /** Режим загрузки. */
    loading?: boolean;
    /** Иконка. */
    icon?: React.ReactElement;
}

/** Свойства кнопки типа SecondaryLight. */
export interface IButtonSecondaryLightProps extends IButtonBaseProps {
    /** Тема кнопки. */
    theme: EButtonTheme.SECONDARY_LIGHT;
    /** Размер кнопки. */
    size: EComponentSize;
    /** Блочный режим. */
    block?: boolean;
    /** Режим загрузки. */
    loading?: boolean;
    /** Иконка. */
    icon?: React.ReactElement;
}
/** Свойства кнопки типа Danger. */
export interface IButtonDangerProps extends IButtonBaseProps {
    /** Тема кнопки. */
    theme: EButtonTheme.DANGER;
    /** Размер кнопки. */
    size: EComponentSize;
    /** Блочный режим. */
    block?: boolean;
    /** Режим загрузки. */
    loading?: boolean;
    /** Иконка. */
    icon?: React.ReactElement;
}

/** Свойства кнопки типа Link. */
export interface IButtonLinkProps extends IButtonBaseProps {
    /** Тема кнопки. */
    theme: EButtonTheme.LINK;
    /** Размер кнопки. */
    size: EComponentSize;
    /** Блочный режим. */
    block?: never;
    /** Режим загрузки. */
    loading?: never;
    /** Иконка. */
    icon?: never;
}

/** Свойства компонента Button. */
export type TButtonProps =
    | IButtonGeneralProps
    | IButtonSecondaryProps
    | IButtonSecondaryLightProps
    | IButtonDangerProps
    | IButtonLinkProps;

/** Возвращает CSS класс темы кнопки. */
const getButtonThemeCssClass = (theme: EButtonTheme, expanded?: boolean) => {
    switch (theme) {
        case EButtonTheme.GENERAL:
            return { [generalStyles.general]: true, [generalStyles.expanded]: expanded };
        case EButtonTheme.SECONDARY:
            return {
                [secondaryStyles.secondary]: true,
                [secondaryStyles.expanded]: expanded,
            };
        case EButtonTheme.SECONDARY_LIGHT:
            return {
                [secondaryLightStyles.secondaryLight]: true,
                [secondaryLightStyles.expanded]: expanded,
            };
        case EButtonTheme.DANGER:
            return {
                [dangerStyles.danger]: true,
                [dangerStyles.expanded]: expanded,
            };
        case EButtonTheme.LINK:
            return {
                [linkStyles.link]: true,
                [linkStyles.expanded]: expanded,
            };
    }
};

/** Возвращает CSS класс размера кнопки. */
const getButtonSizeCssClass = (size?: EComponentSize) => {
    switch (size) {
        case EComponentSize.LG:
            return styles.lg;
        case EComponentSize.MD:
            return styles.md;
        case EComponentSize.SM:
            return styles.sm;
    }
};

/** Отрисовка анимации загрузки. */
const renderLoadingIcon = (theme: EButtonTheme, size: EComponentSize) => {
    const dotsTheme = [EButtonTheme.SECONDARY, EButtonTheme.SECONDARY_LIGHT].includes(theme)
        ? ELoaderSmallTheme.BRAND
        : ELoaderSmallTheme.NEUTRAL;

    return <LoaderSmall theme={dotsTheme} size={size} />;
};

/** Кнопка. */
export const Button = React.forwardRef<HTMLButtonElement, TButtonProps>((props, ref) => {
    const { children, className, disabled, theme, size = EComponentSize.MD, block, loading, icon, ...rest } = props;

    const { "aria-expanded": expanded } = props;
    const classNames = clsx(
        styles.button,
        getButtonThemeCssClass(theme, !!expanded),
        getButtonSizeCssClass(size),
        { [styles.block]: !!block, [styles.loading]: !!loading },
        { [styles.icon]: !!icon && !children },
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
        <ButtonBase className={classNames} tabIndex={loading ? -1 : undefined} disabled={disabled} {...rest} ref={ref}>
            <span className={styles.content}>
                {icon}
                {children}
            </span>
            <div className={clsx(styles.loader, !loading && styles.hidden)}>{renderLoadingIcon(theme, size)}</div>
        </ButtonBase>
    );
});

Button.displayName = "Button";
