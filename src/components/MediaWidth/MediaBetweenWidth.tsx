import React from "react";
import { EScreenWidth } from "@sberbusiness/triplex-next/helpers/breakpoints";
import { useMatchMedia } from "@sberbusiness/triplex-next/components/MediaWidth/useMatchMedia";

/**
 * Свойства MediaBetweenWidth.
 */
interface IMediaBetweenWidthProps {
    /** Элементы, которые рендерятся, когда ширина окна браузера попадает в диапазон minWidth и/или maxWidth. */
    children: React.ReactElement | null;
    /** Минимальная ширина экран, при которой будут отрендерены children. */
    minWidth: EScreenWidth;
    /** Максимальная ширина экран, при которой будут отрендерены children. */
    maxWidth: EScreenWidth;
    /** Элементы, которые рендерятся, когда ширина окна браузера не попадает в диапазон minWidth и/или maxWidth. */
    fallback: React.ReactElement | null;
}

/**
 * Компонент, который рендерит children в случае, если ширина окна браузера попадает в диапазон между minWidth и maxWidth.
 * В противном случае рендерится fallback.
 */
export const MediaBetweenWidth: React.FC<IMediaBetweenWidthProps> = ({ children, fallback, minWidth, maxWidth }) => {
    const matches = useMatchMedia(
        `(max-width: ${maxWidth}) and (min-width: ${minWidth})`,
        window.innerWidth >= parseInt(minWidth) && window.innerWidth <= parseInt(maxWidth),
    );

    return matches ? children : fallback;
};
