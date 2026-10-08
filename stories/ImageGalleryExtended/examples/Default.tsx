import React, { useState } from "react";
import { ImageGalleryExtended, EImageGalleryArrowDirection, MobileView } from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

/**
 * Полный состав: крупная картинка со стрелками + лента миниатюр на десктопе,
 * на мобильном (<768px) лента заменяется индикаторами страниц через `MobileView`.
 * Активный id хранится в состоянии (компонент controlled-only).
 */
export const Default = () => {
    const [selectedId, setSelectedId] = useState("photo-1");

    return (
        <ImageGalleryExtended items={ITEMS} selectedId={selectedId} onChange={setSelectedId}>
            <ImageGalleryExtended.Main>
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
            <MobileView fallback={<ImageGalleryExtended.Thumbnails />}>
                <ImageGalleryExtended.PageIndicators />
            </MobileView>
        </ImageGalleryExtended>
    );
};
