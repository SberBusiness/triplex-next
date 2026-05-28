import React from "react";
import { ImageGallery } from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

export const PropsForwarding = () => (
    <ImageGallery
        items={ITEMS}
        prevArrowProps={{ "aria-label": "Предыдущее изображение" }}
        nextArrowProps={{ "aria-label": "Следующее изображение" }}
        thumbnailsProps={{
            id: "image-gallery-thumbnails",
            getThumbnailAriaLabel: ({ item, index }) => `Миниатюра ${index + 1}: ${item.id}`,
        }}
        dotsProps={{
            id: "image-gallery-dots",
            getDotAriaLabel: ({ item, tickIndex }) => `Тик ${tickIndex + 1}: ${item.id}`,
        }}
    />
);
