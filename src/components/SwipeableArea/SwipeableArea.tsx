import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./styles/SwipeableArea.module.less";

export interface ISwipeableAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Контент карточки. */
    children: React.ReactNode;
    /** Появляющийся контент при свайпе вправо. */
    leftSwipeableArea?: React.ReactNode;
    /** Появляющийся контент при свайпе влево. */
    rightSwipeableArea?: React.ReactNode;
}

// Минимальная ширина свайпа в px, при коротом откроется боковая панель.
const SWIPE_MIN_DISTANCE = 24;
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
    /** Закрывает leftSwipeableAreaRef или rightSwipeableArea. */
    closeSwipe: () => void;
    /** Открывает rightSwipeableArea. */
    swipeLeft: () => void;
    /** Открывает leftSwipeableAreaRef. */
    swipeRight: () => void;
}

/**
 * Контейнер с реализацией свайпа.
 * При свайпе влево открывается rightSwipeableArea.
 * При свайпе вправо открывается leftSwipeableArea.
 */
export const SwipeableArea = React.forwardRef<ISwipeableAreaRef, ISwipeableAreaProps>(
    ({ children, className, leftSwipeableArea, rightSwipeableArea, ...rest }, ref) => {
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

        /**
         * Обработчик свайпа, срабатывает при отпускании пальца.
         */
        const handleSwipe = () => {
            // Установка анимации завершения свайпа.
            setAnimating(true);

            const deltaContentTranslateX = contentTranslateXOnStartRef.current - contentTranslateX;

            // Свайп отктырия левой или правой области.
            if (contentTranslateXOnStartRef.current === 0) {
                // Свайп влеао.
                if (deltaContentTranslateX > 0) {
                    // Если сдвиг слишком короткий - возврат на прежнее положение, или открытие левого контента.
                    setContentTranslateX(
                        deltaContentTranslateX > SWIPE_MIN_DISTANCE
                            ? -rightSwipeableAreaRef.current!.getBoundingClientRect().width
                            : 0,
                    );
                } else {
                    // Свайп вправо.
                    setContentTranslateX(
                        Math.abs(deltaContentTranslateX) > SWIPE_MIN_DISTANCE
                            ? leftSwipeableAreaRef.current!.getBoundingClientRect().width
                            : 0,
                    );
                }
            } else if (contentTranslateXOnStartRef.current > 0) {
                // Свайп закрытия левой области.
                // Свайп влево.
                if (deltaContentTranslateX > 0) {
                    setContentTranslateX(
                        deltaContentTranslateX > SWIPE_MIN_DISTANCE
                            ? 0
                            : leftSwipeableAreaRef.current!.getBoundingClientRect().width,
                    );
                }
            } else if (contentTranslateXOnStartRef.current < 0) {
                // Свайп закрытия правой области.
                // Свайп вправо.
                if (deltaContentTranslateX < 0) {
                    setContentTranslateX(
                        Math.abs(deltaContentTranslateX) > SWIPE_MIN_DISTANCE
                            ? 0
                            : -rightSwipeableAreaRef.current!.getBoundingClientRect().width,
                    );
                }
            }
        };

        const handleDocumentTouchEnd = () => {
            startCoordinates.current = START_COORDINATES_INITIAL;

            setDragType(undefined);

            document.removeEventListener("touchend", handleDocumentTouchEnd);
        };

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
            document.addEventListener("touchend", handleDocumentTouchEnd);
        };

        const handleTouchMove = (event: React.TouchEvent) => {
            if (event.touches.length != 1) {
                return;
            }

            // Величина изменения перемещения пальца.
            const deltaX = event.touches[0].clientX - startCoordinates.current.clientX;
            const deltaY = event.touches[0].clientY - startCoordinates.current.clientY;

            if (!dragType) {
                // Это скролл, а не свайп.
                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    setDragType(EDragType.vertical);
                } else {
                    setDragType(EDragType.horizontal);
                }

                return;
            }

            if (dragType === EDragType.vertical) {
                // Это скролл, а не свайп, движение пальца не обрабатывается.
                return;
            }

            // Координата X контента карточки.
            const contentTranslateXNext = contentTranslateXOnStartRef.current + deltaX;

            // Свайп открытия левой или правой области.
            if (contentTranslateXOnStartRef.current === 0) {
                // Свайп вправо и есть контент слева.
                if (deltaX > 0 && leftSwipeableArea) {
                    setContentTranslateX(
                        Math.min(contentTranslateXNext, leftSwipeableAreaRef.current!.getBoundingClientRect().width),
                    );
                } else if (deltaX < 0 && rightSwipeableArea) {
                    // Свайп влево и есть контент справа.
                    setContentTranslateX(
                        Math.max(contentTranslateXNext, -rightSwipeableAreaRef.current!.getBoundingClientRect().width),
                    );
                }
            } else if (contentTranslateXOnStartRef.current > 0) {
                // Свайп закрытия левой области.
                if (deltaX < 0) {
                    setContentTranslateX(Math.max(0, contentTranslateXNext));
                }
            } else if (contentTranslateXOnStartRef.current < 0) {
                // Свайп закрытия правой области.
                if (deltaX > 0) {
                    setContentTranslateX(Math.min(0, contentTranslateXNext));
                }
            }
        };

        const handleTransitionEnd = () => setAnimating(false);

        const getOpacityRightContent = (): number => {
            if (rightSwipeableAreaRef.current) {
                return Math.abs(contentTranslateX) / rightSwipeableAreaRef.current.getBoundingClientRect().width;
            }

            return 1;
        };

        const getOpacityLeftContent = (): number => {
            if (leftSwipeableAreaRef.current) {
                return Math.abs(contentTranslateX) / leftSwipeableAreaRef.current.getBoundingClientRect().width;
            }

            return 1;
        };

        // Обработчик тапа за пределами элемента(outside).
        useEffect(() => {
            const handleDocumentTouchStart = (event: TouchEvent) => {
                if (event.touches.length != 1) {
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

            return () => document.removeEventListener("touchstart", handleDocumentTouchStart);
        }, []);

        // Открывает leftSwipeableAreaRef.
        const openLeftSwipeableArea = () => {
            if (leftSwipeableAreaRef.current) {
                // Установка анимации завершения свайпа.
                setAnimating(true);
                setContentTranslateX(leftSwipeableAreaRef.current.getBoundingClientRect().width);
            }
        };

        // Открывает rightSwipeableArea.
        const openRightSwipeableArea = () => {
            if (rightSwipeableAreaRef.current) {
                // Установка анимации завершения свайпа.
                setAnimating(true);
                setContentTranslateX(-rightSwipeableAreaRef.current.getBoundingClientRect().width);
            }
        };

        // Закрывает leftSwipeableAreaRef или rightSwipeableArea.
        const closeSwipeableArea = () => {
            if (rightSwipeableAreaRef.current || leftSwipeableAreaRef.current) {
                // Установка анимации завершения свайпа.
                setAnimating(true);
                setContentTranslateX(0);
            }
        };

        useImperativeHandle(
            ref,
            () => ({
                closeSwipe: () => {
                    closeSwipeableArea();
                },
                swipeLeft: () => {
                    openRightSwipeableArea();
                },
                swipeRight: () => {
                    openLeftSwipeableArea();
                },
            }),
            [closeSwipeableArea, openRightSwipeableArea, openLeftSwipeableArea],
        );

        return (
            <div
                className={clsx(styles.swipeableArea, className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={containerRef}
            >
                {typeof leftSwipeableArea !== "undefined" ? (
                    <div
                        className={clsx(styles.leftContent, {
                            [SWIPE_ANIMATION_CLASSNAME]: animating,
                        })}
                        ref={leftSwipeableAreaRef}
                        /* Плавное появление контента при свайпе. */
                        style={{ opacity: getOpacityLeftContent() }}
                    >
                        {leftSwipeableArea}
                    </div>
                ) : null}

                {typeof rightSwipeableArea !== "undefined" ? (
                    <div
                        className={clsx(styles.rightContent, {
                            [SWIPE_ANIMATION_CLASSNAME]: animating,
                        })}
                        ref={rightSwipeableAreaRef}
                        /* Плавное появление контента при свайпе. */
                        style={{ opacity: getOpacityRightContent() }}
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
