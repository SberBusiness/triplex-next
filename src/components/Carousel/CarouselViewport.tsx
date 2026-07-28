import React, { useContext, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import { ICarouselViewportProps } from "./types";
import { CarouselContext } from "./CarouselContext";
import { mergeRefs } from "./utils";
import { ORIENTATION_TRANSFORM } from "./constants";
import { ECarouselOrientation } from "./enums";
import styles from "./styles/Carousel.module.less";

const ORIENTATION_TO_TOUCH_KEY = {
    [ECarouselOrientation.HORIZONTAL]: "clientX",
    [ECarouselOrientation.VERTICAL]: "clientY",
} as const;

const ORIENTATION_TO_CROSS_TOUCH_KEY = {
    [ECarouselOrientation.HORIZONTAL]: "clientY",
    [ECarouselOrientation.VERTICAL]: "clientX",
} as const;

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

        const draggingRef = useRef(false);
        const scrollingRef = useRef<boolean | null>(null);

        const startCoordsRef = useRef({ clientX: 0, clientY: 0 });
        const startOffsetRef = useRef(0);
        const dragDistanceRef = useRef(0);

        const touchMoveHandlerRef = useRef<typeof handleTouchMove | null>(null);
        const touchEndHandlerRef = useRef<typeof handleTouchEnd | null>(null);

        const clearTouchListeners = useCallback(() => {
            if (touchMoveHandlerRef.current) {
                window.removeEventListener("touchmove", touchMoveHandlerRef.current);
                touchMoveHandlerRef.current = null;
            }
            if (touchEndHandlerRef.current) {
                window.removeEventListener("touchend", touchEndHandlerRef.current);
                window.removeEventListener("touchcancel", touchEndHandlerRef.current);
                touchEndHandlerRef.current = null;
            }
        }, []);

        const handleTouchMove = useCallback((event: TouchEvent) => {
            if (!draggingRef.current || !trackRef.current) return;

            const touch = event.targetTouches[0];
            if (!touch) return;

            const orientation = orientationRef.current;
            const touchKey = ORIENTATION_TO_TOUCH_KEY[orientation];
            const crossKey = ORIENTATION_TO_CROSS_TOUCH_KEY[orientation];

            const dragDistance = touch[touchKey] - startCoordsRef.current[touchKey];
            const crossDistance = touch[crossKey] - startCoordsRef.current[crossKey];

            if (scrollingRef.current === null) {
                const absMain = Math.abs(dragDistance);
                const absCross = Math.abs(crossDistance);

                if (absMain > 5 || absCross > 5) {
                    scrollingRef.current = absCross > absMain;
                }
            }

            if (scrollingRef.current) {
                return;
            }

            if (event.cancelable) {
                event.preventDefault();
            }

            dragDistanceRef.current = dragDistance;
            const maxOffset = maxOffsetRef.current;
            const targetOffset = startOffsetRef.current - dragDistance;
            let currentTranslate = -targetOffset;

            if (targetOffset < 0) {
                currentTranslate = -targetOffset / 3;
            } else if (targetOffset > maxOffset) {
                currentTranslate = -(maxOffset + (targetOffset - maxOffset) / 3);
            }

            trackRef.current.style.transform = ORIENTATION_TRANSFORM[orientation](currentTranslate);
            trackRef.current.style.transition = "none";
        }, []);

        const handleTouchEnd = useCallback(
            (event: TouchEvent) => {
                if (!draggingRef.current) return;

                draggingRef.current = false;

                const scrolling = scrollingRef.current;
                scrollingRef.current = null;

                clearTouchListeners();

                if (!trackRef.current) return;

                trackRef.current.style.transition = "";

                if (event.type === "touchcancel" || scrolling) {
                    trackRef.current.style.transform = "";
                    return;
                }

                const finalDrag = dragDistanceRef.current;
                const threshold = 50;

                if (finalDrag > threshold) {
                    prevSlide();
                } else if (finalDrag < -threshold) {
                    nextSlide();
                }

                trackRef.current.style.transform = "";
            },
            [nextSlide, prevSlide, clearTouchListeners],
        );

        const handleTouchStart = useCallback<React.TouchEventHandler<HTMLDivElement>>(
            (event) => {
                const touch = event.targetTouches[0];
                if (!touch) return;

                draggingRef.current = true;
                scrollingRef.current = null;

                startCoordsRef.current = {
                    clientX: touch.clientX,
                    clientY: touch.clientY,
                };

                startOffsetRef.current = offsetRef.current;
                dragDistanceRef.current = 0;

                if (trackRef.current) {
                    trackRef.current.style.transition = "none";
                }

                clearTouchListeners();

                touchMoveHandlerRef.current = handleTouchMove;
                touchEndHandlerRef.current = handleTouchEnd;

                window.addEventListener("touchmove", handleTouchMove, { passive: false });
                window.addEventListener("touchend", handleTouchEnd);
                window.addEventListener("touchcancel", handleTouchEnd);

                onTouchStart?.(event);
            },
            [handleTouchMove, handleTouchEnd, clearTouchListeners, onTouchStart],
        );

        useEffect(() => {
            return () => {
                clearTouchListeners();
            };
        }, [clearTouchListeners]);

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
