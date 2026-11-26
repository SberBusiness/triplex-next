import React, { useRef, useLayoutEffect } from "react";

import { setForwardedRef } from "../helpers/setForwardedRef";

/** Доставляет узел всем ref и соблюдает способ отсоединения каждого получателя. */
export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
    return (node: T | null) => {
        const cleanups = refs.map((ref) => setForwardedRef(ref, node));

        // Если React получит cleanup, он уже не вызовет объединённый callback с null.
        if (cleanups.some(Boolean)) {
            return () => {
                cleanups.forEach((cleanup, index) => {
                    if (cleanup) {
                        cleanup();
                    } else {
                        setForwardedRef(refs[index], null);
                    }
                });
            };
        }
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
