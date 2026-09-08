import React from "react";

/**
 * Записать значение в forwarded ref (callback-ref или объектный ref).
 * Внутренний хелпер ChipSuggest: из barrel index.ts не экспортируется.
 */
export function setForwardedRef<T>(ref: React.ForwardedRef<T>, instance: T | null): void {
    if (typeof ref === "function") {
        ref(instance);
    } else if (ref) {
        ref.current = instance;
    }
}
