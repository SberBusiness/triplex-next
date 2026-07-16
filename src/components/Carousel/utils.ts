import React, { useRef, useLayoutEffect } from "react";
import { TCarouselViewportPadding, ICarouselPaddingResult } from "./types";

/** Очищает значение: отсекает NaN, Infinity и отрицательные числа, возвращая 0. */
const clean = (value: number): number => {
    if (Number.isFinite(value) && value >= 0) {
        return value;
    }
    return 0;
};

/** Вычисляет геометрию отступов Viewport и формирует оптимизированную CSS-строку. */
export const resolveViewportPadding = (padding: TCarouselViewportPadding | undefined): ICarouselPaddingResult => {
    if (padding === undefined) {
        return {
            metrics: { top: 0, right: 0, bottom: 0, left: 0 },
            style: "0px",
        };
    }

    if (typeof padding === "number") {
        const v = clean(padding);
        return {
            metrics: { top: v, right: v, bottom: v, left: v },
            style: `${v}px`,
        };
    }

    if (Array.isArray(padding)) {
        const [t, r, b, l] = padding.map(clean);
        switch (padding.length) {
            case 2:
                return {
                    metrics: { top: t, right: r, bottom: t, left: r },
                    style: `${t}px ${r}px`,
                };
            case 3:
                return {
                    metrics: { top: t, right: r, bottom: b, left: r },
                    style: `${t}px ${r}px ${b}px`,
                };
            case 4:
                return {
                    metrics: { top: t, right: r, bottom: b, left: l },
                    style: `${t}px ${r}px ${b}px ${l}px`,
                };
        }
    }

    return {
        metrics: { top: 0, right: 0, bottom: 0, left: 0 },
        style: "0px",
    };
};

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
