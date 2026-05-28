import React from "react";
import { ImageGalleryExtended, EImageGalleryArrowDirection } from "@sberbusiness/triplex-next";

/** Доступных файлов-картинок всего 9, поэтому в большом наборе они повторяются по кругу. */
const IMAGE_COUNT = 9;

const ITEMS = Array.from({ length: 20 }, (_, i) => {
    const imageIndex = (i % IMAGE_COUNT) + 1;

    return {
        id: `photo-${i + 1}`,
        src: `assets/images/imageGallery/0${imageIndex}.jpg`,
        alt: `Photo ${i + 1}`,
    };
});

/**
 * Большой набор (20 изображений) — проверяет горизонтальный скролл ленты миниатюр
 * и автоцентровку активной миниатюры, когда они не помещаются в видимую область.
 */
export const ManyThumbnails = () => {
    const [selectedId, setSelectedId] = React.useState("photo-1");

    return (
        <ImageGalleryExtended items={ITEMS} selectedId={selectedId} onChange={setSelectedId}>
            <ImageGalleryExtended.Main withBlur>
                <ImageGalleryExtended.Nav>
                    {({ onPrev, onNext, isFirst, isLast, itemsCount }) => (
                        <>
                            <ImageGalleryExtended.Arrow
                                direction={EImageGalleryArrowDirection.PREV}
                                aria-label="Предыдущее изображение"
                                onClick={onPrev}
                                disabled={isFirst}
                                hidden={itemsCount <= 1}
                            />
                            <ImageGalleryExtended.Arrow
                                direction={EImageGalleryArrowDirection.NEXT}
                                aria-label="Следующее изображение"
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
