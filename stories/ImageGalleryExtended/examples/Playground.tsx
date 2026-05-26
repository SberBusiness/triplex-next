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

/** Аргументы Playground story. */
export interface IPlaygroundArgs {
    withBlur: boolean;
    height: "auto" | number;
}

export const Playground = ({ withBlur, height }: IPlaygroundArgs) => {
    const [selectedId, setSelectedId] = React.useState("photo-1");

    return (
        <ImageGalleryExtended selectedId={selectedId} onChange={setSelectedId}>
            <ImageGalleryExtended.Main withBlur={withBlur} height={height} />
            <ImageGalleryExtended.Thumbnails />
            {IMAGES.map((src, i) => (
                <ImageGalleryExtended.Item key={src} id={`photo-${i + 1}`} src={src} alt={`Photo ${i + 1}`} />
            ))}
        </ImageGalleryExtended>
    );
};
