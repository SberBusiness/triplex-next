import React from "react";
import clsx from "clsx";
import { CaretdownStrokeSrvIcon16, CaretdownStrokeSrvIcon20, CaretdownStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import {
    EFormFieldStatus,
    FormField,
    FormFieldClear,
    FormFieldLabel,
    FormFieldPostfix,
    FormFieldPrefix,
    IFormFieldProps,
} from "../../FormField";
import { FormFieldTarget } from "../../FormField/components/FormFieldTarget";
import { IconWrapper } from "../../IconWrapper";
import { LoaderSmall, ELoaderSmallTheme } from "../../Loader";
import styles from "../styles/SelectExtendedFieldTarget.module.less";

/** Свойства компонента SelectExtendedFieldTarget. */
export interface ISelectExtendedFieldTargetProps extends Omit<IFormFieldProps, "prefix" | "postfix"> {
    /** Текст или компонент, отображающий выбранное значение. */
    label?: React.ReactNode;
    /** Текст или компонент заголовка поля. */
    fieldLabel: React.ReactNode;
    /** Состояние загрузки. Вместо каретки отображается лоадер, поле не реагирует на клик и клавиатуру. По умолчанию false. */
    loading?: boolean;
    /** Состояние открытости выпадающего блока. */
    opened: boolean;
    /** Текст или компонент, отображаемый вместо значения, пока значение не выбрано. */
    placeholder?: React.ReactNode;
    /** Префикс поля. */
    prefix?: React.ReactNode;
    /** Постфикс поля. Отображается после каретки. */
    postfix?: React.ReactNode;
    /** Функция открытия/закрытия выпадающего блока. */
    setOpened: (opened: boolean) => void;
    /** Функция очистки значения. Если передана, в поле отображается кнопка очистки. */
    onClear?: () => void;
}

/** Соответствие размера поля иконке каретки. */
const SIZE_TO_CARET_ICON_MAP = {
    [EComponentSize.SM]: <CaretdownStrokeSrvIcon16 paletteIndex={5} className={styles.caretIcon} />,
    [EComponentSize.MD]: <CaretdownStrokeSrvIcon20 paletteIndex={5} className={styles.caretIcon} />,
    [EComponentSize.LG]: <CaretdownStrokeSrvIcon24 paletteIndex={5} className={styles.caretIcon} />,
};

/** Соответствие размера поля лоадеру состояния загрузки. */
const SIZE_TO_LOADER_MAP = {
    [EComponentSize.SM]: <LoaderSmall size={EComponentSize.SM} theme={ELoaderSmallTheme.BRAND} />,
    [EComponentSize.MD]: <LoaderSmall size={EComponentSize.MD} theme={ELoaderSmallTheme.BRAND} />,
    [EComponentSize.LG]: <LoaderSmall size={EComponentSize.LG} theme={ELoaderSmallTheme.BRAND} />,
};

/** Коды клавиш, открывающих выпадающий блок. */
const OPEN_DROPDOWN_KEY_CODES = [
    EVENT_KEY_CODES.SPACE,
    EVENT_KEY_CODES.ENTER,
    EVENT_KEY_CODES.ARROW_DOWN,
    EVENT_KEY_CODES.ARROW_UP,
];

/**
 * Поле выбора SelectExtendedField.
 * Видимая часть Select, при нажатии на которую открывается выпадающий блок.
 */
export const SelectExtendedFieldTarget = React.forwardRef<HTMLDivElement, ISelectExtendedFieldTargetProps>(
    (props, ref) => {
        const {
            children,
            className,
            label,
            placeholder,
            onKeyDown,
            onClick,
            onClear,
            opened,
            postfix,
            prefix,
            setOpened,
            loading,
            size = EComponentSize.MD,
            status,
            tabIndex,
            fieldLabel,
            ...rest
        } = props;
        const disabled = status === EFormFieldStatus.DISABLED;
        // В состоянии загрузки и в заблокированном поле выпадающий блок не открывается.
        const interactionBlocked = Boolean(loading) || disabled;

        const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
            if (interactionBlocked) {
                return;
            }

            setOpened(!opened);
            onClick?.(event);
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (interactionBlocked) {
                return;
            }

            if (!opened && OPEN_DROPDOWN_KEY_CODES.includes(event.keyCode)) {
                event.preventDefault();
                // Предотвращение срабатывания keydown при открытии Dropdown в
                // document.addEventListener("keydown", ...) в DropdownListItem.
                event.stopPropagation();
                setOpened(true);
            }

            onKeyDown?.(event);
        };

        return (
            <FormField
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                status={status}
                size={size}
                className={clsx(
                    styles.selectExtendedFieldTarget,
                    { [styles.selectOpened]: opened, [styles.disabled]: disabled },
                    className,
                )}
                aria-expanded={opened}
                aria-haspopup="listbox"
                data-tx={process.env.npm_package_version}
                active={opened}
                {...rest}
            >
                {prefix ? <FormFieldPrefix>{prefix}</FormFieldPrefix> : null}

                <FormFieldLabel>{fieldLabel}</FormFieldLabel>
                <FormFieldTarget ref={ref} className={styles.target} placeholder={placeholder}>
                    {label}
                </FormFieldTarget>

                <FormFieldPostfix>
                    {onClear && <FormFieldClear onClick={onClear} />}
                    {loading ? (
                        SIZE_TO_LOADER_MAP[size]
                    ) : (
                        <IconWrapper
                            className={styles.caretWrapper}
                            active={opened}
                            disabled={disabled}
                            displayContents
                        >
                            {SIZE_TO_CARET_ICON_MAP[size]}
                        </IconWrapper>
                    )}
                    {postfix}
                </FormFieldPostfix>
            </FormField>
        );
    },
);

SelectExtendedFieldTarget.displayName = "SelectExtendedFieldTarget";
