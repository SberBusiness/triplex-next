import { useEffect, useRef } from "react";

/**
 * Вызывает `onOpen` / `onClose` выпадающего списка на смену `opened`, но не на первом рендере.
 * Колбэки вызываются в эффекте, а не во время рендера. Используется в `Dropdown` и в компонентах,
 * которые сами управляют открытием списка (например, `SuggestField`). Не экспортируется из barrel.
 * Колбэки не обязаны быть стабильными: смена их идентичности без смены `opened` их не вызывает.
 */
export const useDropdownOpenCallbacks = (opened: boolean, onOpen?: () => void, onClose?: () => void) => {
    // Сравнение с предыдущим значением вместо флага «смонтирован» делает эффект идемпотентным:
    // повторный маунт в StrictMode и перезапуск эффекта из-за новых колбэков их не вызывают.
    const prevOpenedRef = useRef(opened);

    useEffect(() => {
        if (prevOpenedRef.current === opened) {
            return;
        }

        prevOpenedRef.current = opened;

        if (opened) {
            onOpen?.();
        } else {
            onClose?.();
        }
    }, [opened, onOpen, onClose]);
};
