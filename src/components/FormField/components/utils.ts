import React from "react";

/**
 * Записывает элемент во внешний ref компонента: callback-ref или объектный ref.
 *
 * @param ref Внешний ref, полученный компонентом через forwardRef, либо переданный пропом.
 * @param instance DOM-элемент или null при размонтировании.
 */
export const setForwardedRef = <T>(ref: React.ForwardedRef<T> | undefined, instance: T | null): void => {
    if (typeof ref === "function") {
        ref(instance);
    } else if (ref) {
        ref.current = instance;
    }
};

/**
 * Проверяет наличие значения в элементе ввода.
 *
 * Число считается заполненным всегда (включая 0), строка и массив строк — по длине.
 *
 * @param value Значение элемента ввода.
 * @returns true, если значение непустое.
 */
export const isFilled = (value: string | readonly string[] | number | undefined): boolean => {
    if (value === undefined) {
        return false;
    } else if (typeof value === "number") {
        return true;
    } else {
        return value.length !== 0;
    }
};
