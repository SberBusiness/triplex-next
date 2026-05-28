import React from "react";
import {
    IImageGalleryDotLabelState,
    IImageGalleryItemProps,
    IImageGalleryThumbRenderState,
} from "../ImageGalleryExtended";

/** Свойства компонента ImageGallery. */
export interface IImageGalleryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** Изображения галереи. */
    items: ReadonlyArray<IImageGalleryItemProps>;
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
    /** Доступное имя кнопки перехода к предыдущему изображению. */
    prevArrowAriaLabel: string;
    /** Доступное имя кнопки перехода к следующему изображению. */
    nextArrowAriaLabel: string;
    /** Формирует доступное имя кнопки-миниатюры. Если не задано, используется `item.alt`. */
    getThumbnailAriaLabel?: (state: Omit<IImageGalleryThumbRenderState, "onSelect" | "ref">) => string | undefined;
    /** Формирует доступное имя кнопки тика. Если не задано, используется `item.alt`. */
    getDotAriaLabel?: (state: IImageGalleryDotLabelState) => string | undefined;
}
