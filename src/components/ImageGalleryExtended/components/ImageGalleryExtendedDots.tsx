import React, { useContext } from "react";
import clsx from "clsx";
import { ImageGalleryExtendedContext } from "../ImageGalleryExtendedContext";
import { IImageGalleryItemProps } from "../types";
import styles from "../styles/ImageGalleryExtendedDots.module.less";

/** Состояние тика-индикатора для формирования доступного имени. */
export interface IImageGalleryDotLabelState {
    /** Изображение, к которому ведёт тик. */
    item: IImageGalleryItemProps;
    /** Индекс изображения, к которому ведёт тик. */
    index: number;
    /** Индекс тика. */
    tickIndex: number;
    /** Активен ли тик. */
    isActive: boolean;
}

/** Свойства ImageGalleryExtendedDots. */
export interface IImageGalleryExtendedDotsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Формирует доступное имя кнопки тика. Если не задано, используется `item.alt`. */
    getDotAriaLabel?: (state: IImageGalleryDotLabelState) => string | undefined;
}

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
    ({ className, getDotAriaLabel, ...rest }, ref) => {
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
                    const ariaLabel = getDotAriaLabel?.({ item, index: targetIndex, tickIndex, isActive }) ?? item.alt;

                    return (
                        <button
                            key={tickIndex}
                            type="button"
                            aria-current={isActive ? "true" : undefined}
                            aria-label={ariaLabel}
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
