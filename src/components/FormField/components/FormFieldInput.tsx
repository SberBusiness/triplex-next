import React, { useEffect, useContext, useMemo } from "react";
import { FormFieldContext } from "../FormFieldContext";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { EFormFieldStatus } from "../enums";
import { EComponentSize } from "../../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { DataAttributes } from "../../../types/CoreTypes";
import { isFilled } from "./utils";
import styles from "../styles/FormFieldInput.module.less";

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

/** Компонент, отображающий input. */
export const FormFieldInput = React.forwardRef<HTMLInputElement, IFormFieldInputProps>((props, ref) => {
    const { className, id, onAnimationStart, onBlur, onFocus, placeholder, value, ...restProps } = props;
    const { render, ...renderProvideProps } = props;
    const { focused, status, setFocused, setTargetId, setFilled, size } = useContext(FormFieldContext);
    const instanceId = useMemo(() => (id === undefined ? uniqueId("input_") : id), [id]);
    const classNames = clsx(styles.formFieldInput, sizeToClassNameMap[size], className);

    useEffect(() => {
        setTargetId(instanceId);
    }, [instanceId, setTargetId]);

    useEffect(() => {
        setFilled(isFilled(value));
    }, [setFilled, value]);

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
            setFilled(true);
        } else if (event.animationName.startsWith("autofill-cancelled-hook")) {
            // Необходимо проверить, что при отмене автозаполнения, в поле не находится значение.
            if (!isFilled(value)) {
                setFilled(false);
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
