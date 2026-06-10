import { useEffect, useState } from "react";

/**
 * Хук для императивного выполнения и отслеживания media queries
 * @param query Media query
 * @param initial Начальное значение
 * @returns Результат window.matchMedia(query)
 */
export function useMatchMedia(query: string, initialMatch: boolean): boolean {
    const [matches, setMatches] = useState(initialMatch);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const handleChangeMatches = (event: MediaQueryListEvent) => setMatches(event.matches);

        mediaQueryList.addEventListener("change", handleChangeMatches);

        return () => {
            mediaQueryList.removeEventListener("change", handleChangeMatches);
        };
    }, [query]);

    return matches;
}
