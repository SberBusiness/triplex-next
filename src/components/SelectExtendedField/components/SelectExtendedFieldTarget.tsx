import React, { useRef } from "react";
import { CaretdownStrokeSrvIcon16, CaretdownStrokeSrvIcon20, CaretdownStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { LoaderSmall, ELoaderSmallTheme } from "../../Loader";
import clsx from "clsx";
import styles from "../styles/SelectExtendedFieldTarget.module.less";
import {
    EFormFieldStatus,
    FormField,
    FormFieldLabel,
    FormFieldPostfix,
    FormFieldPrefix,
    IFormFieldProps,
} from "../../FormField";
import { FormFieldTarget } from "../../FormField/components/FormFieldTarget";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/* Свойства SelectExtendedFieldTarget. */
export interface ISelectExtendedFieldTargetProps extends Omit<IFormFieldProps, "prefix" | "postfix"> {
    /* Текст, или компонент отображающий выбранное значение. */
    label?: React.ReactNode;
    /* Текст, или компонент отображающий выбранное значение для Target. */
    fieldLabel: React.ReactNode;
    /* Состояние загрузки. */
    loading?: boolean;
    /* Состояние открытости выпадающего списка. */
    opened: boolean;
    /* Текст, или компонент отображающий выбранное placeholder. */
    placeholder?: React.ReactNode;
    /** Префикс поля ввода. */
    prefix?: React.ReactNode;
    /** Постфикс поля ввода. */
    postfix?: React.ReactNode;
    /* Функция открытия/закрытия выпадающего списка. */
    setOpened: (opened: boolean) => void;
}

const sizeToCaretIconMap = {
    [EComponentSize.SM]: <CaretdownStrokeSrvIcon16 paletteIndex={5} className={styles.caretIcon} />,
    [EComponentSize.MD]: <CaretdownStrokeSrvIcon20 paletteIndex={5} className={styles.caretIcon} />,
    [EComponentSize.LG]: <CaretdownStrokeSrvIcon24 paletteIndex={5} className={styles.caretIcon} />,
};

const sizeToLoaderSizeMap = {
    [EComponentSize.SM]: <LoaderSmall size={EComponentSize.SM} theme={ELoaderSmallTheme.BRAND} />,
    [EComponentSize.MD]: <LoaderSmall size={EComponentSize.MD} theme={ELoaderSmallTheme.BRAND} />,
    [EComponentSize.LG]: <LoaderSmall size={EComponentSize.LG} theme={ELoaderSmallTheme.BRAND} />,
};

/**
 * Компонент SelectTarget.
 * Видимая часть Select, при нажатии на которую открывается выпадающий список.
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
        const targetRef = useRef<HTMLDivElement | null>(null);
        const classNames = clsx(
            styles.selectExtendedFieldTarget,
            {
                [styles.selectOpened]: opened,
                [styles.loading]: loading,
                [styles.disabled]: status === EFormFieldStatus.DISABLED,
            },
            className,
        );

        const getTabIndex = (): number => {
            return status === EFormFieldStatus.DISABLED || loading ? -1 : tabIndex || 0;
        };

        /* Обработчик клика. */
        const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
            if (loading && status === EFormFieldStatus.DISABLED) {
                return; // Не реагируем на клики в состоянии загрузки
            }
            setOpened(!opened);
            onClick?.(event);
        };

        /* Обработчик нажатия клавиши. */
        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (loading && status === EFormFieldStatus.DISABLED) {
                return; // Не реагируем на клавиши в состоянии загрузки
            }

            if (!opened) {
                // При нажатии Enter, Space, ArrowUp или ArrowDown открывается выпадающий список.
                if (
                    [
                        EVENT_KEY_CODES.SPACE,
                        EVENT_KEY_CODES.ENTER,
                        EVENT_KEY_CODES.ARROW_DOWN,
                        EVENT_KEY_CODES.ARROW_UP,
                    ].includes(event.keyCode)
                ) {
                    event.preventDefault();
                    // Предотвращение срабатывания keydown при открытии Dropdown в document.addEventListener('keydown'...) в src/desktop/components/Dropdown/components/DropdownListItem.tsx.
                    event.stopPropagation();
                    setOpened(!opened);
                }
            }

            onKeyDown?.(event);
        };

        /* Функция для хранения ссылки. */
        const setRef = (instance: HTMLDivElement | null) => {
            targetRef.current = instance;
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };
        return (
            <FormField
                onClick={handleClick}
                tabIndex={getTabIndex()}
                onKeyDown={handleKeyDown}
                status={status}
                size={size}
                className={classNames}
                aria-expanded={opened}
                aria-haspopup="listbox"
                data-tx={process.env.npm_package_version}
                {...rest}
            >
                {prefix ? <FormFieldPrefix>{prefix}</FormFieldPrefix> : null}

                <FormFieldLabel>{fieldLabel}</FormFieldLabel>
                <FormFieldTarget
                    ref={setRef}
                    className={clsx(styles.target, {
                        [styles.placeholder]: !!placeholder && !label,
                        [styles.label]: !!label,
                    })}
                    placeholder={placeholder}
                >
                    {label}
                </FormFieldTarget>

                <FormFieldPostfix>
                    {loading ? sizeToLoaderSizeMap[size] : sizeToCaretIconMap[size]}
                    {postfix ? postfix : null}
                </FormFieldPostfix>
            </FormField>
        );
    },
);

SelectExtendedFieldTarget.displayName = "SelectExtendedFieldTarget";
