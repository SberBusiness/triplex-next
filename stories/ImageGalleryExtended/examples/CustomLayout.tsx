import React from "react";
import { ImageGalleryExtended } from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

/**
 * Порядок составных частей произволен: здесь лента миниатюр расположена над
 * крупной картинкой. Демонстрирует обе render-функции: `Thumbnails` рисует
 * миниатюры через `ImageGalleryExtended.Thumb` (можно подставить любую разметку,
 * проброс `ref` включает автоцентровку), а вместо стандартных стрелок `Nav`
 * отдаёт состояние навигации в кастомную панель «‹ N / Total ›».
 */
export const CustomLayout = () => {
    const [selectedId, setSelectedId] = React.useState("photo-1");

    return (
        <ImageGalleryExtended items={ITEMS} selectedId={selectedId} onChange={setSelectedId}>
            <ImageGalleryExtended.Thumbnails>
                {({ item, isActive, onSelect, ref }) => (
                    <ImageGalleryExtended.Thumb ref={ref} item={item} isActive={isActive} onClick={onSelect} />
                )}
            </ImageGalleryExtended.Thumbnails>
            <ImageGalleryExtended.Main withBlur height={400}>
                <ImageGalleryExtended.Nav>
                    {({ onPrev, onNext, isFirst, isLast, selectedIndex, itemsCount }) => (
                        <div
                            style={{
                                position: "absolute",
                                bottom: 12,
                                left: "50%",
                                zIndex: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "6px 14px",
                                borderRadius: 20,
                                transform: "translateX(-50%)",
                                background: "rgba(0, 0, 0, 0.5)",
                                color: "#fff",
                            }}
                        >
                            <button
                                type="button"
                                aria-label="Предыдущее изображение"
                                disabled={isFirst}
                                onClick={onPrev}
                                style={{
                                    border: "none",
                                    background: "none",
                                    color: "inherit",
                                    fontSize: 18,
                                    cursor: isFirst ? "default" : "pointer",
                                    opacity: isFirst ? 0.4 : 1,
                                }}
                            >
                                ‹
                            </button>
                            <span>
                                {selectedIndex + 1} / {itemsCount}
                            </span>
                            <button
                                type="button"
                                aria-label="Следующее изображение"
                                disabled={isLast}
                                onClick={onNext}
                                style={{
                                    border: "none",
                                    background: "none",
                                    color: "inherit",
                                    fontSize: 18,
                                    cursor: isLast ? "default" : "pointer",
                                    opacity: isLast ? 0.4 : 1,
                                }}
                            >
                                ›
                            </button>
                        </div>
                    )}
                </ImageGalleryExtended.Nav>
            </ImageGalleryExtended.Main>
        </ImageGalleryExtended>
    );
};
