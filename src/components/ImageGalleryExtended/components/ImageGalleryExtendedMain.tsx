import React, { useContext, useRef } from "react";
import clsx from "clsx";
import { MobileView } from "../../MobileView";
import { ImageGalleryExtendedContext } from "../ImageGalleryExtendedContext";
import styles from "../styles/ImageGalleryExtendedMain.module.less";

/** Минимальная горизонтальная дистанция (px), при которой жест считается свайпом навигации. */
const SWIPE_MIN_DISTANCE = 50;

/** Свойства ImageGalleryExtendedMain. */
export interface IImageGalleryExtendedMainProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Высота крупной картинки. `'auto'` — фиксированные значения по breakpoint. */
    height?: "auto" | number | string;
    /** Показывать ли блюр-слой по краям. */
    withBlur?: boolean;
    /** Обработчик клика по картинке. Получает индекс активного изображения. */
    onImageClick?: (index: number) => void;
    /** Накладываемое поверх картинки содержимое — например, `ImageGalleryExtended.Nav` со стрелками. */
    children?: React.ReactNode;
}

/**
 * Крупное изображение галереи: блюр-слой, само изображение и накладываемое
 * поверх содержимое (`children` — например стрелки через `ImageGalleryExtended.Nav`).
 * Данные берёт из контекста `ImageGalleryExtended`. На мобильном устройстве
 * (ширина < SM) поддерживает горизонтальный свайп для перехода prev/next.
 */
export const ImageGalleryExtendedMain: React.FC<IImageGalleryExtendedMainProps> = ({
    height = "auto",
    withBlur = false,
    onImageClick,
    className,
    children,
    ...rest
}) => {
    const { items, selectedIndex, onPrev, onNext } = useContext(ImageGalleryExtendedContext);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    const item = items[selectedIndex];
    const itemsCount = items.length;

    if (!item) {
        return null;
    }

    const inlineHeight = height === "auto" ? undefined : typeof height === "number" ? `${height}px` : height;

    const handleTouchStart = (event: React.TouchEvent) => {
        const touch = event.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (event: React.TouchEvent) => {
        const start = touchStartRef.current;
        touchStartRef.current = null;

        if (!start) {
            return;
        }

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - start.x;
        const deltaY = touch.clientY - start.y;

        // Игнорируем вертикальные (скролл) и слишком короткие жесты.
        if (Math.abs(deltaX) < SWIPE_MIN_DISTANCE || Math.abs(deltaX) <= Math.abs(deltaY)) {
            return;
        }

        // onPrev/onNext клампятся контейнером — отдельные проверки границ не нужны.
        if (deltaX < 0) {
            onNext();
        } else {
            onPrev();
        }
    };

    const renderCard = (swipeable: boolean) => (
        <div
            {...rest}
            className={clsx(styles.main, className)}
            style={inlineHeight ? { height: inlineHeight } : undefined}
            onTouchStart={swipeable ? handleTouchStart : undefined}
            onTouchEnd={swipeable ? handleTouchEnd : undefined}
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

            {children}
        </div>
    );

    // Свайп нужен только на мобильном и только когда есть куда листать.
    return <MobileView fallback={renderCard(false)}>{renderCard(itemsCount > 1)}</MobileView>;
};

ImageGalleryExtendedMain.displayName = "ImageGalleryExtendedMain";
