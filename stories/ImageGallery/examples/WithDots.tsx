import React from "react";
import { ImageGallery } from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

/**
 * На мобильном viewport (<768px) лента миниатюр заменяется кликабельными
 * тиками-индикаторами. Максимум 4 тика; картинки распределяются по бакетам.
 */
export const WithDots = () => (
    <ImageGallery
        items={ITEMS}
        showDots
        prevArrowProps={{ "aria-label": "Предыдущее изображение" }}
        nextArrowProps={{ "aria-label": "Следующее изображение" }}
    />
);
