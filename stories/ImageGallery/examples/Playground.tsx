import React from "react";
import {
    ImageGallery,
    TImageGalleryArrowProps,
    TImageGalleryPageIndicatorsProps,
    TImageGalleryThumbnailsProps,
} from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

/** Аргументы Playground story. */
export interface IPlaygroundArgs {
    height: "auto" | number;
    withBlur: boolean;
    showThumbnails: boolean;
    showPageIndicators: boolean;
    defaultId: string;
    prevArrowProps: TImageGalleryArrowProps;
    nextArrowProps: TImageGalleryArrowProps;
    thumbnailsProps: TImageGalleryThumbnailsProps;
    pageIndicatorsProps: TImageGalleryPageIndicatorsProps;
}

export const Playground = ({
    height,
    withBlur,
    showThumbnails,
    showPageIndicators,
    defaultId,
    prevArrowProps,
    nextArrowProps,
    thumbnailsProps,
    pageIndicatorsProps,
}: IPlaygroundArgs) => (
    <ImageGallery
        items={ITEMS}
        defaultId={defaultId}
        height={height}
        withBlur={withBlur}
        showThumbnails={showThumbnails}
        showPageIndicators={showPageIndicators}
        prevArrowProps={prevArrowProps}
        nextArrowProps={nextArrowProps}
        thumbnailsProps={thumbnailsProps}
        pageIndicatorsProps={pageIndicatorsProps}
    />
);
