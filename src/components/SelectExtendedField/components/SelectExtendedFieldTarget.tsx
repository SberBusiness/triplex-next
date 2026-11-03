import React, { useMemo, useRef } from "react";
import clsx from "clsx";
import { CaretdownStrokeSrvIcon16, CaretdownStrokeSrvIcon20, CaretdownStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { mergeRefs } from "../../../utils/refs";
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
    /**
     * Префикс поля. Клик по неинтерактивному содержимому переключает выпадающий блок,
     * клик и клавиши на фокусируемых элементах (tabIndex >= 0, например HelpBox) — нет.
     */
    prefix?: React.ReactNode;
    /** Постфикс поля. Отображается после каретки. События обрабатываются так же, как у prefix. */
    postfix?: React.ReactNode;
    /** Функция открытия/закрытия выпадающего блока. */
    setOpened: (opened: boolean) => void;
    /** Функция очистки значения. Если передана, в поле отображается кнопка очистки. */
    onClear?: React.MouseEventHandler<HTMLButtonElement>;
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
    (
        {
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
            // children и tabIndex намеренно не доходят до FormField: разметка поля фиксирована,
            // а tabIndex выставляет сам FormFieldTarget (-1 в состоянии DISABLED, иначе 0).
            children,
            tabIndex,
            fieldLabel,
            ...restProps
        },
        ref,
    ) => {
        const disabled = status === EFormFieldStatus.DISABLED;
        // В состоянии загрузки и в заблокированном поле выпадающий блок не открывается.
        const interactionBlocked = Boolean(loading) || disabled;
        const fieldTargetRef = useRef<HTMLDivElement>(null);
        // Стабильный колбэк-реф: иначе React на каждом рендере отвязывал бы и заново привязывал внешний ref.
        const setFieldTargetRef = useMemo(() => mergeRefs(ref, fieldTargetRef), [ref]);

        const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
            if (interactionBlocked) {
                return;
            }

            // Клик по вложенному фокусируемому элементу (HelpBox, тег) — его действие, а не клик по полю.
            // События из портала (Tooltip) всплывают сюда по React-дереву, но их цель лежит вне DOM поля — они не свои.
            let element = event.target as HTMLElement | null;

            while (element && element !== event.currentTarget && element.tabIndex < 0) {
                element = element.parentElement;
            }

            if (element && (element === event.currentTarget || element === fieldTargetRef.current)) {
                setOpened(!opened);
            }

            onClick?.(event);
        };

        const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
            if (interactionBlocked) {
                return;
            }

            // Только с самого поля: на вложенной кнопке preventDefault отменил бы её нативный клик по Enter / Space.
            if (!opened && OPEN_DROPDOWN_KEY_CODES.includes(event.keyCode) && event.target === fieldTargetRef.current) {
                event.preventDefault();
                // Предотвращение срабатывания keydown при открытии Dropdown в
                // document.addEventListener("keydown", ...) в DropdownListItem.
                event.stopPropagation();
                setOpened(true);
            }

            onKeyDown?.(event);
        };

        const handleClearClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
            // Клик по очистке не должен доходить до onClick поля и внешних обработчиков.
            event.stopPropagation();
            onClear?.(event);
        };

        return (
            <FormField
                className={clsx(
                    styles.selectExtendedFieldTarget,
                    { [styles.selectOpened]: opened, [styles.disabled]: disabled },
                    className,
                )}
                aria-expanded={opened}
                aria-haspopup="listbox"
                size={size}
                status={status}
                active={opened}
                onKeyDown={handleKeyDown}
                onClick={handleClick}
                {...restProps}
                data-tx={process.env.npm_package_version}
            >
                {prefix ? <FormFieldPrefix>{prefix}</FormFieldPrefix> : null}

                <FormFieldLabel>{fieldLabel}</FormFieldLabel>
                <FormFieldTarget className={styles.target} placeholder={placeholder} ref={setFieldTargetRef}>
                    {label}
                </FormFieldTarget>

                <FormFieldPostfix>
                    {onClear && <FormFieldClear onClick={handleClearClick} />}
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
