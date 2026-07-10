import React from "react";
import { EScreenWidth } from "../../helpers/breakpoints";
import { useMatchMedia } from "./useMatchMedia";

/** Свойства компонента MediaMaxWidth. */
export interface IMediaMaxWidthProps {
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
    const matches = useMatchMedia(`(max-width: ${maxWidth})`);

    return matches ? children : fallback;
};
