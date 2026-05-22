import React from "react";
import clsx from "clsx";
import styles from "./styles/ImageGalleryDots.module.less";

/** Свойства ImageGalleryDots. */
export interface IImageGalleryDotsProps {
    /** Общее количество элементов галереи. */
    itemsCount: number;
    /** Индекс активного изображения. */
    selectedIndex: number;
    /** Обработчик выбора тика. Принимает индекс изображения, на которое нужно перейти. */
    onSelect: (index: number) => void;
    /** Дополнительный CSS-класс. */
    className?: string;
}

/** Максимальное количество тиков. */
const MAX_TICKS = 4;

/**
 * Ряд кликабельных тиков-индикаторов (мобильный preset).
 *
 * Картинки распределяются по тикам бакетами равного размера; остаток уходит
 * в последний бакет. При `itemsCount === 1` ничего не рендерится.
 */
export const ImageGalleryDots: React.FC<IImageGalleryDotsProps> = ({
    itemsCount,
    selectedIndex,
    onSelect,
    className,
}) => {
    if (itemsCount <= 1) {
        return null;
    }

    const ticksCount = Math.min(itemsCount, MAX_TICKS);
    const bucketSize = Math.floor(itemsCount / ticksCount);
    const activeTick = Math.min(Math.floor(selectedIndex / bucketSize), ticksCount - 1);

    return (
        <div className={clsx(styles.dots, className)} role="tablist">
            {Array.from({ length: ticksCount }, (_, tickIndex) => {
                const isActive = tickIndex === activeTick;

                return (
                    <button
                        key={tickIndex}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={clsx(styles.dot, { [styles.active]: isActive })}
                        data-testid="image-gallery-dot"
                        onClick={() => onSelect(tickIndex * bucketSize)}
                    />
                );
            })}
        </div>
    );
};

ImageGalleryDots.displayName = "ImageGalleryDots";
