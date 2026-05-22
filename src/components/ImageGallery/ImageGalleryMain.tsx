import React, { useRef } from "react";
import clsx from "clsx";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../Button/ButtonIcon";
import { MobileView } from "../MobileView";
import { SwipeableArea, ISwipeableAreaRef } from "../SwipeableArea";
import { IImageGalleryItemProps } from "./types";
import styles from "./styles/ImageGalleryMain.module.less";

/** Свойства ImageGalleryMain. */
export interface IImageGalleryMainProps {
    /** Активный элемент галереи. */
    item: IImageGalleryItemProps;
    /** Индекс активного элемента. */
    selectedIndex: number;
    /** Общее количество элементов. */
    itemsCount: number;
    /** Высота крупной картинки. `'auto'` — фиксированные значения по breakpoint. */
    height?: "auto" | number | string;
    /** Показывать ли блюр-слой по краям. */
    withBlur: boolean;
    /** Обработчик перехода к предыдущей картинке. */
    onPrev: () => void;
    /** Обработчик перехода к следующей картинке. */
    onNext: () => void;
    /** Обработчик клика по картинке. */
    onImageClick?: (index: number) => void;
    /** Дополнительный CSS-класс. */
    className?: string;
}

/**
 * Крупное изображение галереи: блюр-слой, само изображение, кнопки prev/next.
 * На мобильном устройстве обёрнуто в `SwipeableArea` со свайпом prev/next.
 */
export const ImageGalleryMain: React.FC<IImageGalleryMainProps> = ({
    item,
    selectedIndex,
    itemsCount,
    height = "auto",
    withBlur,
    onPrev,
    onNext,
    onImageClick,
    className,
}) => {
    const swipeRef = useRef<ISwipeableAreaRef>(null);

    const inlineHeight = height === "auto" ? undefined : typeof height === "number" ? `${height}px` : height;
    const isFirst = selectedIndex === 0;
    const isLast = selectedIndex === itemsCount - 1;

    const content = (
        <div className={clsx(styles.main, className)} style={inlineHeight ? { height: inlineHeight } : undefined}>
            {withBlur && (
                <div
                    className={styles.blur}
                    style={{ backgroundImage: `url(${item.src})` }}
                    aria-hidden="true"
                    data-testid="image-gallery-blur"
                />
            )}

            <img
                src={item.src}
                alt={item.alt ?? ""}
                className={clsx(styles.image, { [styles.clickable]: onImageClick !== undefined })}
                loading="lazy"
                onClick={onImageClick ? () => onImageClick(selectedIndex) : undefined}
            />

            <ButtonIcon
                className={clsx(styles.arrow, styles.prev)}
                tabIndex={-1}
                disabled={isFirst}
                hidden={itemsCount <= 1}
                onClick={onPrev}
            >
                <CaretleftStrokeSrvIcon24 paletteIndex={5} />
            </ButtonIcon>

            <ButtonIcon
                className={clsx(styles.arrow, styles.next)}
                tabIndex={-1}
                disabled={isLast}
                hidden={itemsCount <= 1}
                onClick={onNext}
            >
                <CaretrightStrokeSrvIcon24 paletteIndex={5} />
            </ButtonIcon>
        </div>
    );

    const handleSwipeLeft = () => {
        if (!isLast) {
            onNext();
        }
        swipeRef.current?.closeSwipe();
    };

    const handleSwipeRight = () => {
        if (!isFirst) {
            onPrev();
        }
        swipeRef.current?.closeSwipe();
    };

    const mobileContent =
        itemsCount > 1 ? (
            <SwipeableArea
                ref={swipeRef}
                leftSwipeableArea={<div className={styles.swipeIndicator} />}
                rightSwipeableArea={<div className={styles.swipeIndicator} />}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
            >
                {content}
            </SwipeableArea>
        ) : (
            content
        );

    return <MobileView fallback={content}>{mobileContent}</MobileView>;
};

ImageGalleryMain.displayName = "ImageGalleryMain";
