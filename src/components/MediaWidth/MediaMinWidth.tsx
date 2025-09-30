import React from "react";
import { EScreenWidth } from "@sberbusiness/triplex-next/helpers/breakpoints";
import { useMatchMedia } from "@sberbusiness/triplex-next/components/MediaWidth/useMatchMedia";

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
    const matches = useMatchMedia(`(min-width: ${minWidth})`, window.innerWidth >= parseInt(minWidth));

    return matches ? children : fallback;
};
