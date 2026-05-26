import React from "react";
import { ImageGalleryExtended, EImageGalleryArrowDirection } from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

/** Аргументы Playground story. */
export interface IPlaygroundArgs {
    withBlur: boolean;
    height: "auto" | number;
}

export const Playground = ({ withBlur, height }: IPlaygroundArgs) => {
    const [selectedId, setSelectedId] = React.useState("photo-1");

    return (
        <ImageGalleryExtended items={ITEMS} selectedId={selectedId} onChange={setSelectedId}>
            <ImageGalleryExtended.Main withBlur={withBlur} height={height}>
                <ImageGalleryExtended.Nav>
                    {({ onPrev, onNext, isFirst, isLast, itemsCount }) => (
                        <>
                            <ImageGalleryExtended.Arrow
                                direction={EImageGalleryArrowDirection.PREV}
                                onClick={onPrev}
                                disabled={isFirst}
                                hidden={itemsCount <= 1}
                            />
                            <ImageGalleryExtended.Arrow
                                direction={EImageGalleryArrowDirection.NEXT}
                                onClick={onNext}
                                disabled={isLast}
                                hidden={itemsCount <= 1}
                            />
                        </>
                    )}
                </ImageGalleryExtended.Nav>
            </ImageGalleryExtended.Main>
            <ImageGalleryExtended.Thumbnails />
        </ImageGalleryExtended>
    );
};
