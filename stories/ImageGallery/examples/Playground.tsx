import React from "react";
import { ImageGallery } from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

/** Аргументы Playground story. */
export interface IPlaygroundArgs {
    height: "auto" | number;
    withBlur: boolean;
    showThumbnails: boolean;
    showDots: boolean;
    defaultId: string;
    prevArrowAriaLabel: string;
    nextArrowAriaLabel: string;
}

export const Playground = ({
    height,
    withBlur,
    showThumbnails,
    showDots,
    defaultId,
    prevArrowAriaLabel,
    nextArrowAriaLabel,
}: IPlaygroundArgs) => (
    <ImageGallery
        items={ITEMS}
        defaultId={defaultId}
        height={height}
        withBlur={withBlur}
        showThumbnails={showThumbnails}
        showDots={showDots}
        prevArrowAriaLabel={prevArrowAriaLabel}
        nextArrowAriaLabel={nextArrowAriaLabel}
    />
);
