import React, { useEffect } from "react";
import { EScreenWidth } from "../../enums/EScreenWidth";

/**
 * Свойства MediaMinWidth.
 */
interface IMediaMinWidthProps {
    /** Элементы, которые рендерятся, когда ширина окна браузера соответствует значению minWidth. */
    children: React.ReactElement | null;
    /** Минимальная ширина экран, при которой будут отрендерены children. */
    minWidth: EScreenWidth;
    /** Элементы, которые рендерятся, когда ширина окна браузера не попадает в диапазон minWidth и/или maxWidth. */
    fallback: React.ReactElement | null;
}

/**
 * Компонент, который рендерит children в случае, если ширина окна браузера соответствует значению minWidth.
 * В противном случае рендерится fallback.
 */
export const MediaMinWidth: React.FC<IMediaMinWidthProps> = ({ children, fallback, minWidth }) => {
    const [matches, setMatches] = React.useState(window.innerWidth >= parseInt(minWidth));

    useEffect(() => {
        const mediaQueryList = window.matchMedia(`(min-width: ${minWidth})`);
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
    }, [minWidth]);

    return matches ? children : fallback;
};
