import React, { useEffect, useContext, useRef } from "react";
import { FormFieldContext } from "../FormFieldContext";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import styles from "../styles/FormFieldInput.module.less";
import { EFormFieldStatus } from "../enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Свойства, передаваемые в рендер-функцию IFormFieldInputProps. */
export interface IFormFieldInputProvideProps extends Omit<IFormFieldInputProps, "render" | "size"> {
    size: EComponentSize;
}

/** Свойства компонента FormFieldInput. */
export interface IFormFieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Рендер-функция, в которую можно передать любой инпут с нужным функционалом (валидация ввода, маска).
     *  Через аргументы props инпуту передастся нужная стилизация.
     * */
    render?: (props: IFormFieldInputProvideProps, ref?: React.Ref<HTMLInputElement>) => React.ReactElement | null;
}

/** Компонент, отображающий input. */
export const FormFieldInput = React.forwardRef<HTMLInputElement, IFormFieldInputProps>((props, ref) => {
    const { className, id, onAnimationStart, onBlur, onFocus, placeholder, value, ...restProps } = props;
    const { render, ...renderProvideProps } = props;
    const { focused, status, setFocused, setId, setValueExist, size } = useContext(FormFieldContext);
    const classNames = clsx(styles.formFieldInput, className, styles[`size-${size}`]);

    const instanceId = useRef(id || uniqueId("input_"));

    useEffect(() => {
        setId(instanceId.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (id) {
            instanceId.current = id;
            setId(instanceId.current);
        }
    }, [id, setId]);

    useEffect(() => {
        setValueExist(Boolean(value));
    }, [setValueExist, value]);

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(event);
    };

    /**
     * Обработчик начала анимации.
     *
     * Примечание:
     * Текущая реализация необходима для кейсов с автозаполнением:
     * - Браузер устанавливает значение в поле при загрузке страницы;
     * - Браузер устанавливает значение в поле при навигации пользователем по сохранённым опциям заполнения.
     */
    const handleAnimationStart = (event: React.AnimationEvent<HTMLInputElement>) => {
        if (event.animationName.startsWith("autofill-applied-hook")) {
            setValueExist(true);
        } else if (event.animationName.startsWith("autofill-cancelled-hook")) {
            // Необходимо проверить, что при отмене автозаполнения, в поле не находится значение.
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            !value && setValueExist(false);
        }
        onAnimationStart?.(event);
    };

    if (render) {
        // Рендер инпута, переданного снаружи.
        return render(
            {
                ...renderProvideProps,
                className: classNames,
                id: instanceId.current,
                onAnimationStart: handleAnimationStart,
                onBlur: handleBlur,
                onFocus: handleFocus,
                /* Когда элемент не в фокусе, вместо placeholder показывается Label. */
                placeholder: focused ? placeholder : " ",
                size,
            },
            ref,
        );
    } else {
        // Рендер текстового инпута по-умолчанию.
        return (
            <input
                {...restProps}
                className={classNames}
                disabled={status === EFormFieldStatus.DISABLED}
                id={instanceId.current}
                onAnimationStart={handleAnimationStart}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                placeholder={placeholder}
                ref={ref}
            />
        );
    }
});

FormFieldInput.displayName = "FormFieldInput";
