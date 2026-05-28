import React from "react";
import {
    IImageGalleryExtendedArrowProps,
    IImageGalleryExtendedDotsProps,
    IImageGalleryExtendedThumbnailsProps,
    IImageGalleryItemProps,
} from "../ImageGalleryExtended";

/** Свойства стрелки, которые ImageGallery пробрасывает в ImageGalleryExtended.Arrow. */
export type TImageGalleryArrowProps = Omit<
    IImageGalleryExtendedArrowProps,
    "direction" | "onClick" | "disabled" | "hidden" | "type"
>;

/** Свойства ленты миниатюр, которые ImageGallery пробрасывает в ImageGalleryExtended.Thumbnails. */
export type TImageGalleryThumbnailsProps = Omit<IImageGalleryExtendedThumbnailsProps, "children">;

/** Свойства тиков, которые ImageGallery пробрасывает в ImageGalleryExtended.Dots. */
export type TImageGalleryDotsProps = Omit<IImageGalleryExtendedDotsProps, "children">;

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
    /** Высота крупного изображения. `'auto'` — фиксированные значения по breakpoint (504px / 264px). */
    height?: "auto" | number | string;
    /** Показывать ли блюр-слой по краям крупного изображения. */
    withBlur?: boolean;
    /** Показывать ли ленту миниатюр (десктоп). */
    showThumbnails?: boolean;
    /** Показывать ли ряд тиков-индикаторов (мобильный). */
    showDots?: boolean;
    /** Свойства кнопки перехода к предыдущему изображению. */
    prevArrowProps: TImageGalleryArrowProps;
    /** Свойства кнопки перехода к следующему изображению. */
    nextArrowProps: TImageGalleryArrowProps;
    /** Свойства ленты миниатюр (десктоп). */
    thumbnailsProps?: TImageGalleryThumbnailsProps;
    /** Свойства ряда тиков-индикаторов (мобильный). */
    dotsProps?: TImageGalleryDotsProps;
}
