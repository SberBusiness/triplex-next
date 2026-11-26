import React from "react";

/**
 * Записать значение в forwarded ref (callback-ref или объектный ref).
 *
 * Возвращает очистку callback-ref, если потребитель задал её при присоединении узла.
 *
 * @param ref Внешняя ссылка, переданная потребителем.
 * @param instance Экземпляр элемента или null при размонтировании.
 */
export function setForwardedRef<T>(ref: React.Ref<T> | undefined, instance: T | null): (() => void) | undefined {
    if (typeof ref === "function") {
        const cleanup: unknown = ref(instance);
        if (instance !== null && typeof cleanup === "function") {
            return () => cleanup();
        }
    } else if (ref != null) {
        // React.RefObject помечен readonly, но запись в current — единственный способ заполнить объектный ref.
        (ref as React.MutableRefObject<T | null>).current = instance;
    }
}
