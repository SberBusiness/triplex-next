import React, { useEffect } from "react";
import { EScreenWidth } from "../../enums/EScreenWidth";

/**
 * Свойства MediaMaxWidth.
 */
interface IMediaMaxWidthProps {
    /** Элементы, которые рендерятся, когда ширина окна браузера соответствует значению maxWidth. */
    children: React.ReactElement | null;
    /** Максимальная ширина экран, при которой будут отрендерены children. */
    maxWidth: EScreenWidth;
    /** Элементы, которые рендерятся, когда ширина окна браузера не попадает в диапазон minWidth и/или maxWidth. */
    fallback: React.ReactElement | null;
}

/**
 * Компонент, который рендерит children в случае, если ширина окна браузера соответствует значению maxWidth.
 * В противном случае рендерится fallback.
 */
export const MediaMaxWidth: React.FC<IMediaMaxWidthProps> = ({ children, fallback, maxWidth }) => {
    const [matches, setMatches] = React.useState(window.innerWidth <= parseInt(maxWidth));

    useEffect(() => {
        const mediaQueryList = window.matchMedia(`(max-width: ${maxWidth})`);
        const handleChangeMatches = (event: MediaQueryListEvent) => setMatches(event.matches);

        if ("addEventListener" in mediaQueryList) {
            mediaQueryList.addEventListener("change", handleChangeMatches);
        } else if ("addListener" in mediaQueryList) {
            (mediaQueryList as MediaQueryList).addListener(handleChangeMatches);
        }

        return () => {
            if ("removeEventListener" in mediaQueryList) {
                mediaQueryList.removeEventListener("change", handleChangeMatches);
            } else if ("removeListener" in mediaQueryList) {
                (mediaQueryList as MediaQueryList).removeListener(handleChangeMatches);
            }
        };
    }, [maxWidth]);

    return matches ? children : fallback;
};
