import React, { useCallback } from "react";
import clsx from "clsx";
import { isKey } from "../../utils/keyboard";
import { ImageGalleryExtendedContext } from "./ImageGalleryExtendedContext";
import { ImageGalleryExtendedItem } from "./components/ImageGalleryExtendedItem";
import { ImageGalleryExtendedMain } from "./components/ImageGalleryExtendedMain";
import { ImageGalleryExtendedNav } from "./components/ImageGalleryExtendedNav";
import { ImageGalleryExtendedArrow } from "./components/ImageGalleryExtendedArrow";
import { ImageGalleryExtendedThumbnails } from "./components/ImageGalleryExtendedThumbnails";
import { ImageGalleryExtendedDots } from "./components/ImageGalleryExtendedDots";
import { IImageGalleryExtendedProps, IImageGalleryItemProps } from "./types";
import styles from "./styles/ImageGalleryExtended.module.less";

/**
 * Извлекает props у `ImageGalleryExtended.Item` из children, отфильтровывая остальные элементы.
 */
const extractItems = (children: React.ReactNode): ReadonlyArray<IImageGalleryItemProps> =>
    React.Children.toArray(children)
        .filter(
            (child): child is React.ReactElement<IImageGalleryItemProps> =>
                React.isValidElement(child) && child.type === ImageGalleryExtendedItem,
        )
        .map((child) => child.props);

/** Внутренние составляющие компонента ImageGalleryExtended. */
interface IImageGalleryExtendedComposition {
    Item: typeof ImageGalleryExtendedItem;
    Main: typeof ImageGalleryExtendedMain;
    Nav: typeof ImageGalleryExtendedNav;
    Arrow: typeof ImageGalleryExtendedArrow;
    Thumbnails: typeof ImageGalleryExtendedThumbnails;
    Dots: typeof ImageGalleryExtendedDots;
}

/**
 * Базовый (controlled) компонент галереи изображений. Управляет активным
 * индексом и стрелочной навигацией, раздаёт данные составным частям через
 * контекст. Состав задаётся декларативно:
 *
 * ```tsx
 * <ImageGalleryExtended selectedId={id} onChange={setId}>
 *     <ImageGalleryExtended.Main withBlur />
 *     <ImageGalleryExtended.Thumbnails />
 *     <ImageGalleryExtended.Item id="a" src="1.jpg" alt="…" />
 * </ImageGalleryExtended>
 * ```
 *
 * Uncontrolled-режим и пресет раскладки см. в `ImageGallery`.
 */
const ImageGalleryExtendedRoot = React.forwardRef<HTMLDivElement, IImageGalleryExtendedProps>(
    ({ children, className, selectedId, onChange, onKeyDown, ...rest }, ref) => {
        const items = extractItems(children);
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
        Item: ImageGalleryExtendedItem,
        Main: ImageGalleryExtendedMain,
        Nav: ImageGalleryExtendedNav,
        Arrow: ImageGalleryExtendedArrow,
        Thumbnails: ImageGalleryExtendedThumbnails,
        Dots: ImageGalleryExtendedDots,
    },
);
