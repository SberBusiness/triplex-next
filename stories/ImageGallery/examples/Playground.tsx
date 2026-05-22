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

/** Аргументы Playground story. */
export interface IPlaygroundArgs {
    height: "auto" | number;
    withBlur: boolean;
    showThumbnails: boolean;
    showDots: boolean;
    defaultIndex: number;
}

export const Playground = ({ height, withBlur, showThumbnails, showDots, defaultIndex }: IPlaygroundArgs) => (
    <ImageGallery
        defaultIndex={defaultIndex}
        height={height}
        withBlur={withBlur}
        showThumbnails={showThumbnails}
        showDots={showDots}
    >
        {IMAGES.map((src, index) => (
            <ImageGallery.Item key={src} src={src} alt={`Photo ${index + 1}`} />
        ))}
    </ImageGallery>
);
