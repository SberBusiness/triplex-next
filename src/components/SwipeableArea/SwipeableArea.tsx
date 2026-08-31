import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import clsx from "clsx";
import { ESwipeDirection, getElementWidth, resolveSwipeEnd, resolveSwipeMove } from "./utils";
import styles from "./styles/SwipeableArea.module.less";

export interface ISwipeableAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Контент карточки. */
    children: React.ReactNode;
    /** Появляющийся контент при свайпе вправо. */
    leftSwipeableArea?: React.ReactNode;
    /** Появляющийся контент при свайпе влево. */
    rightSwipeableArea?: React.ReactNode;
    /** Колбэк завершённого свайпа влево (открытие rightSwipeableArea). Срабатывает только если дельта превысила порог. */
    onSwipeLeft?: () => void;
    /** Колбэк завершённого свайпа вправо (открытие leftSwipeableArea). Срабатывает только если дельта превысила порог. */
    onSwipeRight?: () => void;
}

// Css-класс, задающий завершение анимации движения свайпа и изменение opacity leftSwipeableArea и rightSwipeableArea.
const SWIPE_ANIMATION_CLASSNAME = styles.swipeAnimationFinish;
// Css-класс, предотвращающий скролл при свайпе.
const DISABLE_SCROLL_CLASSNAME = styles.disableScroll;
// Css-класс, предотвращающий нажатие на элементы карточки при свайпе.
const DISABLE_POINTER_EVENTS_CLASSNAME = styles.disablePointerEvents;
// Изначальное значение startCoordinates.
const START_COORDINATES_INITIAL = { clientX: 0, clientY: 0 };

// Направление перемещения пальца.
enum EDragType {
    horizontal = "horizontal",
    vertical = "vertical",
}

export interface ISwipeableAreaRef {
    /** Закрывает leftSwipeableArea или rightSwipeableArea. */
    closeSwipe: () => void;
    /** Открывает rightSwipeableArea. */
    swipeLeft: () => void;
    /** Открывает leftSwipeableArea. */
    swipeRight: () => void;
}

/**
 * Контейнер с реализацией свайпа.
 * При свайпе влево открывается rightSwipeableArea.
 * При свайпе вправо открывается leftSwipeableArea.
 */
