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

/**
 * Порядок составных частей произволен: здесь лента миниатюр расположена над
 * крупной картинкой. Вместо стандартных стрелок — кастомная панель «‹ N / Total ›»:
 * `ImageGalleryExtended.Nav` отдаёт состояние навигации через render-функцию,
 * а разметку кнопок задаёт потребитель.
 */
export const CustomLayout = () => {
    const [selectedId, setSelectedId] = React.useState("photo-1");

    return (
        <ImageGalleryExtended selectedId={selectedId} onChange={setSelectedId}>
            <ImageGalleryExtended.Thumbnails />
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
            {IMAGES.map((src, i) => (
                <ImageGalleryExtended.Item key={src} id={`photo-${i + 1}`} src={src} alt={`Photo ${i + 1}`} />
            ))}
        </ImageGalleryExtended>
    );
};
