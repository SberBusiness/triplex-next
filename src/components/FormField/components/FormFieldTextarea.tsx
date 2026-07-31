import React, { useContext, useMemo, useCallback, useLayoutEffect } from "react";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { FormFieldContext } from "../FormFieldContext";
import { EFormFieldStatus } from "../enums";
import { isFilled } from "./utils";
import styles from "../styles/FormFieldTextarea.module.less";

/** Свойства компонента FormFieldTextarea. */
export interface IFormFieldTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Соответствие размера имени класса.
const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Компонент, отображающий textarea. */
export const FormFieldTextarea = React.forwardRef<HTMLTextAreaElement, IFormFieldTextareaProps>(
    (
        { id: idProp, className, value, defaultValue, onFocus, onBlur, onAnimationStart, onChange, ...restProps },
        ref,
    ) => {
        const { size, status, setFocused, setTargetId, setFilled } = useContext(FormFieldContext);
        const id = useMemo(() => (idProp === undefined ? uniqueId("textarea_") : idProp), [idProp]);
        const classNames = clsx(styles.formFieldTextarea, sizeToClassNameMap[size], className);

        const syncFilled = useCallback(
            (nextValue: IFormFieldTextareaProps["value"]) => {
                setFilled(isFilled(nextValue));
            },
            [setFilled],
        );

        useLayoutEffect(() => {
            setTargetId(id);
        }, [id, setTargetId]);

        useLayoutEffect(() => {
            syncFilled(value ?? defaultValue);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useLayoutEffect(() => {
            if (value !== undefined) {
                syncFilled(value);
            }
        }, [value, syncFilled]);

        const handleFocus = useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(
            (event) => {
                syncFilled(event.currentTarget.value);
                setFocused(true);
                onFocus?.(event);
            },
            [syncFilled, setFocused, onFocus],
        );

        const handleBlur = useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(
            (event) => {
                syncFilled(event.currentTarget.value);
                setFocused(false);
                onBlur?.(event);
            },
            [syncFilled, setFocused, onBlur],
        );

        /**
         * Обработчик начала анимации.
         *
         * Текущая реализация необходима для кейсов с автозаполнением:
         * - Браузер устанавливает значение в поле при загрузке страницы;
         * - Браузер устанавливает значение в поле при навигации пользователем по сохранённым опциям заполнения.
         */
        const handleAnimationStart = useCallback<React.AnimationEventHandler<HTMLTextAreaElement>>(
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

        const handleChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
            (event) => {
                syncFilled(event.currentTarget.value);
                onChange?.(event);
            },
            [onChange, syncFilled],
        );

        return (
            <textarea
                {...restProps}
                id={id}
                className={classNames}
                value={value}
                defaultValue={defaultValue}
                disabled={status === EFormFieldStatus.DISABLED}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onAnimationStart={handleAnimationStart}
                onChange={handleChange}
                ref={ref}
            />
        );
    },
);

FormFieldTextarea.displayName = "FormFieldTextarea";
