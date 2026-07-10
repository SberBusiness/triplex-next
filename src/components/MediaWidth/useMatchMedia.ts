import { useEffect, useState } from "react";

/**
 * Хук для императивного выполнения и отслеживания media queries
 * @param query Media query
 * @param initial Начальное значение
 * @returns Результат window.matchMedia(query)
 */
export function useMatchMedia(query: string): boolean {
    const [state, setState] = useState(() => ({ query, matches: window.matchMedia(query).matches }));

    if (state.query !== query) {
        setState({ query, matches: window.matchMedia(query).matches });
    }

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        const handleChangeMatches = (event: MediaQueryListEvent) => setState({ query, matches: event.matches });

        if (mediaQueryList.addEventListener) {
            mediaQueryList.addEventListener("change", handleChangeMatches);
        } else {
            mediaQueryList.addListener(handleChangeMatches);
        }

        return () => {
            if (mediaQueryList.removeEventListener) {
                mediaQueryList.removeEventListener("change", handleChangeMatches);
            } else {
                mediaQueryList.removeListener(handleChangeMatches);
            }
        };
    }, [query]);

    return state.matches;
}
