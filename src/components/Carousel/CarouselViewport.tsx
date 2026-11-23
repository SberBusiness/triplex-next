import React, { useContext, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import { ICarouselViewportProps } from "./types";
import { CarouselContext } from "./CarouselContext";
import { mergeRefs, useLatestRef } from "../../utils/refs";
import { ORIENTATION_TRANSFORM } from "./constants";
import { EOrientation } from "../../enums";
import styles from "./styles/Carousel.module.less";

const ORIENTATION_TOUCH_KEYS = {
    [EOrientation.HORIZONTAL]: { main: "clientX", cross: "clientY" },
    [EOrientation.VERTICAL]: { main: "clientY", cross: "clientX" },
} as const;

/** Смещение в px, после которого жест закрепляется за осью карусели или за прокруткой страницы. */
const AXIS_LOCK_THRESHOLD = 5;
/** Строгий порог в px вдоль оси для перехода к соседнему слайду. */
const SWIPE_THRESHOLD = 50;
/** Во сколько раз уменьшается смещение за границей ленты. */
const RUBBER_BAND_RESISTANCE = 3;

/** Область просмотра карусели: ограничивает ленту и обрабатывает touch-жесты. */
export const CarouselViewport = React.forwardRef<HTMLDivElement, ICarouselViewportProps>(
    ({ children, className, style, onTouchStart, ...restProps }, ref) => {
        const {
            viewportPaddingStyle,
            nextSlide,
            prevSlide,
            offsetRef,
            maxOffsetRef,
            orientationRef,
            viewportRef,
            trackRef,
        } = useContext(CarouselContext);
        const combinedRef = mergeRefs(ref, viewportRef);
        // Обработчики на window живут весь жест, поэтому навигация берётся актуальной на момент touchend.
        const nextSlideRef = useLatestRef(nextSlide);
        const prevSlideRef = useLatestRef(prevSlide);

        const removeTouchListenersRef = useRef<(() => void) | null>(null);

        const clearTouchListeners = useCallback(() => {
            removeTouchListenersRef.current?.();
            removeTouchListenersRef.current = null;
        }, []);

        const startGesture = (touch: React.Touch) => {
            const orientation = orientationRef.current;
            const { main: mainKey, cross: crossKey } = ORIENTATION_TOUCH_KEYS[orientation];
            const startMain = touch[mainKey];
            const startCross = touch[crossKey];
            const startOffset = offsetRef.current;
            let scrolling: boolean | null = null;
            let dragDistance = 0;

            const handleTouchMove = (moveEvent: TouchEvent) => {
                if (!trackRef.current) return;

                const moveTouch = moveEvent.targetTouches[0];
                if (!moveTouch) return;

                const mainDistance = moveTouch[mainKey] - startMain;
                const crossDistance = moveTouch[crossKey] - startCross;

                if (scrolling === null) {
                    const absMain = Math.abs(mainDistance);
                    const absCross = Math.abs(crossDistance);

                    // До выбора оси touchmove не отменяется: иначе браузер может не начать прокрутку страницы.
                    if (absMain <= AXIS_LOCK_THRESHOLD && absCross <= AXIS_LOCK_THRESHOLD) return;

                    scrolling = absCross > absMain;

                    if (scrolling) {
                        // Иначе браузер ждёт non-passive listener на каждом touchmove прокрутки.
                        window.removeEventListener("touchmove", handleTouchMove);
                        return;
                    }

                    // Отключение transition обрывает анимацию перехода, поэтому только для жеста по оси карусели.
                    trackRef.current.style.transition = "none";
                }

                if (moveEvent.cancelable) {
                    moveEvent.preventDefault();
                }

                dragDistance = mainDistance;
                const maxOffset = maxOffsetRef.current;
                const targetOffset = startOffset - mainDistance;
                let currentTranslate = -targetOffset;

                if (targetOffset < 0) {
                    currentTranslate = -targetOffset / RUBBER_BAND_RESISTANCE;
                } else if (targetOffset > maxOffset) {
                    currentTranslate = -(maxOffset + (targetOffset - maxOffset) / RUBBER_BAND_RESISTANCE);
                }

                trackRef.current.style.transform = ORIENTATION_TRANSFORM[orientation](currentTranslate);
            };

            const handleTouchEnd = (endEvent: TouchEvent) => {
                clearTouchListeners();

                if (!trackRef.current) return;

                trackRef.current.style.transition = "";
                trackRef.current.style.transform = "";

                if (endEvent.type === "touchcancel" || scrolling) return;

                if (dragDistance > SWIPE_THRESHOLD) {
                    prevSlideRef.current();
                } else if (dragDistance < -SWIPE_THRESHOLD) {
                    nextSlideRef.current();
                }
            };

            clearTouchListeners();

            window.addEventListener("touchmove", handleTouchMove, { passive: false });
            window.addEventListener("touchend", handleTouchEnd);
            window.addEventListener("touchcancel", handleTouchEnd);

            removeTouchListenersRef.current = () => {
                window.removeEventListener("touchmove", handleTouchMove);
                window.removeEventListener("touchend", handleTouchEnd);
                window.removeEventListener("touchcancel", handleTouchEnd);
            };
        };

        const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
            const touch = event.targetTouches[0];
            if (touch) {
                startGesture(touch);
            }

            onTouchStart?.(event);
        };

        useEffect(() => clearTouchListeners, [clearTouchListeners]);

        const runtimeStyle = {
            "--triplex-next-runtime-carousel-viewport-padding": viewportPaddingStyle,
        };

        return (
            <div
                className={clsx(styles.viewPort, className)}
                {...restProps}
                onTouchStart={handleTouchStart}
                style={{
                    ...style,
                    ...runtimeStyle,
                }}
                ref={combinedRef}
            >
                {children}
            </div>
        );
    },
);

CarouselViewport.displayName = "Carousel.Viewport";
