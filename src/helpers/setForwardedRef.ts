import React from "react";

/**
 * Записать значение в forwarded ref (callback-ref или объектный ref).
 *
 * Внутренний хелпер библиотеки: лежит в `src/helpers`, из корневого barrel не экспортируется
 * и в публичный API не входит. Используется компонентами, которые совмещают внешний ref
 * с собственным — AmountField, ChipSuggest, FormField, List, SliderExtended.
 *
 * @param ref Внешняя ссылка, переданная потребителем.
 * @param instance Экземпляр элемента или null при размонтировании.
 */
export function setForwardedRef<T>(ref: React.Ref<T> | undefined, instance: T | null): void {
    if (typeof ref === "function") {
        ref(instance);
    } else if (ref != null) {
        // React.RefObject помечен readonly, но запись в current — единственный способ заполнить объектный ref.
        (ref as React.MutableRefObject<T | null>).current = instance;
    }
}
