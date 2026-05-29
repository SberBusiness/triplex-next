import React from "react";
import { action } from "storybook/actions";
import { ImageGalleryExtended, EImageGalleryArrowDirection } from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

/** Галерея с полным десктопным составом и стрелками поверх крупной картинки. */
const Gallery: React.FC<{ initialId: string; withBlur?: boolean }> = ({ initialId, withBlur }) => {
    const [selectedId, setSelectedId] = React.useState(initialId);

    return (
        <div style={{ width: 480 }}>
            <ImageGalleryExtended items={ITEMS} selectedId={selectedId} onChange={setSelectedId}>
                <ImageGalleryExtended.Main withBlur={withBlur}>
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
        </div>
    );
};

/**
 * Скриншот-вариант: стрелки навигации поверх крупной картинки. Стрелки видны
 * только при ховере на `.Main`, поэтому без интеракции на скриншоте их нет —
 * тест фиксирует, что без ховера стрелки не показываются. Слева — первое
 * изображение (стрелка «назад» disabled и потому скрыта вовсе), справа —
 * последнее (стрелка «вперёд» disabled, плюс блюр-слой).
 */
export const VisualTestsArrows = () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <Gallery initialId="photo-1" />
        <Gallery initialId="photo-9" withBlur />
    </div>
);

/** Только тики-индикаторы (мобильный preset): активный тик (бакет третьего) и обычные. */
export const VisualTestsDots = () => {
    const [selectedId, setSelectedId] = React.useState("photo-5");

    return (
        <div style={{ width: 360 }}>
            <ImageGalleryExtended
                items={ITEMS}
                selectedId={selectedId}
                onChange={(id) => {
                    setSelectedId(id);
                    action("onChange")(id);
                }}
            >
                <ImageGalleryExtended.Main withBlur />
                <ImageGalleryExtended.Dots />
            </ImageGalleryExtended>
        </div>
    );
};
