import React, { useCallback, useEffect, useRef } from "react";
import { TARGET_PADDING_X_DEFAULT } from "../consts";
import { setForwardedRef } from "./utils";

/**
 * Синхронизирует измеренную ширину контейнера-аффикса (FormFieldPrefix / FormFieldPostfix)
 * с контекстом FormField: поле использует её как горизонтальный внутренний отступ.
 *
 * Ширина отслеживается через ResizeObserver, при размонтировании сбрасывается
 * до TARGET_PADDING_X_DEFAULT.
 *
 * @param setWidth Сеттер ширины из FormFieldContext (setPrefixWidth или setPostfixWidth).
 * @param forwardedRef Внешний ref компонента, в который нужно продублировать элемент.
 * @returns Ref-колбэк для корневого элемента аффикса.
 */
export const useFormFieldAffixWidth = (
    setWidth: React.Dispatch<React.SetStateAction<number>>,
    forwardedRef: React.ForwardedRef<HTMLSpanElement>,
): React.RefCallback<HTMLSpanElement> => {
    const elementRef = useRef<HTMLSpanElement | null>(null);

    const setRef = useCallback(
        (instance: HTMLSpanElement | null) => {
            elementRef.current = instance;
            setForwardedRef(forwardedRef, instance);
        },
        [forwardedRef],
    );

    useEffect(() => {
        const element = elementRef.current;

        if (!element) {
            return;
        }

        const resizeObserver = new ResizeObserver(([entry]) => {
            const width = entry.target.getBoundingClientRect().width;

            setWidth((prevWidth) => (prevWidth !== width ? width : prevWidth));
        });

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
            setWidth(TARGET_PADDING_X_DEFAULT);
        };
    }, [setWidth]);

    return setRef;
};
