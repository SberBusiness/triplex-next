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
        prevArrowProps={{ "aria-label": "Предыдущее изображение", "data-test-id": "image-gallery-prev" }}
        nextArrowProps={{ "aria-label": "Следующее изображение", "data-test-id": "image-gallery-next" }}
        thumbnailsProps={{
            id: "image-gallery-thumbnails",
            "data-test-id": "image-gallery-thumbnails",
        }}
        dotsProps={{
            id: "image-gallery-dots",
            "data-test-id": "image-gallery-dots",
        }}
    />
);
