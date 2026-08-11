import React from "react";
import { EScreenWidth } from "../../helpers/breakpoints";
import { MediaMaxWidth } from "./MediaMaxWidth";
import { MediaMinWidth } from "./MediaMinWidth";
import { MediaBetweenWidth } from "./MediaBetweenWidth";

/** Свойства компонента MediaWidth. */
export interface IMediaProps {
    /** Элементы, которые рендерятся, когда ширина окна браузера попадает в диапазон minWidth и/или maxWidth. */
    children: React.ReactElement | null;
    /** Минимальная ширина экрана, при которой будут отрендерены children. */
    minWidth?: EScreenWidth;
    /** Максимальная ширина экрана, при которой будут отрендерены children. */
    maxWidth?: EScreenWidth;
    /** Элементы, которые рендерятся, когда ширина окна браузера не попадает в диапазон minWidth и/или maxWidth. */
    fallback: React.ReactElement | null;
}

/**
 * Компонент, который рендерит элементы в зависимости от ширины окна браузера.
 * Собственной разметки не добавляет: в зависимости от переданных minWidth и maxWidth делегирует рендер
 * в MediaBetweenWidth, MediaMinWidth или MediaMaxWidth. Если не передан ни minWidth, ни maxWidth,
 * медиа-запрос не строится и всегда рендерится fallback.
 */
export const MediaWidth: React.FC<IMediaProps> = ({ children, fallback, maxWidth, minWidth }) => {
    if (minWidth && maxWidth) {
        return (
            <MediaBetweenWidth minWidth={minWidth} maxWidth={maxWidth} fallback={fallback}>
                {children}
            </MediaBetweenWidth>
        );
    } else if (minWidth) {
        return (
            <MediaMinWidth minWidth={minWidth} fallback={fallback}>
                {children}
            </MediaMinWidth>
        );
    } else if (maxWidth) {
        return (
            <MediaMaxWidth maxWidth={maxWidth} fallback={fallback}>
                {children}
            </MediaMaxWidth>
        );
    }

    return fallback;
};

MediaWidth.displayName = "MediaWidth";
