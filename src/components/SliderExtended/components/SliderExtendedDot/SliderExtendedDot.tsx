import React, { useCallback, useContext, useLayoutEffect, useRef, useState } from "react";
import { uniqueId } from "lodash-es";
import clsx from "clsx";
import { KeyDownListener } from "@sberbusiness/triplex-next/components/KeyDownListener";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { SliderExtendedContext } from "../../SliderExtendedContext";
import { SliderExtendedUtils } from "../../SliderExtendedUtils";
import { setForwardedRef } from "../../utils";
import { SliderExtendedMoveHandler, TOnTargetMouseDown, TOnTargetTouchStart } from "../SliderExtendedMoveHandler";
import { SliderExtendedDotActions } from "./SliderExtendedDotActions";
import styles from "./styles/SliderExtendedDot.module.less";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Интервал троттлинга перемещения ползунка мышью, мс. */
const MOUSE_MOVE_WAIT = 50;

/** Свойства компонента SliderExtendedDot. */
export interface ISliderExtendedDotProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange" | "value"> {
    /** Обработчик изменения значения. Вызывается со значением шага, на который переместился ползунок. */
    onChange: (value: number) => void;
    /** Значение позиции ползунка. Должно быть в диапазоне от min до max. */
    value: number;
}

/**
 * Компонент SliderExtendedDot — передвигаемый ползунок. Слайдер может иметь 1 или 2 SliderExtendedDot.
 * Значение контролируемое: компонент сообщает новое значение через onChange и ждёт его в value.
 */
export const SliderExtendedDot = React.forwardRef<HTMLSpanElement, ISliderExtendedDotProps>(
    (
        {
            children,
            className,
            onBlur,
            onChange,
            onFocus,
            onMouseDown,
            onTouchStart,
            style,
            value,
            ...htmlSpanAttributes
        },
        ref,
    ) => {
        // Кнопка в фокусе.
        const [isFocused, setIsFocused] = useState(false);
        // Кнопка получила фокус при клике.
        const [isFocusedByClick, setIsFocusedByClick] = useState(false);
        // Кнопка в текущий момент перетаскивается мышью.
        const [isDragged, setIsDragged] = useState(false);
        const [id] = useState(() => uniqueId());
        const {
            addDot,
            disabled,
            dots,
            focused: focusedSlider,
            isHoverOrDragTrack,
            max,
            min,
            railNode,
            removeDot,
            reverse,
            setFocused: setFocusedSlider,
            steps,
            updateDot,
            size,
        } = useContext(SliderExtendedContext);

        const dotRef = useRef<HTMLSpanElement | null>(null);
        const tabIndex = SliderExtendedDotActions.getTabIndex({ disabled, dotId: id, dots, focusedSlider });
        const normalizedValue = SliderExtendedUtils.getNormalizedValue({ max, min, value });
        // Позиция ползунка на полосе слайдера, в %.
        const leftPosition = reverse ? 100 - normalizedValue : normalizedValue;

        /** Сохраняет узел ползунка локально (для слушателей перемещения) и пробрасывает во внешний ref. */
        const setRef = useCallback(
            (instance: HTMLSpanElement | null) => {
                dotRef.current = instance;
                setForwardedRef(ref, instance);
            },
            [ref],
        );

        // Регистрация ползунка в контексте слайдера на время его жизни.
        // Зависимости пусты намеренно: addDot/removeDot пересоздаются на каждом рендере,
        // а перерегистрация ползунка сбросила бы его позицию в массиве dots.
        useLayoutEffect(() => {
            addDot({
                changeValue: onChange,
                id,
                normalizedValue,
                stepIndex: SliderExtendedUtils.getStepIndexByNormalizedValue({ normalizedValue, steps }),
                value,
            });

            return () => removeDot(id);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        // Синхронизация значения ползунка с контекстом.
        // updateDot пересоздаётся на каждом рендере, поэтому в зависимости не попадает — иначе
        // обновление состояния слайдера запускало бы эффект заново.
        useLayoutEffect(() => {
            updateDot({
                changeValue: onChange,
                id,
                normalizedValue,
                stepIndex: SliderExtendedUtils.getStepIndexByNormalizedValue({ normalizedValue, steps }),
                value,
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [id, normalizedValue, onChange, steps, value]);

        /** Перемещает ползунок на ближайший к позиции курсора шаг. */
        const moveToNearestStep = (cursorNormalizedValue: number) => {
            const nextStep = SliderExtendedUtils.getNearestStep({
                normalizedValue: reverse ? 100 - cursorNormalizedValue : cursorNormalizedValue,
                steps,
            });

            onChange(nextStep.value);
        };

        const handleDocumentMouseUp = () => {
            setIsDragged(false);

            document.removeEventListener("mouseup", handleDocumentMouseUp);
        };

        const handleMouseDown =
            (onTargetMouseDown: TOnTargetMouseDown) => (event: React.MouseEvent<HTMLSpanElement>) => {
                setIsFocusedByClick(true);
                setIsDragged(true);

                document.addEventListener("mouseup", handleDocumentMouseUp);

                onTargetMouseDown(event);
                onMouseDown?.(event);
            };

        const handleMouseMove = (event: MouseEvent) => {
            if (railNode) {
                moveToNearestStep(
                    SliderExtendedUtils.getNormalizedCursorValue({ cursorXPosition: event.clientX, railNode }),
                );
            }
        };

        const handleDocumentTouchEnd = (event: TouchEvent) => {
            if (event.cancelable) {
                event.preventDefault();
            }

            setIsDragged(false);

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

            if (railNode) {
                moveToNearestStep(
                    SliderExtendedUtils.getNormalizedCursorValue({
                        cursorXPosition: event.touches[0].clientX,
                        railNode,
                    }),
                );
            }
        };

        /** Возвращает текущий ползунок из контекста. */
        const getCurrentDot = () => dots.find((dot) => dot.id === id);

        /** Обработчик сочетаний клавиш, меняющих значение слайдера на меньшее. */
        const handleKeyDownToMoveLeft = (event: KeyboardEvent) => {
            // Предотвращает скролл страницы.
            event.preventDefault();

            SliderExtendedDotActions.moveToPrevStep(getCurrentDot(), steps);
        };

        /** Обработчик сочетаний клавиш, меняющих значение слайдера на большее. */
        const handleKeyDownToMoveRight = (event: KeyboardEvent) => {
            // Предотвращает скролл страницы.
            event.preventDefault();

            SliderExtendedDotActions.moveToNextStep(getCurrentDot(), steps);
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
                    targetRef={dotRef}
                >
                    {({ onTargetMouseDown, onTargetTouchStart }) => (
                        <span
                            tabIndex={tabIndex}
                            role="slider"
                            aria-valuemin={min}
                            aria-valuenow={value}
                            aria-valuemax={max}
                            {...htmlSpanAttributes}
                            className={clsx(styles.sliderExtendedDot, sizeToClassNameMap[size], className, {
                                [styles.disabled]: disabled,
                                [styles.dragByMouse]: isDragged || isHoverOrDragTrack,
                                [styles.focusedByClick]: isFocusedByClick,
                            })}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            onMouseDown={handleMouseDown(onTargetMouseDown)}
                            onTouchStart={handleTouchStart(onTargetTouchStart)}
                            style={{ ...style, left: `${leftPosition}%` }}
                            ref={setRef}
                        >
                            {children}
                        </span>
                    )}
                </SliderExtendedMoveHandler>
            </>
        );
    },
);

SliderExtendedDot.displayName = "SliderExtendedDot";
