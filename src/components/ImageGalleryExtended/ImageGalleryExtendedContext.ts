import React from "react";
import { IImageGalleryItemProps } from "./types";

/** Контекст ImageGalleryExtended. Связывает контейнер с составными частями (`Main`/`Thumbnails`/`Dots`). */
export interface IImageGalleryExtendedContext {
    /** Список изображений галереи (из пропа `items` контейнера). */
    items: ReadonlyArray<IImageGalleryItemProps>;
    /** Индекс активного изображения (уже приведён к допустимому диапазону). */
    selectedIndex: number;
    /** Выбрать изображение по индексу. */
    onSelect: (index: number) => void;
    /** Перейти к предыдущему изображению. */
    onPrev: () => void;
    /** Перейти к следующему изображению. */
    onNext: () => void;
}

const contextInitial: IImageGalleryExtendedContext = {
    items: [],
    selectedIndex: 0,
    onSelect: () => {},
    onPrev: () => {},
    onNext: () => {},
};

export const ImageGalleryExtendedContext = React.createContext<IImageGalleryExtendedContext>(contextInitial);

ImageGalleryExtendedContext.displayName = "ImageGalleryExtendedContext";
