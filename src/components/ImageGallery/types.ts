import React from "react";

/** Свойства одного элемента галереи (`ImageGallery.Item`). */
export interface IImageGalleryItemProps {
    /** URL крупного изображения. */
    src: string;
    /** Текстовое описание изображения. */
    alt?: string;
    /** URL миниатюры. Если не задан, используется `src`. */
    thumbSrc?: string;
}

/** Свойства компонента ImageGallery. */
export interface IImageGalleryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** Элементы галереи в виде `<ImageGallery.Item>`. */
    children: React.ReactNode;
    /** Индекс активного изображения в controlled-режиме. */
    selectedIndex?: number;
    /** Индекс активного изображения по умолчанию (uncontrolled-режим). */
    defaultIndex?: number;
    /** Обработчик смены активного индекса. */
    onChange?: (index: number) => void;
    /** Обработчик клика по крупному изображению. Получает индекс кликнутого изображения. */
    onImageClick?: (index: number) => void;
    /** Высота крупного изображения. `'auto'` — фиксированные значения по breakpoint (640px / 164px). */
    height?: "auto" | number | string;
    /** Показывать ли блюр-слой по краям крупного изображения. */
    withBlur?: boolean;
    /** Показывать ли ленту миниатюр (десктоп). */
    showThumbnails?: boolean;
    /** Показывать ли ряд тиков-индикаторов (мобильный). */
    showDots?: boolean;
}
