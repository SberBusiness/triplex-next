import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { isKey } from "../../utils/keyboard";
import { MobileView } from "../MobileView";
import { ImageGalleryDots } from "./ImageGalleryDots";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { ImageGalleryMain } from "./ImageGalleryMain";
import { ImageGalleryThumbnails } from "./ImageGalleryThumbnails";
import { IImageGalleryItemProps, IImageGalleryProps } from "./types";
import styles from "./styles/ImageGallery.module.less";

/**
 * Извлекает props у `ImageGallery.Item` из children, отфильтровывая остальные элементы.
 */
const extractItems = (children: React.ReactNode): ReadonlyArray<IImageGalleryItemProps> =>
    React.Children.toArray(children)
        .filter(
            (child): child is React.ReactElement<IImageGalleryItemProps> =>
                React.isValidElement(child) && child.type === ImageGalleryItem,
        )
        .map((child) => child.props);

/**
 * Галерея изображений с лентой миниатюр (десктоп) и тиками-индикаторами (мобильный).
 *
 * Дочерние элементы задаются в виде `<ImageGallery.Item src alt thumbSrc?>`.
 * Поддерживает controlled (`selectedIndex` + `onChange`) и uncontrolled
 * (`defaultIndex`) режимы. На мобильном устройстве свайп листает крупное
 * изображение через `SwipeableArea`.
 */
const ImageGalleryRoot = React.forwardRef<HTMLDivElement, IImageGalleryProps>(
    (
        {
            children,
            className,
            selectedIndex,
            defaultIndex = 0,
            onChange,
            onImageClick,
            height = "auto",
            withBlur = true,
            showThumbnails = true,
            showDots = true,
            onKeyDown,
            ...rest
        },
        ref,
    ) => {
        const items = extractItems(children);
        const isControlled = selectedIndex !== undefined;
        const [innerIndex, setInnerIndex] = useState(defaultIndex);
        const rawIndex = isControlled ? selectedIndex : innerIndex;
        const currentIndex = items.length > 0 ? Math.min(Math.max(rawIndex, 0), items.length - 1) : 0;

        const updateIndex = useCallback(
            (next: number) => {
                const clamped = items.length > 0 ? Math.min(Math.max(next, 0), items.length - 1) : 0;
                if (!isControlled) {
                    setInnerIndex(clamped);
                }
                if (clamped !== currentIndex) {
                    onChange?.(clamped);
                }
            },
            [currentIndex, isControlled, items.length, onChange],
        );

        const handlePrev = useCallback(() => updateIndex(currentIndex - 1), [currentIndex, updateIndex]);
        const handleNext = useCallback(() => updateIndex(currentIndex + 1), [currentIndex, updateIndex]);

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

        if (items.length === 0) {
            return <div ref={ref} tabIndex={0} {...rest} className={clsx(styles.root, className)} />;
        }

        return (
            <div tabIndex={0} {...rest} ref={ref} className={clsx(styles.root, className)} onKeyDown={handleKeyDown}>
                <ImageGalleryMain
                    item={items[currentIndex]}
                    selectedIndex={currentIndex}
                    itemsCount={items.length}
                    height={height}
                    withBlur={withBlur}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onImageClick={onImageClick}
                />

                <MobileView
                    fallback={
                        showThumbnails ? (
                            <ImageGalleryThumbnails items={items} selectedIndex={currentIndex} onSelect={updateIndex} />
                        ) : null
                    }
                >
                    {showDots ? (
                        <ImageGalleryDots
                            itemsCount={items.length}
                            selectedIndex={currentIndex}
                            onSelect={updateIndex}
                        />
                    ) : null}
                </MobileView>
            </div>
        );
    },
);

ImageGalleryRoot.displayName = "ImageGallery";

/** Compound-компонент с маркер-элементом `Item`. */
export const ImageGallery = Object.assign(ImageGalleryRoot, {
    Item: ImageGalleryItem,
});
