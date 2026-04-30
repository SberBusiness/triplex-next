import React from "react";

/** Записать значение в forwarded ref (callback-ref или объектный ref). */
export function setForwardedRef<T>(ref: React.ForwardedRef<T>, instance: T | null): void {
    if (typeof ref === "function") {
        ref(instance);
    } else if (ref) {
        ref.current = instance;
    }
}

/**
 * Проверить, что цель события не находится внутри элемента, помеченного `data-draggable="false"`.
 * Используется sensors ListSortable, чтобы исключить начало drag по интерактивным элементам внутри строки.
 */
export function isDraggableTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) {
        return true;
    }

    let element: HTMLElement | null = target;
    while (element !== null) {
        if (element.dataset?.draggable === "false") {
            return false;
        }
        element = element.parentElement;
    }
    return true;
}
