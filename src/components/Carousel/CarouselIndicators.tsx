import React, { useContext, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import { ICarouselIndicatorsProps, TCarouselIndicatorProps } from "./types";
import { CarouselContext } from "./CarouselContext";
import { mergeRefs, useLatestRef } from "./utils";
import { ECarouselScrollMode, ECarouselOrientation } from "./enums";
import { ButtonBase } from "../Button/ButtonBase";
import styles from "./styles/Carousel.module.less";

interface ICarouselIndicatorsStyle extends React.CSSProperties {
    "--triplex-next-runtime-carousel-indicators-size": string;
}

interface ICarouselIndicatorsIndicatorStyle extends React.CSSProperties {
    "--triplex-next-runtime-carousel-indicators-indicator-scale": number;
    "--triplex-next-runtime-carousel-indicators-indicator-translate": string;
}

const ORIENTATION_TO_NAVIGATION_KEYS = {
    [ECarouselOrientation.HORIZONTAL]: ["ArrowRight", "ArrowLeft"],
    [ECarouselOrientation.VERTICAL]: ["ArrowDown", "ArrowUp"],
} as const;

const WINDOW_SIZE = 5;
const GAP = 8;
const SIZE_NORMAL = 16;
const SIZE_ACTIVE = 24;
const SIZE_EDGE = 8;

export const CarouselIndicators = React.forwardRef<HTMLDivElement, ICarouselIndicatorsProps>(
    ({ className, onKeyDown, indicatorProps, ...restProps }, ref) => {
        const { currentIndex, orientation, scrollMode, activeIndices, goToSlide, orientationRef, currentIndexRef } =
            useContext(CarouselContext);
        const containerRef = useRef<HTMLDivElement | null>(null);
        const combinedRef = mergeRefs(ref, containerRef);

        const buttonRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
        const indicatorRefsCache = useRef<Map<number, React.RefCallback<HTMLButtonElement>>>(new Map());
        const clickHandlersCache = useRef<Map<number, React.MouseEventHandler<HTMLButtonElement>>>(new Map());

        // Храним актуальный indicatorProps в рефе для стабильных колбэков клика
        const indicatorPropsRef = useLatestRef(indicatorProps);
        // Защита от устаревшего замыкания activeIndices в кэшированных кликах
        const activeIndicesRef = useLatestRef(activeIndices);

        const totalPages = activeIndices.length;

        const getIndicatorRef = useCallback((slideIndex: number) => {
            if (!indicatorRefsCache.current.has(slideIndex)) {
                indicatorRefsCache.current.set(slideIndex, (node) => {
                    if (node) {
                        buttonRefs.current.set(slideIndex, node);
                    } else {
                        buttonRefs.current.delete(slideIndex);
                    }
                });
            }
            // Безопасно: запись выше гарантирует наличие ключа в кэше.
            return indicatorRefsCache.current.get(slideIndex)!;
        }, []);

        const getIndicatorClickHandler = useCallback(
            (slideIndex: number) => {
                if (!clickHandlersCache.current.has(slideIndex)) {
                    clickHandlersCache.current.set(slideIndex, (event) => {
                        goToSlide(slideIndex);

                        const currentPropsInput = indicatorPropsRef.current;
                        if (!currentPropsInput) return;

                        const latestActiveIndices = activeIndicesRef.current;
                        const indexInArray = latestActiveIndices.indexOf(slideIndex);

                        if (indexInArray !== -1) {
                            const page = indexInArray + 1;
                            const selected = currentIndexRef.current === slideIndex;
                            const resolvedProps =
                                typeof currentPropsInput === "function"
                                    ? currentPropsInput({ index: indexInArray, page, selected })
                                    : currentPropsInput;

                            resolvedProps?.onClick?.(event);
                        }
                    });
                }
                // Безопасно: запись выше гарантирует наличие ключа в кэше.
                return clickHandlersCache.current.get(slideIndex)!;
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [goToSlide],
        );

        const handleKeyDown = useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
            (event) => {
                const [nextKey, prevKey] = ORIENTATION_TO_NAVIGATION_KEYS[orientationRef.current];
                const nextKeyMatched = event.key === nextKey;
                const prevKeyMatched = event.key === prevKey;
                const homeKeyMatched = event.key === "Home";
                const endKeyMatched = event.key === "End";

                if (nextKeyMatched || prevKeyMatched || homeKeyMatched || endKeyMatched) {
                    const currentIndexInArray = activeIndices.indexOf(currentIndexRef.current);

                    if (currentIndexInArray !== -1) {
                        event.preventDefault();

                        let nextIndexInArray = currentIndexInArray;
                        if (nextKeyMatched) {
                            nextIndexInArray = Math.min(currentIndexInArray + 1, totalPages - 1);
                        } else if (prevKeyMatched) {
                            nextIndexInArray = Math.max(currentIndexInArray - 1, 0);
                        } else if (homeKeyMatched) {
                            nextIndexInArray = 0;
                        } else if (endKeyMatched) {
                            nextIndexInArray = totalPages - 1;
                        }

                        const nextSlideIndex = activeIndices[nextIndexInArray];
                        goToSlide(nextSlideIndex);
                    }
                }

                onKeyDown?.(event);
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [activeIndices, totalPages, goToSlide, onKeyDown],
        );

        useEffect(() => {
            const activeSet = new Set(activeIndices);

            for (const key of indicatorRefsCache.current.keys()) {
                if (!activeSet.has(key)) {
                    indicatorRefsCache.current.delete(key);
                    buttonRefs.current.delete(key);
                }
            }
            for (const key of clickHandlersCache.current.keys()) {
                if (!activeSet.has(key)) {
                    clickHandlersCache.current.delete(key);
                }
            }
        }, [activeIndices]);

        useEffect(() => {
            const container = containerRef.current;
            if (!container?.contains(document.activeElement)) return;

            const rafId = requestAnimationFrame(() => {
                const activeButton = buttonRefs.current.get(currentIndexRef.current);
                activeButton?.focus();
            });

            return () => cancelAnimationFrame(rafId);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [currentIndex]);

        if (scrollMode === ECarouselScrollMode.ITEM || totalPages < 1) {
            return null;
        }

        const currentIndexInArray = activeIndices.indexOf(currentIndex);

        let startWindowIndex = 0;
        if (totalPages > WINDOW_SIZE) {
            startWindowIndex = currentIndexInArray - Math.floor(WINDOW_SIZE / 2);
            startWindowIndex = Math.max(0, Math.min(startWindowIndex, totalPages - WINDOW_SIZE));
        }
        const endWindowIndex = startWindowIndex + WINDOW_SIZE;

        const startWindowOffset = startWindowIndex * (SIZE_EDGE + GAP);

        let currentOffset = 0;

        const indicatorsData = activeIndices.map((slideIndex, index) => {
            const page = index + 1;
            const hidden = index < startWindowIndex || index >= endWindowIndex;
            const selected = currentIndex === slideIndex;

            const startEdge = index === startWindowIndex && startWindowIndex > 0;
            const endEdge = index === endWindowIndex - 1 && endWindowIndex < totalPages;

            let size = SIZE_NORMAL;
            let scale = SIZE_NORMAL / SIZE_ACTIVE;

            if (selected) {
                size = SIZE_ACTIVE;
                scale = 1;
            } else if (startEdge || endEdge || hidden) {
                size = SIZE_EDGE;
                scale = SIZE_EDGE / SIZE_ACTIVE;
            }

            const rawOffset = currentOffset;
            currentOffset += size + GAP;

            const translate = rawOffset - startWindowOffset;

            return {
                slideIndex,
                index,
                page,
                selected,
                hidden,
                size,
                scale,
                translate,
            };
        });

        const lastVisibleIndex = Math.min(endWindowIndex - 1, totalPages - 1);
        const lastVisibleItem = indicatorsData[lastVisibleIndex];
        const containerSize = lastVisibleItem ? lastVisibleItem.translate + lastVisibleItem.size : 0;

        const style: ICarouselIndicatorsStyle = {
            ...restProps.style,
            "--triplex-next-runtime-carousel-indicators-size": `${containerSize}px`,
        };

        return (
            <div
                {...restProps}
                className={clsx(styles.indicators, className)}
                role="tablist"
                aria-orientation={orientation}
                onKeyDown={handleKeyDown}
                ref={combinedRef}
                style={style}
            >
                {indicatorsData.map((item) => {
                    const { slideIndex, index, page, selected, hidden, scale, translate } = item;

                    const resolvedIndicatorProps =
                        typeof indicatorProps === "function"
                            ? indicatorProps({ index, page, selected })
                            : indicatorProps;

                    const indicatorRef = getIndicatorRef(slideIndex);
                    const indicatorClickHandler = getIndicatorClickHandler(slideIndex);

                    const indicatorStyle: ICarouselIndicatorsIndicatorStyle = {
                        ...resolvedIndicatorProps?.style,
                        "--triplex-next-runtime-carousel-indicators-indicator-scale": scale,
                        "--triplex-next-runtime-carousel-indicators-indicator-translate": `${translate}px`,
                    };

                    const providedIndicatorProps: TCarouselIndicatorProps = {
                        ...resolvedIndicatorProps,
                        className: clsx(
                            styles.indicator,
                            { [styles.active]: selected },
                            resolvedIndicatorProps?.className,
                        ),
                        role: "tab",
                        tabIndex: selected ? 0 : -1,
                        "aria-selected": selected,
                        "aria-hidden": hidden ? true : undefined,
                        onClick: indicatorClickHandler,
                        style: indicatorStyle,
                    };

                    return <ButtonBase key={slideIndex} {...providedIndicatorProps} ref={indicatorRef} />;
                })}
            </div>
        );
    },
);

CarouselIndicators.displayName = "Carousel.Indicators";
