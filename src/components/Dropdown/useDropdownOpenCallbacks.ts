import { useEffect, useRef } from "react";

/**
 * Вызывает `onOpen` / `onClose` на смену `opened`, но не на первом рендере.
 * Используется в `Dropdown` и в компонентах, которые сами управляют открытием списка (например, `SuggestField`).
 * Не экспортируется из barrel. Колбэки не обязаны быть стабильными.
 */
export const useDropdownOpenCallbacks = (opened: boolean, onOpen?: () => void, onClose?: () => void) => {
    // Сравнение с предыдущим значением (а не флаг «смонтирован») делает эффект идемпотентным:
    // повторный маунт в StrictMode не приводит к повторному вызову.
    const prevOpenedRef = useRef(opened);
    // Актуальные колбэки хранятся в ref, чтобы эффект зависел только от opened
    // и не перезапускался при смене идентичности колбэков между рендерами.
    const callbacksRef = useRef({ onOpen, onClose });

    useEffect(() => {
        callbacksRef.current = { onOpen, onClose };
    });

    useEffect(() => {
        if (prevOpenedRef.current === opened) {
            return;
        }

        prevOpenedRef.current = opened;

        if (opened) {
            callbacksRef.current.onOpen?.();
        } else {
            callbacksRef.current.onClose?.();
        }
    }, [opened]);
};
