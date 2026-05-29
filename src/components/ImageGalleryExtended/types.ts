import React from "react";

/** Описание одного изображения галереи (элемент массива `items`). */
export interface IImageGalleryItemProps {
    /** Уникальный идентификатор изображения. */
    id: string;
    /** URL крупного изображения. */
    src: string;
    /** Текстовое описание изображения. */
    alt?: string;
    /** URL миниатюры. Если не задан, используется `src`. */
    thumbSrc?: string;
}

/** Свойства компонента ImageGalleryExtended. */
export interface IImageGalleryExtendedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** Изображения галереи. Раздаются составным частям через контекст. */
    items: ReadonlyArray<IImageGalleryItemProps>;
    /** Составные части: `ImageGalleryExtended.Main/.Thumbnails/.Dots`. */
    children: React.ReactNode;
    /** Идентификатор активного изображения (controlled). */
    selectedId: string;
    /** Обработчик смены активного изображения. */
    onChange: (id: string) => void;
}
