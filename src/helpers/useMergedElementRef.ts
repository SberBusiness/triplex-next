import { useMemo, type Ref } from "react";
import { mergeRefs } from "../utils/refs";

/** Сохраняет callback объединённого ref, пока не сменится один из получателей. */
export function useMergedElementRef<T>(first: Ref<T> | undefined, second: Ref<T> | undefined) {
    return useMemo(() => mergeRefs(first, second), [first, second]);
}
