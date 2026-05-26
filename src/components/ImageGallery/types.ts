import React from "react";

/** Свойства компонента ImageGallery. */
export interface IImageGalleryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** Элементы галереи в виде `<ImageGallery.Item>`. */
    children: React.ReactNode;
    /** Идентификатор активного изображения в controlled-режиме. */
    selectedId?: string;
    /** Идентификатор активного изображения по умолчанию (uncontrolled-режим). */
    defaultId?: string;
    /** Обработчик смены активного изображения. */
    onChange?: (id: string) => void;
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
