import React, { useContext, useMemo, useCallback, useLayoutEffect } from "react";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { FormFieldContext } from "../FormFieldContext";
import { EFormFieldStatus } from "../enums";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { DataAttributes } from "../../../types/CoreTypes";
import { isFilled } from "./utils";
import styles from "../styles/FormFieldInput.module.less";

/** Свойства, передаваемые в рендер-функцию компонента FormFieldInput. */
export interface IFormFieldInputProvideProps extends React.InputHTMLAttributes<HTMLInputElement>, DataAttributes {}

/** Свойства компонента FormFieldInput. */
export interface IFormFieldInputProps extends Omit<IFormFieldInputProvideProps, "disabled"> {
    /**
     * Рендер-функция, в которую можно передать любой инпут с нужным функционалом (валидация ввода, маска).
     * Через аргумент props инпуту передаётся нужная стилизация, идентификатор и обработчики событий.
     */
    render?: (props: IFormFieldInputProvideProps, ref?: React.Ref<HTMLInputElement>) => React.ReactNode;
}

/** Соответствие размера имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/**
 * Компонент, отображающий input.
 *
 * Синхронизирует с FormFieldContext идентификатор элемента ввода, состояния фокуса и заполненности,
 * а также блокируется, когда поле имеет статус `EFormFieldStatus.DISABLED`.
 */
export const FormFieldInput = React.forwardRef<HTMLInputElement, IFormFieldInputProps>(
    (
        {
            id: idProp,
            className,
            value,
            defaultValue,
            onFocus,
            onBlur,
            onAnimationStart,
            onChange,
            render,
            ...restProps
        },
        ref,
    ) => {
        const { size, status, setFocused, setTargetId, setFilled } = useContext(FormFieldContext);
        const id = useMemo(() => (idProp === undefined ? uniqueId("input_") : idProp), [idProp]);
        const classNames = clsx(styles.formFieldInput, SIZE_TO_CLASS_NAME_MAP[size], className);

        const syncFilled = useCallback(
            (nextValue: IFormFieldInputProps["value"]) => {
                setFilled(isFilled(nextValue));
            },
            [setFilled],
        );

        useLayoutEffect(() => {
            setTargetId(id);
        }, [id, setTargetId]);

        // Начальная синхронизация заполненности: defaultValue учитывается только при монтировании,
        // дальнейшие изменения value обрабатываются эффектом ниже.
        useLayoutEffect(() => {
            syncFilled(value ?? defaultValue);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useLayoutEffect(() => {
            if (value !== undefined) {
                syncFilled(value);
            }
        }, [value, syncFilled]);

        const handleFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(
            (event) => {
                syncFilled(event.currentTarget.value);
                setFocused(true);
                onFocus?.(event);
            },
            [setFocused, syncFilled, onFocus],
        );

        const handleBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
            (event) => {
                syncFilled(event.currentTarget.value);
                setFocused(false);
                onBlur?.(event);
            },
            [setFocused, syncFilled, onBlur],
        );

        /**
         * Обработчик начала анимации.
         *
         * Текущая реализация необходима для кейсов с автозаполнением:
         * - Браузер устанавливает значение в поле при загрузке страницы;
         * - Браузер устанавливает значение в поле при навигации пользователем по сохранённым опциям заполнения.
         */
        const handleAnimationStart = useCallback<React.AnimationEventHandler<HTMLInputElement>>(
            (event) => {
                if (event.animationName.startsWith("autofill-applied-hook")) {
                    setFilled(true);
                } else if (event.animationName.startsWith("autofill-cancelled-hook")) {
                    // Необходимо проверить, что при отмене автозаполнения, в поле не находится значение.
                    syncFilled(event.currentTarget.value);
                }
                onAnimationStart?.(event);
            },
            [setFilled, syncFilled, onAnimationStart],
        );

        const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
            (event) => {
                syncFilled(event.currentTarget.value);
                onChange?.(event);
            },
            [syncFilled, onChange],
        );

        const commonProps: IFormFieldInputProvideProps = {
            ...restProps,
            id,
            className: classNames,
            value,
            defaultValue,
            disabled: status === EFormFieldStatus.DISABLED,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onAnimationStart: handleAnimationStart,
            onChange: handleChange,
        };

        if (render) {
            // Рендер инпута, переданного снаружи.
            return render(commonProps, ref);
        }

        // Рендер текстового инпута по умолчанию.
        return <input {...commonProps} ref={ref} />;
    },
);

FormFieldInput.displayName = "FormFieldInput";
