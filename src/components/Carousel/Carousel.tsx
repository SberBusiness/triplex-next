import React, { useState, useMemo, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import clsx from "clsx";
import { CarouselContext } from "./CarouselContext";
import { ICarouselProps } from "./types";
import { ECarouselOrientation, ECarouselScrollMode } from "./enums";
import { resolveViewportPadding, useLatestRef } from "./utils";
import styles from "./styles/Carousel.module.less";
import { CarouselViewport } from "./CarouselViewport";
import { CarouselTrack } from "./CarouselTrack";
import { CarouselItem } from "./CarouselItem";
import { CarouselPrevButton, CarouselNextButton } from "./CarouselButton";
import { CarouselIndicators } from "./CarouselIndicators";

const ORIENTATION_TO_PADDING_KEY = {
    [ECarouselOrientation.HORIZONTAL]: { start: "left", end: "right" },
    [ECarouselOrientation.VERTICAL]: { start: "top", end: "bottom" },
} as const;

const ORIENTATION_TO_RECT_SIZE_KEY = {
    [ECarouselOrientation.HORIZONTAL]: "width",
    [ECarouselOrientation.VERTICAL]: "height",
} as const;

const ORIENTATION_TO_CLIENT_SIZE_KEY = {
    [ECarouselOrientation.HORIZONTAL]: "clientWidth",
    [ECarouselOrientation.VERTICAL]: "clientHeight",
} as const;

const CarouselRoot = React.forwardRef<HTMLDivElement, ICarouselProps>(
    (
        {
            children,
            orientation = ECarouselOrientation.HORIZONTAL,
            scrollMode = ECarouselScrollMode.ITEM,
            gap = 16,
            viewportPadding = 0,
            className,
            ...restProps
        },
        ref,
    ) => {
        const [offset, setOffset] = useState(0);
        const [maxOffset, setMaxOffset] = useState(0);
        const [activeIndices, setActiveIndices] = useState<number[]>([]);
        const [currentIndex, setCurrentIndex] = useState(0);

        const paddingKey = Array.isArray(viewportPadding) ? viewportPadding.join(",") : String(viewportPadding);
        const { metrics: normalizedPadding, style: viewportPaddingStyle } = useMemo(
            () => resolveViewportPadding(viewportPadding),
            // eslint-disable-next-line react-hooks/exhaustive-deps -- мемоизация по значению, а не по ссылке
            [paddingKey],
        );

        // Защита от пересоздания обработчиков жестов во Viewport при смене ориентации
        const orientationRef = useLatestRef(orientation);
        // Защита от бесконечного цикла рендеров в updateOffsetAndPages
        const offsetRef = useLatestRef(offset);
        // Защита от stale closures в ResizeObserver
        const currentIndexRef = useLatestRef(currentIndex);

        const viewportRef = useRef<HTMLDivElement | null>(null);
        const trackRef = useRef<HTMLDivElement | null>(null);
        const slideRefs = useRef<Map<number, HTMLDivElement>>(new Map());
        const maxOffsetRef = useRef(maxOffset);

        // Реф для отслеживания запланированного кадра анимации
        const pageRafIdRef = useRef<number | null>(null);
        // Хранит настройки предыдущего успешного расчёта для авто-сброса кэша
        const lastConfigRef = useRef({ gap, scrollMode, orientation });

        const geometryCacheRef = useRef<{
            sizes: Map<number, number>;
            starts: Map<number, number>;
        }>({ sizes: new Map(), starts: new Map() });

        const pageMode = scrollMode === ECarouselScrollMode.PAGE;

        const getSlideSize = useCallback(
            (index: number) => {
                if (geometryCacheRef.current.sizes.has(index)) {
                    // Безопасно: строка выше гарантирует наличие значения в кэше.
                    return geometryCacheRef.current.sizes.get(index)!;
                }

                const slide = slideRefs.current.get(index);
                if (!slide) return 0;

                const rect = slide.getBoundingClientRect();
                const key = ORIENTATION_TO_RECT_SIZE_KEY[orientation];
                const size = rect[key];

                geometryCacheRef.current.sizes.set(index, size);
                return size;
            },
            [orientation],
        );

        const getSlidesCount = useCallback(() => slideRefs.current.size, []);

        const getSlideStart = useCallback(
            (index: number): number => {
                if (index <= 0) {
                    return 0;
                }

                if (geometryCacheRef.current.starts.has(index)) {
                    // Безопасно: строка выше гарантирует наличие значения в кэше.
                    return geometryCacheRef.current.starts.get(index)!;
                }

                const prevIndex = index - 1;
                const start = getSlideStart(prevIndex) + getSlideSize(prevIndex) + gap;

                geometryCacheRef.current.starts.set(index, start);
                return start;
            },
            [gap, getSlideSize],
        );

        const getSlideEnd = useCallback(
            (index: number) => {
                return getSlideStart(index) + getSlideSize(index);
            },
            [getSlideStart, getSlideSize],
        );

        const getViewportSize = useCallback(() => {
            if (!viewportRef.current) return 0;
            const key = ORIENTATION_TO_CLIENT_SIZE_KEY[orientation];
            return viewportRef.current[key];
        }, [orientation]);

        const updateOffsetAndPages = useCallback(
            (index: number) => {
                const lastConfig = lastConfigRef.current;
                if (
                    lastConfig.gap !== gap ||
                    lastConfig.scrollMode !== scrollMode ||
                    lastConfig.orientation !== orientation
                ) {
                    geometryCacheRef.current.sizes.clear();
                    geometryCacheRef.current.starts.clear();
                    lastConfigRef.current = { gap, scrollMode, orientation };
                }

                const slidesCount = getSlidesCount();
                if (slidesCount === 0) {
                    maxOffsetRef.current = 0;
                    setOffset((prev) => (prev !== 0 ? 0 : prev));
                    setMaxOffset((prev) => (prev !== 0 ? 0 : prev));
                    setActiveIndices(Array.of());
                    return;
                }

                const totalContentSize = getSlideEnd(slidesCount - 1);
                const containerSize = getViewportSize();

                const { start: startKey, end: endKey } = ORIENTATION_TO_PADDING_KEY[orientation];
                const startP = normalizedPadding[startKey];
                const endP = normalizedPadding[endKey];

                const calculatedMaxOffset = Math.max(0, totalContentSize + startP + endP - containerSize);
                maxOffsetRef.current = calculatedMaxOffset;

                let targetOffset = 0;

                if (pageMode && containerSize > 0) {
                    const pagesMatrix: number[][] = [];
                    let currentPage: number[] = [];
                    let currentGroupSize = 0;

                    for (let i = 0; i < slidesCount; i++) {
                        const slideSize = getSlideSize(i);
                        const addedSize = currentPage.length > 0 ? slideSize + gap : slideSize;

                        if (currentGroupSize + addedSize <= containerSize + 1) {
                            currentPage.push(i);
                            currentGroupSize += addedSize;
                        } else {
                            if (currentPage.length > 0) pagesMatrix.push(currentPage);
                            currentPage = [i];
                            currentGroupSize = slideSize;
                        }
                    }

                    if (currentPage.length > 0) pagesMatrix.push(currentPage);

                    const clampedIndex = Math.max(0, Math.min(index, pagesMatrix.length - 1));

                    if (clampedIndex !== index) {
                        if (pageRafIdRef.current !== null) {
                            cancelAnimationFrame(pageRafIdRef.current);
                        }

                        pageRafIdRef.current = requestAnimationFrame(() => {
                            setCurrentIndex(clampedIndex);
                            pageRafIdRef.current = null;
                        });
                    }

                    const validPageIndices = Array.from({ length: pagesMatrix.length }, (_, i) => i);

                    setActiveIndices((prev) => {
                        if (prev.length === validPageIndices.length) return prev;
                        return validPageIndices;
                    });

                    const currentGroup = pagesMatrix[clampedIndex];
                    if (currentGroup && currentGroup.length > 0) {
                        const firstSlideIndex = currentGroup[0];
                        const lastSlideIndex = currentGroup[currentGroup.length - 1];
                        const groupStart = getSlideStart(firstSlideIndex);

                        const lastSlideSize = getSlideSize(lastSlideIndex);
                        const groupEnd = getSlideStart(lastSlideIndex) + lastSlideSize;
                        const groupSize = groupEnd - groupStart;

                        targetOffset = groupStart - (containerSize - groupSize) / 2;
                    }
                } else {
                    setActiveIndices((prev) => (prev.length === 0 ? prev : []));

                    const slideStart = getSlideStart(index);
                    const slideEnd = getSlideEnd(index);

                    const currentOffset = offsetRef.current;
                    const containerEnd = currentOffset + containerSize;

                    // Ситуация 1: Слайд шире, чем сам контейнер (огромный слайд)
                    if (slideEnd - slideStart > containerSize) {
                        if (currentOffset < slideStart - startP) {
                            targetOffset = slideStart - startP;
                        } else if (currentOffset + containerSize > slideEnd + endP) {
                            targetOffset = slideEnd - containerSize + endP;
                        } else {
                            targetOffset = currentOffset;
                        }
                    }
                    // Ситуация 2: Стандартный слайд (меньше или равен размеру контейнера)
                    else {
                        if (slideEnd > containerEnd + 1) {
                            targetOffset = slideEnd - containerSize + startP + endP;
                        } else if (slideStart < currentOffset - 1) {
                            targetOffset = slideStart - startP;
                        } else {
                            targetOffset = currentOffset;
                        }
                    }
                }

                if (targetOffset <= 0 || calculatedMaxOffset === 0) {
                    setOffset(0);
                } else if (targetOffset >= calculatedMaxOffset) {
                    setOffset(calculatedMaxOffset);
                } else {
                    setOffset(targetOffset);
                }

                // Обновляем реактивный стейт для синхронизации с кнопками (стрелками)
                setMaxOffset((prev) => (prev !== calculatedMaxOffset ? calculatedMaxOffset : prev));
            },
            [
                gap,
                scrollMode,
                orientation,
                getSlidesCount,
                getSlideEnd,
                getViewportSize,
                normalizedPadding,
                pageMode,
                getSlideSize,
                getSlideStart,
            ],
        );

        const nextSlide = useCallback(() => {
            if (pageMode) {
                setCurrentIndex((prev) => (prev === activeIndices.length - 1 ? prev : prev + 1));
                return;
            }

            const slidesCount = getSlidesCount();
            const containerSize = getViewportSize();

            const currentSlideEnd = getSlideEnd(currentIndex);

            const { end: endKey } = ORIENTATION_TO_PADDING_KEY[orientation];
            const endP = normalizedPadding[endKey];

            // Случай 1: Мы на огромном слайде, и его правый край всё еще скрыт за экраном
            if (currentSlideEnd + endP > offset + containerSize + 1) {
                // Вычисляем следующий шаг (не дальше, чем правый край слайда с учётом endP)
                const maxSlideOffset = currentSlideEnd - containerSize + endP;
                const nextOffset = Math.min(offset + containerSize, maxSlideOffset);
                const clampedOffset = Math.min(nextOffset, maxOffsetRef.current);

                setOffset(clampedOffset);
                return; // Индекс не меняем, просто продвинули скролл внутри слайда
            }

            // Случай 2: Текущий слайд закончился, ищем следующий скрытый элемент
            for (let i = currentIndex + 1; i < slidesCount; i++) {
                const slideEnd = getSlideEnd(i);

                if (slideEnd + endP > offset + containerSize + 1) {
                    setCurrentIndex(i);
                    return;
                }
            }
            setCurrentIndex(Math.max(0, slidesCount - 1));
        }, [
            pageMode,
            activeIndices.length,
            getSlidesCount,
            getViewportSize,
            getSlideEnd,
            orientation,
            normalizedPadding,
            offset,
            currentIndex,
        ]);

        const prevSlide = useCallback(() => {
            if (pageMode) {
                setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
                return;
            }

            const containerSize = getViewportSize();
            const currentSlideStart = getSlideStart(currentIndex);

            const { start: startKey } = ORIENTATION_TO_PADDING_KEY[orientation];
            const startP = normalizedPadding[startKey];

            // Случай 1: Мы на огромном слайде, и его левый край скрыт слева за экраном
            if (currentSlideStart - startP < offset - 1) {
                // Вычисляем шаг назад (не дальше, чем левый край слайда с учётом startP)
                const minSlideOffset = currentSlideStart - startP;
                const prevOffset = Math.max(offset - containerSize, minSlideOffset);
                const clampedOffset = Math.max(0, prevOffset);

                setOffset(clampedOffset);
                return; // Индекс не меняем, скроллим назад внутри слайда
            }

            // Случай 2: Левый край текущего слайда полностью виден, ищем предыдущие скрытые элементы
            for (let i = currentIndex - 1; i >= 0; i--) {
                const slideStart = getSlideStart(i);

                if (slideStart - startP < offset - 1) {
                    setCurrentIndex(i);
                    return;
                }
            }

            setCurrentIndex(0);
        }, [pageMode, getViewportSize, getSlideStart, orientation, normalizedPadding, offset, currentIndex]);

        const goToSlide = useCallback(
            (slideIndex: number) => {
                const slidesCount = getSlidesCount();
                if (slidesCount === 0) {
                    setCurrentIndex(0);
                    return;
                }

                const clampedIndex = Math.max(0, Math.min(slideIndex, slidesCount - 1));
                setCurrentIndex(clampedIndex);
            },
            [getSlidesCount],
        );

        // ResizeObserver для адаптивности при изменении размеров экрана или контента
        useLayoutEffect(() => {
            if (!viewportRef.current || !trackRef.current) return;

            const observer = new ResizeObserver(() => {
                geometryCacheRef.current.sizes.clear();
                geometryCacheRef.current.starts.clear();

                updateOffsetAndPages(currentIndexRef.current);
            });

            observer.observe(viewportRef.current);
            observer.observe(trackRef.current);

            return () => observer.disconnect();
        }, [updateOffsetAndPages]);

        // Сброс индекса при изменении ключевых настроек карусели
        useEffect(() => {
            setCurrentIndex(0);
        }, [gap, scrollMode, orientation]);

        // Синхронизация смещения при изменении индекса
        useEffect(() => {
            updateOffsetAndPages(currentIndex);
        }, [currentIndex, updateOffsetAndPages]);

        // Очистка запланированных анимационных фреймов при размонтировании карусели
        useEffect(() => {
            return () => {
                if (pageRafIdRef.current !== null) {
                    cancelAnimationFrame(pageRafIdRef.current);
                }
            };
        }, []);

        // Вычисление граничных состояний (актуально для отключения стрелок навигации)
        const atStart = pageMode ? currentIndex === 0 : offset <= 1;
        const atEnd = pageMode
            ? activeIndices.length === 0 || currentIndex >= activeIndices.length - 1
            : maxOffset > 0
              ? offset >= maxOffset - 1
              : true;

        const classNames = clsx(styles.carousel, styles[orientation], className);

        const contextValue = useMemo(
            () => ({
                gap,
                orientation,
                scrollMode,
                offset,
                activeIndices,
                currentIndex,
                viewportPaddingStyle,
                atStart,
                atEnd,
                nextSlide,
                prevSlide,
                goToSlide,
                orientationRef,
                offsetRef,
                maxOffsetRef,
                currentIndexRef,
                viewportRef,
                trackRef,
                slideRefs,
            }),
            [
                gap,
                orientation,
                scrollMode,
                offset,
                activeIndices,
                currentIndex,
                viewportPaddingStyle,
                atStart,
                atEnd,
                nextSlide,
                prevSlide,
                goToSlide,
            ],
        );

        return (
            <CarouselContext.Provider value={contextValue}>
                <div className={classNames} {...restProps} ref={ref}>
                    {children}
                </div>
            </CarouselContext.Provider>
        );
    },
);

CarouselRoot.displayName = "Carousel";

/**
 * Карусель.
 * @beta
 */
export const Carousel = Object.assign(CarouselRoot, {
    Viewport: CarouselViewport,
    Track: CarouselTrack,
    Item: CarouselItem,
    PrevButton: CarouselPrevButton,
    NextButton: CarouselNextButton,
    Indicators: CarouselIndicators,
});
