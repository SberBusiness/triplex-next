import React from "react";
import { ImageGalleryExtended, EImageGalleryArrowDirection } from "@sberbusiness/triplex-next";

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

/**
 * Только крупная картинка со стрелками — без миниатюр и тиков.
 * Навигация доступна стрелками и клавишами `←` / `→`.
 */
export const MainOnly = () => {
    const [selectedId, setSelectedId] = React.useState("photo-1");

    return (
        <ImageGalleryExtended selectedId={selectedId} onChange={setSelectedId}>
            <ImageGalleryExtended.Main withBlur>
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
            {IMAGES.map((src, i) => (
                <ImageGalleryExtended.Item key={src} id={`photo-${i + 1}`} src={src} alt={`Photo ${i + 1}`} />
            ))}
        </ImageGalleryExtended>
    );
};
