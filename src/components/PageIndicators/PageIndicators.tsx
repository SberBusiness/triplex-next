import React, { useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import { IPageIndicatorsProps, TPageIndicatorProps } from "./types";
import { EOrientation } from "../../enums";
import { mergeRefs, useLatestRef } from "../../utils/refs";
import { ButtonBase } from "../Button/ButtonBase";
import styles from "./styles/PageIndicators.module.less";

interface IPageIndicatorsStyle extends React.CSSProperties {
    "--triplex-next-runtime-PageIndicators-Root_Size": string;
}

interface IPageIndicatorsIndicatorStyle extends React.CSSProperties {
    "--triplex-next-runtime-PageIndicators-Indicator_Scale": number;
    "--triplex-next-runtime-PageIndicators-Indicator_Translate": string;
}

const ORIENTATION_TO_NAVIGATION_KEYS = {
    [EOrientation.HORIZONTAL]: ["ArrowRight", "ArrowLeft"],
    [EOrientation.VERTICAL]: ["ArrowDown", "ArrowUp"],
} as const;

/** Количество одновременно видимых индикаторов. */
const WINDOW_SIZE = 5;
const GAP = 8;
const SIZE_NORMAL = 16;
const SIZE_ACTIVE = 24;
const SIZE_EDGE = 8;

/**
 * Ряд индикаторов страниц (controlled). Показывает окно из 5 индикаторов,
 * крайние индикаторы окна уменьшаются, если за ними есть ещё страницы.
 * Реализует паттерн WAI-ARIA Tabs: стрелки, Home и End переключают страницу.
 */
export const PageIndicators = React.forwardRef<HTMLDivElement, IPageIndicatorsProps>(
    (
        {
            count,
            activeIndex: activeIndexProp,
            onChange,
            orientation = EOrientation.HORIZONTAL,
            indicatorProps,
            className,
            onKeyDown,
            ...restProps
        },
        ref,
    ) => {
        // Индекс вне диапазона (например, count уменьшился раньше activeIndex) приводится к ближайшей
        // странице: иначе ни один индикатор не активен и ряд выпадает из Tab-последовательности.
        const activeIndex = Math.min(Math.max(activeIndexProp, 0), Math.max(count - 1, 0));

        const resolvedIndicatorsProps = Array.from({ length: Math.max(count, 0) }, (_, index) =>
            typeof indicatorProps === "function"
                ? indicatorProps({ index, page: index + 1, selected: activeIndex === index })
                : indicatorProps,
        );
        const isEnabled = (index: number) => !resolvedIndicatorsProps[index]?.disabled;

        /** Первый доступный индекс в `[min, max]`, начиная с `start` (включительно) с шагом `step`, или -1. */
        const findEnabledIndex = (start: number, step: 1 | -1, min = 0, max = count - 1) => {
            for (let index = start; index >= min && index <= max; index += step) {
                if (isEnabled(index)) return index;
            }
            return -1;
        };

        let startWindowIndex = 0;
        if (count > WINDOW_SIZE) {
            startWindowIndex = activeIndex - Math.floor(WINDOW_SIZE / 2);
            startWindowIndex = Math.max(0, Math.min(startWindowIndex, count - WINDOW_SIZE));
        }
        const endWindowIndex = startWindowIndex + WINDOW_SIZE;

        // Tab-stop — активный индикатор, а если он отключён (не фокусируется), ближайший доступный
        // в видимом окне: скрытые индикаторы недоступны и мыши.
        const lastVisibleIndex = Math.min(endWindowIndex, count) - 1;
        const nextEnabledIndex = findEnabledIndex(activeIndex, 1, startWindowIndex, lastVisibleIndex);
        const prevEnabledIndex = findEnabledIndex(activeIndex, -1, startWindowIndex, lastVisibleIndex);
        const tabStopIndex =
            prevEnabledIndex === -1 ||
            (nextEnabledIndex !== -1 && nextEnabledIndex - activeIndex <= activeIndex - prevEnabledIndex)
                ? nextEnabledIndex
                : prevEnabledIndex;

        const containerRef = useRef<HTMLDivElement | null>(null);
        const combinedRef = mergeRefs(ref, containerRef);

        const buttonRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
        const indicatorRefsCache = useRef<Map<number, React.RefCallback<HTMLButtonElement>>>(new Map());
        const clickHandlersCache = useRef<Map<number, React.MouseEventHandler<HTMLButtonElement>>>(new Map());

        // Актуальные значения в рефах — кэшированные колбэки клика остаются стабильными между рендерами.
        const onChangeRef = useLatestRef(onChange);
        const indicatorPropsRef = useLatestRef(indicatorProps);
        const activeIndexRef = useLatestRef(activeIndex);
        const tabStopIndexRef = useLatestRef(tabStopIndex);

        const getIndicatorRef = useCallback((index: number) => {
            if (!indicatorRefsCache.current.has(index)) {
                indicatorRefsCache.current.set(index, (node) => {
                    if (node) {
                        buttonRefs.current.set(index, node);
                    } else {
                        buttonRefs.current.delete(index);
                    }
                });
            }
            // Безопасно: запись выше гарантирует наличие ключа в кэше.
            return indicatorRefsCache.current.get(index)!;
        }, []);

        const getIndicatorClickHandler = useCallback(
            (index: number) => {
                if (!clickHandlersCache.current.has(index)) {
                    clickHandlersCache.current.set(index, (event) => {
                        onChangeRef.current(index);

                        const currentPropsInput = indicatorPropsRef.current;
                        if (!currentPropsInput) return;

                        const resolvedProps =
                            typeof currentPropsInput === "function"
                                ? currentPropsInput({
                                      index,
                                      page: index + 1,
                                      selected: activeIndexRef.current === index,
                                  })
                                : currentPropsInput;

                        resolvedProps?.onClick?.(event);
                    });
                }
                // Безопасно: запись выше гарантирует наличие ключа в кэше.
                return clickHandlersCache.current.get(index)!;
            },
            // Рефы стабильны.
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [],
        );

        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            const [nextKey, prevKey] = ORIENTATION_TO_NAVIGATION_KEYS[orientation];
            const nextKeyMatched = event.key === nextKey;
            const prevKeyMatched = event.key === prevKey;
            const homeKeyMatched = event.key === "Home";
            const endKeyMatched = event.key === "End";

            if ((nextKeyMatched || prevKeyMatched || homeKeyMatched || endKeyMatched) && count > 0) {
                event.preventDefault();

                // Отключённые индикаторы пропускаются — как и при клике, перейти на них нельзя.
                let nextIndex = -1;
                if (nextKeyMatched) {
                    nextIndex = findEnabledIndex(activeIndex + 1, 1);
                } else if (prevKeyMatched) {
                    nextIndex = findEnabledIndex(activeIndex - 1, -1);
                } else if (homeKeyMatched) {
                    nextIndex = findEnabledIndex(0, 1);
                } else if (endKeyMatched) {
                    nextIndex = findEnabledIndex(count - 1, -1);
                }

                if (nextIndex !== -1 && nextIndex !== activeIndex) {
                    onChange(nextIndex);
                }
            }

            onKeyDown?.(event);
        };

        // Очистка кэшей от индикаторов, которых больше нет.
        useEffect(() => {
            for (const key of indicatorRefsCache.current.keys()) {
                if (key >= count) {
                    indicatorRefsCache.current.delete(key);
                    buttonRefs.current.delete(key);
                }
            }
            for (const key of clickHandlersCache.current.keys()) {
                if (key >= count) {
                    clickHandlersCache.current.delete(key);
                }
            }
        }, [count]);

        // Фокус следует за Tab-stop (активным индикатором), если фокус уже внутри ряда.
        useEffect(() => {
            const container = containerRef.current;
            if (!container?.contains(document.activeElement)) return;

            const rafId = requestAnimationFrame(() => {
                buttonRefs.current.get(tabStopIndexRef.current)?.focus();
            });

            return () => cancelAnimationFrame(rafId);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [activeIndex]);

        if (count < 1) {
            return null;
        }

        const startWindowOffset = startWindowIndex * (SIZE_EDGE + GAP);

        let currentOffset = 0;

        const indicatorsData = Array.from({ length: count }, (_, index) => {
            const hidden = index < startWindowIndex || index >= endWindowIndex;
            const selected = activeIndex === index;

            const startEdge = index === startWindowIndex && startWindowIndex > 0;
            const endEdge = index === endWindowIndex - 1 && endWindowIndex < count;

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

            return { index, selected, hidden, size, scale, translate: rawOffset - startWindowOffset };
        });

        const lastVisibleItem = indicatorsData[lastVisibleIndex];
        const containerSize = lastVisibleItem.translate + lastVisibleItem.size;

        const style: IPageIndicatorsStyle = {
            ...restProps.style,
            "--triplex-next-runtime-PageIndicators-Root_Size": `${containerSize}px`,
        };

        return (
            <div
                {...restProps}
                className={clsx(styles.pageIndicators, styles[orientation], className)}
                role="tablist"
                aria-orientation={orientation}
                onKeyDown={handleKeyDown}
                ref={combinedRef}
                style={style}
            >
                {indicatorsData.map(({ index, selected, hidden, scale, translate }) => {
                    const resolvedIndicatorProps = resolvedIndicatorsProps[index];

                    const indicatorStyle: IPageIndicatorsIndicatorStyle = {
                        ...resolvedIndicatorProps?.style,
                        "--triplex-next-runtime-PageIndicators-Indicator_Scale": scale,
                        "--triplex-next-runtime-PageIndicators-Indicator_Translate": `${translate}px`,
                    };

                    const providedIndicatorProps: TPageIndicatorProps = {
                        ...resolvedIndicatorProps,
                        className: clsx(
                            styles.indicator,
                            { [styles.active]: selected },
                            resolvedIndicatorProps?.className,
                        ),
                        role: "tab",
                        tabIndex: index === tabStopIndex ? 0 : -1,
                        "aria-selected": selected,
                        "aria-hidden": hidden ? true : resolvedIndicatorProps?.["aria-hidden"],
                        onClick: getIndicatorClickHandler(index),
                        style: indicatorStyle,
                    };

                    return <ButtonBase key={index} {...providedIndicatorProps} ref={getIndicatorRef(index)} />;
                })}
            </div>
        );
    },
);

PageIndicators.displayName = "PageIndicators";
