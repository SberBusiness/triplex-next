import React, { useContext } from "react";
import clsx from "clsx";
import { ImageGalleryExtendedContext } from "../ImageGalleryExtendedContext";
import styles from "../styles/ImageGalleryExtendedDots.module.less";

/** Свойства ImageGalleryExtendedDots. */
export interface IImageGalleryExtendedDotsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Максимальное количество тиков. */
const MAX_TICKS = 4;

/**
 * Ряд кликабельных тиков-индикаторов (мобильный preset). Данные берёт из
 * контекста `ImageGalleryExtended`.
 *
 * Картинки распределяются по тикам бакетами равного размера; остаток уходит
 * в последний бакет. При количестве элементов `<= 1` ничего не рендерится.
 */
export const ImageGalleryExtendedDots = React.forwardRef<HTMLDivElement, IImageGalleryExtendedDotsProps>(
    ({ className, ...rest }, ref) => {
        const { items, selectedIndex, onSelect } = useContext(ImageGalleryExtendedContext);
        const itemsCount = items.length;

        if (itemsCount <= 1) {
            return null;
        }

        const ticksCount = Math.min(itemsCount, MAX_TICKS);
        const bucketSize = Math.floor(itemsCount / ticksCount);
        const activeTick = Math.min(Math.floor(selectedIndex / bucketSize), ticksCount - 1);

        return (
            <div ref={ref} {...rest} className={clsx(styles.dots, className)}>
                {Array.from({ length: ticksCount }, (_, tickIndex) => {
                    const isActive = tickIndex === activeTick;
                    const targetIndex = tickIndex * bucketSize;
                    const item = items[targetIndex];

                    return (
                        <button
                            key={tickIndex}
                            type="button"
                            aria-current={isActive ? "true" : undefined}
                            aria-label={item.alt}
                            className={clsx(styles.dot, { [styles.active]: isActive })}
                            onClick={() => onSelect(targetIndex)}
                        />
                    );
                })}
            </div>
        );
    },
);

ImageGalleryExtendedDots.displayName = "ImageGalleryExtendedDots";
