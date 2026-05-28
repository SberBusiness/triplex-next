import React, { useCallback, useContext, useRef, useState } from "react";
import { ImageGalleryExtendedContext } from "../ImageGalleryExtendedContext";
import { ImageGalleryExtendedSlide } from "./ImageGalleryExtendedSlide";
import styles from "../styles/ImageGalleryExtendedMain.module.less";

/** Минимальная горизонтальная дистанция (px), при которой свайп засчитывается как переход. */
const SWIPE_MIN_DISTANCE = 50;
/** Смещение (px), после которого направление жеста фиксируется как горизонтальное/вертикальное. */
const DIRECTION_LOCK_PX = 8;
/** Коэффициент «резинки» при свайпе за пределы (на первом/последнем изображении). */
const EDGE_RESISTANCE = 0.35;
/** CSS-переход для доводки/возврата ленты. */
const SLIDE_TRANSITION = "transform 0.3s ease-out";

type SwipeDirection = "prev" | "next";

/** Свойства ленты свайпа. */
export interface IImageGalleryExtendedSwipeTrackProps {
    /** Показывать ли блюр-слой по краям изображений. */
    withBlur?: boolean;
    /** Обработчик клика по изображению. Получает индекс изображения. */
    onImageClick?: (index: number) => void;
}

/**
 * Лента крупного изображения со свайпом на мобильном. Рендерит окно из соседних
 * слайдов (prev/current/next) и двигает их за пальцем: на отпускании либо доводит
 * к соседнему изображению и меняет активное, либо возвращает текущее на место.
 * Вертикальный жест отдаётся скроллу страницы, горизонтальный — навигации.
 */
export const ImageGalleryExtendedSwipeTrack: React.FC<IImageGalleryExtendedSwipeTrackProps> = ({
    withBlur,
    onImageClick,
}) => {
    const { items, selectedIndex, onPrev, onNext } = useContext(ImageGalleryExtendedContext);

    // Сдвиг ленты за пальцем (px), направление доводки и флаг анимации перехода.
    const [dragX, setDragX] = useState(0);
    const [committing, setCommitting] = useState<SwipeDirection | null>(null);
    const [animating, setAnimating] = useState(false);

    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    // null — направление ещё не зафиксировано; true — горизонталь (свайп), false — вертикаль (скролл).
    const isHorizontalRef = useRef<boolean | null>(null);
    const trackElRef = useRef<HTMLDivElement | null>(null);

    const hasPrev = selectedIndex > 0;
    const hasNext = selectedIndex < items.length - 1;

    // Окно соседних слайдов и позиция текущего в нём.
    const slides = [
        ...(hasPrev ? [{ item: items[selectedIndex - 1], index: selectedIndex - 1 }] : []),
        { item: items[selectedIndex], index: selectedIndex },
        ...(hasNext ? [{ item: items[selectedIndex + 1], index: selectedIndex + 1 }] : []),
    ];
    const currentSlot = hasPrev ? 1 : 0;

    // touchmove вешаем нативным non-passive слушателем: React регистрирует touch-события
    // как passive, и preventDefault в onTouchMove не работает — страница скроллится при свайпе.
    const handleTouchMove = useCallback(
        (event: TouchEvent) => {
            const start = touchStartRef.current;

            if (!start) {
                return;
            }

            const deltaX = event.touches[0].clientX - start.x;
            const deltaY = event.touches[0].clientY - start.y;

            // Пока направление не зафиксировано — ждём заметного смещения и решаем: свайп или скролл.
            if (isHorizontalRef.current === null) {
                if (Math.abs(deltaX) < DIRECTION_LOCK_PX && Math.abs(deltaY) < DIRECTION_LOCK_PX) {
                    return;
                }
                isHorizontalRef.current = Math.abs(deltaX) > Math.abs(deltaY);
            }

            if (!isHorizontalRef.current) {
                return;
            }

            // Свайп активен — гасим вертикальный скролл страницы.
            event.preventDefault();

            // На краю (нет соседнего изображения) добавляем сопротивление — эффект «резинки».
            const atEdge = (deltaX > 0 && !hasPrev) || (deltaX < 0 && !hasNext);
            setDragX(atEdge ? deltaX * EDGE_RESISTANCE : deltaX);
        },
        [hasPrev, hasNext],
    );

    // Callback-ref: перевешиваем нативный слушатель на актуальную ленту (в т.ч. при смене MobileView-ветки).
    const setTrackRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (trackElRef.current) {
                trackElRef.current.removeEventListener("touchmove", handleTouchMove);
            }
            trackElRef.current = node;
            if (node) {
                node.addEventListener("touchmove", handleTouchMove, { passive: false });
            }
        },
        [handleTouchMove],
    );

    const handleTouchStart = (event: React.TouchEvent) => {
        if (committing) {
            return;
        }
        const touch = event.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        isHorizontalRef.current = null;
        setAnimating(false);
    };

    const handleTouchEnd = (event: React.TouchEvent) => {
        const start = touchStartRef.current;
        const isHorizontal = isHorizontalRef.current;
        touchStartRef.current = null;
        isHorizontalRef.current = null;

        if (!start || !isHorizontal) {
            return;
        }

        const deltaX = event.changedTouches[0].clientX - start.x;
        const goNext = deltaX < 0 && hasNext;
        const goPrev = deltaX > 0 && hasPrev;

        setAnimating(true);

        if (Math.abs(deltaX) >= SWIPE_MIN_DISTANCE && (goNext || goPrev)) {
            // Доводим ленту к соседнему слайду; активное изображение сменим по завершении анимации.
            setCommitting(goNext ? "next" : "prev");
        } else {
            // Порог не пройден или край — возвращаем ленту на место.
            setDragX(0);
        }
    };

    const handleTransitionEnd = (event: React.TransitionEvent) => {
        if (event.propertyName !== "transform") {
            return;
        }

        if (!committing) {
            // Закончился возврат ленты — анимация больше не нужна.
            setAnimating(false);
            return;
        }

        // Лента доехала до соседа: меняем активное изображение и мгновенно пере-центрируем
        // окно (соседний слайд становится текущим — визуально без скачка).
        if (committing === "next") {
            onNext();
        } else {
            onPrev();
        }

        setCommitting(null);
        setDragX(0);
        setAnimating(false);
    };

    // Базовое смещение центрирует текущий слайд; при доводке сдвигаемся к соседнему.
    const shift = committing === "next" ? currentSlot + 1 : committing === "prev" ? currentSlot - 1 : currentSlot;
    const transform = committing
        ? `translateX(calc(${-shift * 100}%))`
        : `translateX(calc(${-shift * 100}% + ${dragX}px))`;

    return (
        <div
            ref={setTrackRef}
            className={styles.track}
            style={{ transform, transition: animating ? SLIDE_TRANSITION : "none" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTransitionEnd={handleTransitionEnd}
        >
            {slides.map(({ item, index }) => (
                <ImageGalleryExtendedSlide
                    key={item.id}
                    item={item}
                    withBlur={withBlur}
                    onClick={onImageClick ? () => onImageClick(index) : undefined}
                />
            ))}
        </div>
    );
};

ImageGalleryExtendedSwipeTrack.displayName = "ImageGalleryExtendedSwipeTrack";
