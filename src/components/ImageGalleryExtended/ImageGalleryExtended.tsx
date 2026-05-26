import React, { useCallback } from "react";
import clsx from "clsx";
import { isKey } from "../../utils/keyboard";
import { ImageGalleryExtendedContext } from "./ImageGalleryExtendedContext";
import { ImageGalleryExtendedMain } from "./components/ImageGalleryExtendedMain";
import { ImageGalleryExtendedNav } from "./components/ImageGalleryExtendedNav";
import { ImageGalleryExtendedArrow } from "./components/ImageGalleryExtendedArrow";
import { ImageGalleryExtendedThumbnails } from "./components/ImageGalleryExtendedThumbnails";
import { ImageGalleryExtendedThumb } from "./components/ImageGalleryExtendedThumb";
import { ImageGalleryExtendedDots } from "./components/ImageGalleryExtendedDots";
import { IImageGalleryExtendedProps } from "./types";
import styles from "./styles/ImageGalleryExtended.module.less";

/** Внутренние составляющие компонента ImageGalleryExtended. */
interface IImageGalleryExtendedComposition {
    Main: typeof ImageGalleryExtendedMain;
    Nav: typeof ImageGalleryExtendedNav;
    Arrow: typeof ImageGalleryExtendedArrow;
    Thumbnails: typeof ImageGalleryExtendedThumbnails;
    Thumb: typeof ImageGalleryExtendedThumb;
    Dots: typeof ImageGalleryExtendedDots;
}

/**
 * Базовый (controlled) компонент галереи изображений. Изображения задаются
 * массивом `items`, управляет активным индексом и стрелочной навигацией,
 * раздаёт данные составным частям через контекст. Раскладка — декларативно:
 *
 * ```tsx
 * <ImageGalleryExtended
 *     items={[{ id: "a", src: "1.jpg", alt: "…" }]}
 *     selectedId={id}
 *     onChange={setId}
 * >
 *     <ImageGalleryExtended.Main withBlur />
 *     <ImageGalleryExtended.Thumbnails />
 * </ImageGalleryExtended>
 * ```
 *
 * Uncontrolled-режим и пресет раскладки см. в `ImageGallery`.
 */
const ImageGalleryExtendedRoot = React.forwardRef<HTMLDivElement, IImageGalleryExtendedProps>(
    ({ items, children, className, selectedId, onChange, onKeyDown, ...rest }, ref) => {
        // Активный id резолвится в позицию; неизвестный/отсутствующий id → первый элемент.
        const rawIndex = items.findIndex((item) => item.id === selectedId);
        const currentIndex = rawIndex >= 0 ? rawIndex : 0;

        const handleSelect = useCallback(
            (next: number) => {
                const clamped = items.length > 0 ? Math.min(Math.max(next, 0), items.length - 1) : 0;
                const nextId = items[clamped]?.id;
                if (nextId !== undefined && nextId !== selectedId) {
                    onChange(nextId);
                }
            },
            [items, selectedId, onChange],
        );

        const handlePrev = useCallback(() => handleSelect(currentIndex - 1), [currentIndex, handleSelect]);
        const handleNext = useCallback(() => handleSelect(currentIndex + 1), [currentIndex, handleSelect]);

        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            const key = event.code || event.keyCode;

            if (isKey(key, "ARROW_LEFT")) {
                event.preventDefault();
                handlePrev();
            } else if (isKey(key, "ARROW_RIGHT")) {
                event.preventDefault();
                handleNext();
            }

            onKeyDown?.(event);
        };

        return (
            <ImageGalleryExtendedContext.Provider
                value={{
                    items,
                    selectedIndex: currentIndex,
                    onSelect: handleSelect,
                    onPrev: handlePrev,
                    onNext: handleNext,
                }}
            >
                <div
                    tabIndex={0}
                    {...rest}
                    ref={ref}
                    className={clsx(styles.root, className)}
                    onKeyDown={handleKeyDown}
                >
                    {children}
                </div>
            </ImageGalleryExtendedContext.Provider>
        );
    },
);

ImageGalleryExtendedRoot.displayName = "ImageGalleryExtended";

/** Compound-компонент с составными частями галереи. */
export const ImageGalleryExtended: typeof ImageGalleryExtendedRoot & IImageGalleryExtendedComposition = Object.assign(
    ImageGalleryExtendedRoot,
    {
        Main: ImageGalleryExtendedMain,
        Nav: ImageGalleryExtendedNav,
        Arrow: ImageGalleryExtendedArrow,
        Thumbnails: ImageGalleryExtendedThumbnails,
        Thumb: ImageGalleryExtendedThumb,
        Dots: ImageGalleryExtendedDots,
    },
);
