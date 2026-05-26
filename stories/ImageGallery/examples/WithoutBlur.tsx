import React from "react";
import { ImageGallery } from "@sberbusiness/triplex-next";

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

export const WithoutBlur = () => (
    <ImageGallery withBlur={false}>
        {IMAGES.map((src, index) => (
            <ImageGallery.Item key={src} id={`photo-${index + 1}`} src={src} alt={`Photo ${index + 1}`} />
        ))}
    </ImageGallery>
);
