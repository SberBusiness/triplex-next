import React from "react";
import { ImageGallery } from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

const ARROW_PROPS = {
    prevArrowProps: { "aria-label": "Предыдущее изображение" },
    nextArrowProps: { "aria-label": "Следующее изображение" },
};

/**
 * Скриншот-тест стрелок навигации на границах диапазона (desktop preset).
 * Слева — первое изображение (стрелка «назад» disabled), справа — последнее
 * (стрелка «вперёд» disabled, плюс блюр-слой по краям крупной картинки).
 */
export const VisualTestsArrows = () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <div style={{ width: 480 }}>
            <ImageGallery items={ITEMS} defaultId="photo-1" withBlur={false} {...ARROW_PROPS} />
        </div>
        <div style={{ width: 480 }}>
            <ImageGallery items={ITEMS} defaultId="photo-9" withBlur {...ARROW_PROPS} />
        </div>
    </div>
);

/**
 * Скриншот-тест тиков-индикаторов (мобильный preset, XS viewport): лента
 * миниатюр заменяется рядом тиков, активный тик соответствует выбранному
 * бакету (третий из четырёх для `photo-5`).
 */
export const VisualTestsDots = () => (
    <div style={{ width: 360 }}>
        <ImageGallery items={ITEMS} defaultId="photo-5" withBlur showDots {...ARROW_PROPS} />
    </div>
);
