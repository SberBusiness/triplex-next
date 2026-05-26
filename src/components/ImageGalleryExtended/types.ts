import React from "react";

/** Свойства одного элемента галереи (`ImageGalleryExtended.Item` / `ImageGallery.Item`). */
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
    /** Составные части: `ImageGalleryExtended.Main/.Thumbnails/.Dots` и маркеры `ImageGalleryExtended.Item`. */
    children: React.ReactNode;
    /** Идентификатор активного изображения (controlled). */
    selectedId: string;
    /** Обработчик смены активного изображения. */
    onChange: (id: string) => void;
}
