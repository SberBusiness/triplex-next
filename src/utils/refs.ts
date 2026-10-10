import React, { useRef, useLayoutEffect } from "react";

/** Объединяет несколько рефов в один чистый колбэк-реф. */
export function mergeRefs<T>(...refs: React.ForwardedRef<T>[]) {
    return (node: T | null) => {
        refs.forEach((ref) => {
            if (ref === null) return;
            if (typeof ref === "function") {
                ref(node);
            } else {
                ref.current = node;
            }
        });
    };
}

/** Возвращает стабильный реф, который всегда хранит самое актуальное значение. */
export function useLatestRef<T>(value: T) {
    const ref = useRef(value);
    useLayoutEffect(() => {
        ref.current = value;
    }, [value]);
    return ref;
}
