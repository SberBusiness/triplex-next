import React, { useContext, useRef } from "react";
import clsx from "clsx";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../../Button/ButtonIcon";
import { MobileView } from "../../MobileView";
import { SwipeableArea, ISwipeableAreaRef } from "../../SwipeableArea";
import { ImageGalleryExtendedContext } from "../ImageGalleryExtendedContext";
import styles from "../styles/ImageGalleryExtendedMain.module.less";

/** Свойства ImageGalleryExtendedMain. */
export interface IImageGalleryExtendedMainProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Высота крупной картинки. `'auto'` — фиксированные значения по breakpoint. */
    height?: "auto" | number | string;
    /** Показывать ли блюр-слой по краям. */
    withBlur?: boolean;
    /** Обработчик клика по картинке. Получает индекс активного изображения. */
    onImageClick?: (index: number) => void;
}

/**
 * Крупное изображение галереи: блюр-слой, само изображение, кнопки prev/next.
 * Данные берёт из контекста `ImageGalleryExtended`. На мобильном устройстве
 * обёрнуто в `SwipeableArea` со свайпом prev/next.
 */
export const ImageGalleryExtendedMain: React.FC<IImageGalleryExtendedMainProps> = ({
    height = "auto",
    withBlur = false,
    onImageClick,
    className,
    ...rest
}) => {
    const { items, selectedIndex, onPrev, onNext } = useContext(ImageGalleryExtendedContext);
    const swipeRef = useRef<ISwipeableAreaRef>(null);

    const item = items[selectedIndex];
    const itemsCount = items.length;

    if (!item) {
        return null;
    }

    const inlineHeight = height === "auto" ? undefined : typeof height === "number" ? `${height}px` : height;
    const isFirst = selectedIndex === 0;
    const isLast = selectedIndex === itemsCount - 1;

    const content = (
        <div
            {...rest}
            className={clsx(styles.main, className)}
            style={inlineHeight ? { height: inlineHeight } : undefined}
        >
            {withBlur && (
                <div className={styles.blur} style={{ backgroundImage: `url(${item.src})` }} aria-hidden="true" />
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

ImageGalleryExtendedMain.displayName = "ImageGalleryExtendedMain";
