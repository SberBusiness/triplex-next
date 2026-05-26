import React from "react";
import { ImageGalleryExtended } from "@sberbusiness/triplex-next";

const IMAGES = [
    "/assets/images/imageGallery/01.jpg",
    "/assets/images/imageGallery/02.jpg",
    "/assets/images/imageGallery/03.jpg",
    "/assets/images/imageGallery/04.jpg",
    "/assets/images/imageGallery/05.jpg",
    "/assets/images/imageGallery/06.jpg",
    "/assets/images/imageGallery/07.jpg",
    "/assets/images/imageGallery/08.jpg",
    "/assets/images/imageGallery/09.jpg",
];

/**
 * Мобильный preset: крупная картинка + ряд тиков-индикаторов вместо ленты
 * миниатюр. Состав частей собирается вручную из примитивов Extended.
 */
export const WithDots = () => {
    const [selectedId, setSelectedId] = React.useState("photo-1");

    return (
        <ImageGalleryExtended selectedId={selectedId} onChange={setSelectedId}>
            <ImageGalleryExtended.Main withBlur />
            <ImageGalleryExtended.Dots />
            {IMAGES.map((src, i) => (
                <ImageGalleryExtended.Item key={src} id={`photo-${i + 1}`} src={src} alt={`Photo ${i + 1}`} />
            ))}
        </ImageGalleryExtended>
    );
};
