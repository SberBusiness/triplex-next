import React, { useCallback, useContext, useRef, useState } from "react";
import clsx from "clsx";
import { KeyDownListener } from "@sberbusiness/triplex-next/components/KeyDownListener";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { SliderExtendedContext } from "../../SliderExtendedContext";
import { SliderExtendedUtils } from "../../SliderExtendedUtils";
import { setForwardedRef } from "../../utils";
import { SliderExtendedMoveHandler, TOnTargetMouseDown, TOnTargetTouchStart } from "../SliderExtendedMoveHandler";
import { SliderExtendedTrackActions } from "./SliderExtendedTrackActions";
import styles from "./styles/SliderExtendedTrack.module.less";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Интервал троттлинга перемещения трека мышью, мс. */
const MOUSE_MOVE_WAIT = 100;

/** tabIndex трека, когда слайдер в фокусе. Между ползунками с tabIndex 1 и 3. */
const FOCUSED_TAB_INDEX = 2;

/** Свойства компонента SliderExtendedTrack. */
export interface ISliderExtendedTrackProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Трек не имеет содержимого. */
    children?: never;
    /** Трек можно передвигать. Работает только при двух SliderExtended.Dot. По умолчанию true. */
    draggable?: boolean;
}

/**
 * Компонент SliderExtendedTrack — заполненная часть полосы слайдера.
 * При одном SliderExtended.Dot тянется от начала полосы до ползунка, при двух — между ползунками
 * и может перемещаться целиком, сдвигая оба ползунка.
 */
export const SliderExtendedTrack = React.forwardRef<HTMLSpanElement, ISliderExtendedTrackProps>(
    (
        {
            className,
            draggable = true,
            onBlur,
            onFocus,
            onMouseDown,
            onMouseOver,
            onMouseOut,
            onTouchStart,
            style,
            ...htmlSpanAttributes
        },
        ref,
    ) => {
        // Элемент в фокусе.
        const [isFocused, setIsFocused] = useState(false);
        // Track получил фокус при клике.
        const [isFocusedByClick, setIsFocusedByClick] = useState(false);
        // Track в текущий момент перетаскивается мышью.
        const [isDragged, setIsDragged] = useState(false);

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

        const trackRef = useRef<HTMLSpanElement | null>(null);

        // Перемещать трек можно только когда он ограничен двумя ползунками.
        const innerDraggable = draggable && dots.length > 1;
        const tabIndex = !disabled && innerDraggable && focusedSlider ? FOCUSED_TAB_INDEX : -1;

        /** Сохраняет узел трека локально (для слушателей перемещения) и пробрасывает во внешний ref. */
        const setRef = useCallback(
            (instance: HTMLSpanElement | null) => {
                trackRef.current = instance;
                setForwardedRef(ref, instance);
            },
            [ref],
        );

        const handleDocumentMouseUp = (event: MouseEvent) => {
            setIsDragged(false);
            // Курсор отпущен за пределами Track.
            if (event.target !== trackRef.current) {
                setIsHoverOrDragTrack(false);
            }

            document.removeEventListener("mouseup", handleDocumentMouseUp);
        };

        const handleMouseDown =
            (onTargetMouseDown: TOnTargetMouseDown) => (event: React.MouseEvent<HTMLSpanElement>) => {
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

        const handleDocumentTouchEnd = (event: TouchEvent) => {
            if (event.cancelable) {
                event.preventDefault();
            }

            setIsDragged(false);
            // Курсор отпущен за пределами Track.
            if (event.target !== trackRef.current) {
                setIsHoverOrDragTrack(false);
            }

            document.removeEventListener("touchend", handleDocumentTouchEnd);
        };

        const handleTouchStart =
            (onTargetTouchStart: TOnTargetTouchStart) => (event: React.TouchEvent<HTMLSpanElement>) => {
                if (event.touches.length !== 1) {
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
            if (event.touches.length !== 1) {
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

        /** Обработчик сочетаний клавиш, меняющих значение слайдера на меньшее. */
        const handleKeyDownToMoveLeft = (event: KeyboardEvent) => {
            // Предотвращает скролл страницы.
            event.preventDefault();

            SliderExtendedTrackActions.moveToPrevStep(dots, steps);
        };

        /** Обработчик сочетаний клавиш, меняющих значение слайдера на большее. */
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

        if (!dots.length) {
            return null;
        }

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
                    mouseMoveWait={MOUSE_MOVE_WAIT}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    targetRef={trackRef}
                >
                    {({ onTargetMouseDown, onTargetTouchStart }) => (
                        <span
                            role="button"
                            tabIndex={tabIndex}
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
                            ref={setRef}
                            style={{
                                ...style,
                                left: `${left}%`,
                                right: `${right}%`,
                            }}
                        />
                    )}
                </SliderExtendedMoveHandler>
            </>
        );
    },
);

SliderExtendedTrack.displayName = "SliderExtendedTrack";