export const SwipeableArea = React.forwardRef<ISwipeableAreaRef, ISwipeableAreaProps>(
    ({ children, className, leftSwipeableArea, rightSwipeableArea, onSwipeLeft, onSwipeRight, ...rest }, ref) => {
        // Происходит анимация завершения свайпа.
        const [animating, setAnimating] = useState(false);
        // Направление перемещения пальца, вертикальное - скролл, горизонтальное - свайп.
        const [dragType, setDragType] = useState<EDragType>();
        // Координата перемещения контента карточки.
        const [contentTranslateX, setContentTranslateX] = useState(0);
        const leftSwipeableAreaRef = useRef<HTMLDivElement>(null);
        const rightSwipeableAreaRef = useRef<HTMLDivElement>(null);
        // Координата X карточки на старте перемещения.
        const contentTranslateXOnStartRef = useRef(0);
        // Координата пальца при старте свайпа.
        const startCoordinates = useRef(START_COORDINATES_INITIAL);
        // Ссылка на контейнер.
        const containerRef = useRef<HTMLDivElement | null>(null);
        const hasLeftSwipeableArea = leftSwipeableArea !== undefined;
        const hasRightSwipeableArea = rightSwipeableArea !== undefined;

        /**
         * Обработчик свайпа, срабатывает при отпускании пальца.
         */
        const handleSwipe = () => {
            // Установка анимации завершения свайпа.
            setAnimating(true);

            const { translateX, direction } = resolveSwipeEnd({
                translateX: contentTranslateX,
                translateXOnStart: contentTranslateXOnStartRef.current,
                leftAreaWidth: getElementWidth(leftSwipeableAreaRef.current),
                rightAreaWidth: getElementWidth(rightSwipeableAreaRef.current),
            });

            setContentTranslateX(translateX);

            if (direction === ESwipeDirection.LEFT) {
                onSwipeLeft?.();
            } else if (direction === ESwipeDirection.RIGHT) {
                onSwipeRight?.();
            }
        };

        // Обработчик отпускания пальца. Слушатель вешается на документ, чтобы поймать отпускание за пределами карточки.
        const handleDocumentTouchEnd = useCallback(() => {
            startCoordinates.current = START_COORDINATES_INITIAL;

            setDragType(undefined);
        }, []);

        useEffect(() => {
            // contentTranslateX !== contentTranslateXOnStartRef.current - был свайп, а не скролл.
            if (!dragType && contentTranslateX !== contentTranslateXOnStartRef.current) {
                handleSwipe();
            }
            // Другие зависимости добавлять не нужно.
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dragType]);

        const handleTouchStart = (event: React.TouchEvent) => {
            startCoordinates.current = { clientX: event.touches[0].clientX, clientY: event.touches[0].clientY };
            contentTranslateXOnStartRef.current = contentTranslateX;
            // once - слушатель снимается сам после отпускания пальца.
            document.addEventListener("touchend", handleDocumentTouchEnd, { once: true });
        };

        const handleTouchMove = (event: React.TouchEvent) => {
            if (event.touches.length !== 1) {
                return;
            }

            // Величина изменения перемещения пальца.
            const deltaX = event.touches[0].clientX - startCoordinates.current.clientX;
            const deltaY = event.touches[0].clientY - startCoordinates.current.clientY;

            if (!dragType) {
                // Вертикальное перемещение пальца - скролл, горизонтальное - свайп.
                setDragType(Math.abs(deltaY) > Math.abs(deltaX) ? EDragType.vertical : EDragType.horizontal);

                return;
            }

            if (dragType === EDragType.vertical) {
                // Это скролл, а не свайп, движение пальца не обрабатывается.
                return;
            }

            setContentTranslateX(
                resolveSwipeMove({
                    translateX: contentTranslateX,
                    translateXOnStart: contentTranslateXOnStartRef.current,
                    deltaX,
                    leftAreaWidth: hasLeftSwipeableArea ? getElementWidth(leftSwipeableAreaRef.current) : null,
                    rightAreaWidth: hasRightSwipeableArea ? getElementWidth(rightSwipeableAreaRef.current) : null,
                }),
            );
        };

        const handleTransitionEnd = () => setAnimating(false);

        // Прозрачность боковой области пропорциональна тому, насколько она открыта.
        const getSwipeableAreaOpacity = (element: HTMLDivElement | null): number =>
            element ? Math.abs(contentTranslateX) / element.getBoundingClientRect().width : 1;

        // Обработчик тапа за пределами элемента(outside).
        useEffect(() => {
            const handleDocumentTouchStart = (event: TouchEvent) => {
                if (event.touches.length !== 1) {
                    return;
                }

                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    // Установка анимации завершения свайпа.
                    setAnimating(true);
                    setContentTranslateX(0);
                    setDragType(undefined);
                }
            };

            document.addEventListener("touchstart", handleDocumentTouchStart);

            return () => {
                document.removeEventListener("touchstart", handleDocumentTouchStart);
                // Слушатель остаётся висеть, если компонент размонтирован между началом и концом свайпа.
                document.removeEventListener("touchend", handleDocumentTouchEnd);
            };
        }, [handleDocumentTouchEnd]);

        useImperativeHandle(
            ref,
            () => ({
                closeSwipe: () => {
                    if (leftSwipeableAreaRef.current || rightSwipeableAreaRef.current) {
                        // Установка анимации завершения свайпа.
                        setAnimating(true);
                        setContentTranslateX(0);
                    }
                },
                swipeLeft: () => {
                    if (rightSwipeableAreaRef.current) {
                        // Установка анимации завершения свайпа.
                        setAnimating(true);
                        setContentTranslateX(-getElementWidth(rightSwipeableAreaRef.current));
                    }
                },
                swipeRight: () => {
                    if (leftSwipeableAreaRef.current) {
                        // Установка анимации завершения свайпа.
                        setAnimating(true);
                        setContentTranslateX(getElementWidth(leftSwipeableAreaRef.current));
                    }
                },
            }),
            [],
        );

        return (
            <div
                className={clsx(styles.swipeableArea, className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={containerRef}
            >
                {hasLeftSwipeableArea ? (
                    <div
                        className={clsx(styles.leftContent, {
                            [SWIPE_ANIMATION_CLASSNAME]: animating,
                        })}
                        ref={leftSwipeableAreaRef}
                        /* Плавное появление контента при свайпе. */
                        style={{ opacity: getSwipeableAreaOpacity(leftSwipeableAreaRef.current) }}
                    >
                        {leftSwipeableArea}
                    </div>
                ) : null}

                {hasRightSwipeableArea ? (
                    <div
                        className={clsx(styles.rightContent, {
                            [SWIPE_ANIMATION_CLASSNAME]: animating,
                        })}
                        ref={rightSwipeableAreaRef}
                        /* Плавное появление контента при свайпе. */
                        style={{ opacity: getSwipeableAreaOpacity(rightSwipeableAreaRef.current) }}
                    >
                        {rightSwipeableArea}
                    </div>
                ) : null}

                <div
                    className={clsx(styles.content, {
                        [DISABLE_POINTER_EVENTS_CLASSNAME]: contentTranslateX !== 0,
                        [DISABLE_SCROLL_CLASSNAME]: dragType === EDragType.horizontal,
                        [SWIPE_ANIMATION_CLASSNAME]: animating,
                    })}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    style={{
                        transform: `translateX(${contentTranslateX}px)`,
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {children}
                </div>
            </div>
        );
    },
);

SwipeableArea.displayName = "SwipeableArea";
