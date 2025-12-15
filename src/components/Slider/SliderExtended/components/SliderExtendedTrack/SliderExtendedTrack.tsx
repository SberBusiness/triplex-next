import React, { useState, useLayoutEffect, useContext, useRef } from "react";
import { throttle } from "lodash";
import { SliderExtendedContext } from "../../SliderExtendedContext";
import { SliderExtendedMoveHandler, TOnTargetMouseDown, TOnTargetTouchStart } from "../SliderExtendedMoveHandler";
import { SliderExtendedUtils } from "../../SliderExtendedUtils";
import { SliderExtendedTrackActions } from "./SliderExtendedTrackActions";
import clsx from "clsx";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { KeyDownListener } from "@sberbusiness/triplex-next";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import styles from "./styles/SliderExtendedTrack.module.less";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

export interface ISliderExtendedTrackProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: never;
    /** Трек можно передвигать. По-умолчанию true. */
    draggable?: boolean;
}

/**
 * Компонент полосы между двумя SliderExtendedDot.
 */
export const SliderExtendedTrack: React.FC<ISliderExtendedTrackProps> = ({
    className,
    draggable = true,
    onBlur,
    onFocus,
    onMouseDown,
    onMouseOver,
    onMouseOut,
    onTouchStart,
    ...htmlSpanAttributes
}) => {
    // Элемент в фокусе.
    const [isFocused, setIsFocused] = useState(false);
    // Track можно передвигать.
    const [innerDraggable, setInnerDraggable] = useState(false);
    // Track получил фокус при клике.
    const [isFocusedByClick, setIsFocusedByClick] = useState(false);
    // Track в текущий момент перетаскивается мышью.
    const [isDragged, setIsDragged] = useState(false);
    const [tabIndex, setTabIndex] = useState(-1);

    const {
        disabled,
        dots,
        focused: focusedSlider,
        isHoverOrDragTrack,
        railNode,
        setIsHoverOrDragTrack,
        reverse,
        setFocused: setFocusedSlider,
        steps,
        size,
    } = useContext(SliderExtendedContext);
    // Предыдущая позиция курсора при перемещении SliderExtended.Track.
    const cursorPrevNormalizedValue = useRef(0);

    const ref = useRef<HTMLSpanElement | null>(null);

    useLayoutEffect(() => {
        if (dots.length > 1 && draggable) {
            if (!innerDraggable) {
                setInnerDraggable(true);
            }
        } else if (innerDraggable !== false) {
            setInnerDraggable(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dots, draggable]);

    useLayoutEffect(() => {
        if (dots.length > 1) {
            if (focusedSlider) {
                setTabIndex(2);
            } else {
                setTabIndex(-1);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusedSlider]);

    if (!dots.length) {
        return null;
    }

    const handleMouseDown = (onTargetMouseDown: TOnTargetMouseDown) => (event: React.MouseEvent<HTMLDivElement>) => {
        setIsFocusedByClick(true);
        setIsDragged(true);

        document.addEventListener("mouseup", handleDocumentMouseUp);

        if (railNode) {
            cursorPrevNormalizedValue.current = SliderExtendedUtils.getNormalizedCursorValue({
                cursorXPosition: event.clientX,
                railNode,
            });
        }

        onTargetMouseDown(event);
        onMouseDown?.(event);
    };

    const handleMouseMove = (event: MouseEvent) =>
        SliderExtendedTrackActions.dragDots({
            cursorPrevNormalizedValue,
            cursorXPosition: event.clientX,
            dots,
            railNode,
            reverse,
            steps,
        });

    const handleDocumentMouseUp = (event: MouseEvent) => {
        setIsDragged(false);
        // Курсор отпущен за пределами Track.
        if (event.target !== ref.current) {
            setIsHoverOrDragTrack(false);
        }

        document.removeEventListener("mouseup", handleDocumentMouseUp);
    };

    const handleTouchStart =
        (onTargetTouchStart: TOnTargetTouchStart) => (event: React.TouchEvent<HTMLSpanElement>) => {
            if (event.touches.length != 1) {
                return;
            }

            setIsFocusedByClick(true);
            setIsDragged(true);

            document.addEventListener("touchend", handleDocumentTouchEnd);

            if (railNode) {
                cursorPrevNormalizedValue.current = SliderExtendedUtils.getNormalizedCursorValue({
                    cursorXPosition: event.touches[0].clientX,
                    railNode,
                });
            }

            onTargetTouchStart(event);
            onTouchStart?.(event);
        };

    const handleTouchMove = (event: TouchEvent) => {
        if (event.touches.length != 1) {
            return;
        }

        if (event.cancelable) {
            event.preventDefault();
        }

        SliderExtendedTrackActions.dragDots({
            cursorPrevNormalizedValue,
            cursorXPosition: event.touches[0].clientX,
            dots,
            railNode,
            reverse,
            steps,
        });
    };

    const handleDocumentTouchEnd = (event: TouchEvent) => {
        if (event.cancelable) {
            event.preventDefault();
        }

        setIsDragged(false);
        // Курсор отпущен за пределами Track.
        if (event.target !== ref.current) {
            setIsHoverOrDragTrack(false);
        }

        document.removeEventListener("touchend", handleDocumentTouchEnd);
    };

    /**
     * Обработчик сочетаний клавиш, меняющих значение слайдера на меньшее.
     */
    const handleKeyDownToMoveLeft = (event: KeyboardEvent) => {
        // Предотвращает скролл страницы.
        event.preventDefault();

        SliderExtendedTrackActions.moveToPrevStep(dots, steps);
    };

    /**
     * Обработчик сочетаний клавиш, меняющих значение слайдера на большее.
     */
    const handleKeyDownToMoveRight = (event: KeyboardEvent) => {
        // Предотвращает скролл страницы.
        event.preventDefault();

        SliderExtendedTrackActions.moveToNextStep(dots, steps);
    };

    const handleFocus = (event: React.FocusEvent<HTMLSpanElement>) => {
        if (!focusedSlider) {
            setFocusedSlider(true);
        }

        setIsFocused(true);
        onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLSpanElement>) => {
        if (focusedSlider) {
            setFocusedSlider(false);
        }

        setIsFocusedByClick(false);
        setIsFocused(false);
        onBlur?.(event);
    };

    const handleMouseOver = (event: React.MouseEvent<HTMLSpanElement>) => {
        setIsHoverOrDragTrack(true);
        onMouseOver?.(event);
    };

    const handleMouseOut = (event: React.MouseEvent<HTMLSpanElement>) => {
        // Track в текущий момент не перетаскивается мышью.
        if (!isDragged) {
            setIsHoverOrDragTrack(false);
        }
        onMouseOut?.(event);
    };

    const { left, right } = SliderExtendedTrackActions.getTrackPosition({ dots, reverse });

    return (
        <>
            {isFocused && (
                <>
                    <KeyDownListener
                        onMatch={handleKeyDownToMoveLeft}
                        eventKeyCode={[EVENT_KEY_CODES.ARROW_LEFT, EVENT_KEY_CODES.ARROW_DOWN]}
                    />
                    <KeyDownListener
                        onMatch={handleKeyDownToMoveRight}
                        eventKeyCode={[EVENT_KEY_CODES.ARROW_RIGHT, EVENT_KEY_CODES.ARROW_UP]}
                    />
                </>
            )}

            <SliderExtendedMoveHandler
                onMouseMove={throttle(handleMouseMove, 100)}
                onTouchMove={throttle(handleTouchMove)}
                targetRef={ref}
            >
                {({ onTargetMouseDown, onTargetTouchStart }) => (
                    <span
                        role="button"
                        tabIndex={!disabled && innerDraggable ? tabIndex : -1}
                        {...htmlSpanAttributes}
                        className={clsx(styles.sliderExtendedTrack, sizeToClassNameMap[size], className, {
                            [styles.disabled]: disabled,
                            [styles.focusedByClick]: isFocusedByClick,
                            [styles.hoverOrDragByMouse]: isHoverOrDragTrack,
                            // Не перетаскиваемый.
                            [styles.staticSlider]: !innerDraggable,
                        })}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        onMouseDown={handleMouseDown(onTargetMouseDown)}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        onTouchStart={handleTouchStart(onTargetTouchStart)}
                        ref={ref}
                        style={{
                            left: `${left}%`,
                            right: `${right}%`,
                        }}
                    />
                )}
            </SliderExtendedMoveHandler>
        </>
    );
};

SliderExtendedTrack.displayName = "SliderExtendedTrack";
