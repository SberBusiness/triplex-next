import { useCallback, type ForwardedRef, type MutableRefObject } from "react";
import { setForwardedRef } from "./setForwardedRef";

/** Связывает внутренний и внешний ref, в том числе cleanup callback-ref в React 19. */
export function useMergedElementRef<T>(localRef: MutableRefObject<T | null>, forwardedRef: ForwardedRef<T>) {
    return useCallback(
        (node: T | null) => {
            localRef.current = node;
            if (typeof forwardedRef === "function") {
                const cleanup: unknown = forwardedRef(node);
                if (node !== null && typeof cleanup === "function") {
                    return () => {
                        localRef.current = null;
                        cleanup();
                    };
                }
            } else if (forwardedRef) {
                setForwardedRef(forwardedRef, node);
            }
        },
        [localRef, forwardedRef],
    );
}
