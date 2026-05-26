import React from "react";
import { ImageGalleryExtended } from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

/**
 * Мобильный preset: крупная картинка + ряд тиков-индикаторов вместо ленты
 * миниатюр. Состав частей собирается вручную из примитивов Extended.
 */
export const WithDots = () => {
    const [selectedId, setSelectedId] = React.useState("photo-1");

    return (
        <ImageGalleryExtended items={ITEMS} selectedId={selectedId} onChange={setSelectedId}>
            <ImageGalleryExtended.Main withBlur />
            <ImageGalleryExtended.Dots />
        </ImageGalleryExtended>
    );
};
