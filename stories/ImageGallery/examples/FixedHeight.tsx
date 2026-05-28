import React from "react";
import { ImageGallery } from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

export const FixedHeight = () => (
    <ImageGallery
        items={ITEMS}
        height={400}
        prevArrowAriaLabel="Предыдущее изображение"
        nextArrowAriaLabel="Следующее изображение"
    />
);
