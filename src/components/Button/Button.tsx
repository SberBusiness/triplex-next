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
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";

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
    /** Содержимое кнопки. */
    children?: React.ReactNode;
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
    /** Содержимое кнопки. */
    children?: React.ReactNode;
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
    /** Содержимое кнопки. */
    children?: React.ReactNode;
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
    /** Содержимое кнопки. */
    children?: React.ReactNode;
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
    /** Содержимое кнопки. */
    children?: React.ReactNode;
}

/** Свойства компонента Button. */
export type TButtonProps =
    | IButtonGeneralProps
    | IButtonSecondaryProps
    | IButtonSecondaryLightProps
    | IButtonDangerProps
    | IButtonLinkProps;

const THEME_TO_CLASS_NAME_MAP: Record<EButtonTheme, string> = {
    [EButtonTheme.GENERAL]: generalStyles.general,
    [EButtonTheme.SECONDARY]: secondaryStyles.secondary,
    [EButtonTheme.SECONDARY_LIGHT]: secondaryLightStyles.secondaryLight,
    [EButtonTheme.DANGER]: dangerStyles.danger,
    [EButtonTheme.LINK]: linkStyles.link,
};

const THEME_TO_EXPANDED_CLASS_NAME_MAP: Record<EButtonTheme, string> = {
    [EButtonTheme.GENERAL]: generalStyles.expanded,
    [EButtonTheme.SECONDARY]: secondaryStyles.expanded,
    [EButtonTheme.SECONDARY_LIGHT]: secondaryLightStyles.expanded,
    [EButtonTheme.DANGER]: dangerStyles.expanded,
    [EButtonTheme.LINK]: linkStyles.expanded,
};

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

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
        THEME_TO_CLASS_NAME_MAP[theme],
        SIZE_TO_CLASS_NAME_MAP[size],
        {
            [styles.block]: !!block,
            [styles.loading]: !!loading,
            [styles.icon]: !!icon && !children,
            [THEME_TO_EXPANDED_CLASS_NAME_MAP[theme]]: !!expanded,
        },
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
