import React, { useEffect, useContext, useMemo } from "react";
import { FormFieldContext } from "../FormFieldContext";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import styles from "../styles/FormFieldInput.module.less";
import { EFormFieldStatus } from "../enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { DataAttributes } from "@sberbusiness/triplex-next/types/CoreTypes";

/** Свойства, передаваемые в рендер-функцию IFormFieldInputProps. */
export interface IFormFieldInputProvideProps extends Omit<IFormFieldInputProps, "render" | "size"> {
    size: EComponentSize;
}

/** Свойства компонента FormFieldInput. */
export interface IFormFieldInputProps extends React.InputHTMLAttributes<HTMLInputElement>, DataAttributes {
    /** Рендер-функция, в которую можно передать любой инпут с нужным функционалом (валидация ввода, маска).
     *  Через аргументы props инпуту передастся нужная стилизация.
     * */
    render?: (props: IFormFieldInputProvideProps, ref?: React.Ref<HTMLInputElement>) => React.ReactElement | null;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

// Проверяет наличие значения.
const isValueExist = (value: IFormFieldInputProps["value"]) => {
    if (value === undefined) {
        return false;
    } else if (typeof value === "number") {
        return true;
    } else {
        return value.length !== 0;
    }
};

/** Компонент, отображающий input. */
export const FormFieldInput = React.forwardRef<HTMLInputElement, IFormFieldInputProps>((props, ref) => {
    const { className, id, onAnimationStart, onBlur, onFocus, placeholder, value, ...restProps } = props;
    const { render, ...renderProvideProps } = props;
    const { focused, status, setFocused, setId, setValueExist, size, active } = useContext(FormFieldContext);
    const instanceId = useMemo(() => (id === undefined ? uniqueId("input_") : id), [id]);
    const classNames = clsx(styles.formFieldInput, sizeToClassNameMap[size], className, {
        [styles.active]: active,
    });

    useEffect(() => {
        setId(instanceId);
    }, [instanceId, setId]);

    useEffect(() => {
        setValueExist(isValueExist(value));
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
     * Текущая реализация необходима для кейсов с автозаполнением:
     * - Браузер устанавливает значение в поле при загрузке страницы;
     * - Браузер устанавливает значение в поле при навигации пользователем по сохранённым опциям заполнения.
     */
    const handleAnimationStart = (event: React.AnimationEvent<HTMLInputElement>) => {
        if (event.animationName.startsWith("autofill-applied-hook")) {
            setValueExist(true);
        } else if (event.animationName.startsWith("autofill-cancelled-hook")) {
            // Необходимо проверить, что при отмене автозаполнения, в поле не находится значение.
            if (!isValueExist(value)) {
                setValueExist(false);
            }
        }
        onAnimationStart?.(event);
    };

    if (render) {
        // Рендер инпута, переданного снаружи.
        return render(
            {
                ...renderProvideProps,
                className: classNames,
                id: instanceId,
                onAnimationStart: handleAnimationStart,
                onBlur: handleBlur,
                onFocus: handleFocus,
                /* Когда элемент не в фокусе, вместо placeholder показывается Label. */
                placeholder: focused ? placeholder : " ",
                size,
            },
            /* eslint-disable-next-line react-hooks/refs */
            ref,
        );
    } else {
        // Рендер текстового инпута по-умолчанию.
        return (
            <input
                {...restProps}
                className={classNames}
                disabled={status === EFormFieldStatus.DISABLED}
                id={instanceId}
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
