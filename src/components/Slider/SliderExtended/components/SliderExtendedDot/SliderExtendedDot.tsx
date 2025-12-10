import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from "react";
import { throttle } from "lodash";
import { SliderExtendedUtils } from "../../SliderExtendedUtils";
import { SliderExtendedContext } from "../../SliderExtendedContext";
import { SliderExtendedMoveHandler, TOnTargetMouseDown, TOnTargetTouchStart } from "../SliderExtendedMoveHandler";
import { SliderExtendedDotActions } from "./SliderExtendedDotActions";
import { useSliderExtendedDotTabIndex } from "./useSliderExtendedDotTabIndex";
import { uniqueId } from "lodash-es";
import { KeyDownListener } from "@sberbusiness/triplex-next";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import clsx from "clsx";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import styles from "./styles/SliderExtendedDot.module.less";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Свойства компонента SlideExtendedDot. */
export interface ISliderExtendedDotProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange" | "value"> {
    onChange: (value: number) => void;
    value: number;
}

/** Компонент SliderExtendedDot. Слайдер может иметь 1 или 2 SliderExtendedDot. */
export const SliderExtendedDot: React.FC<ISliderExtendedDotProps> = ({
    children,
    className,
    onBlur,
    onChange,
    onFocus,
    onMouseDown,
    onTouchStart,
    value,
    ...htmlSpanAttributes
}) => {
    // Кнопка в фокусе.
    const [isFocused, setIsFocused] = useState(false);
    // Кнопка получила фокус при клике.
    const [isFocusedByClick, setIsFocusedByClick] = useState(false);
    // Кнопка в текущий момент перетаскивается мышью.
    const [isDragged, setIsDragged] = useState(false);
    const [id] = useState(uniqueId());
    const [leftPosition, setLeftPosition] = useState(0);
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

    const tabIndex = useSliderExtendedDotTabIndex(disabled, id, dots, focusedSlider);
    const ref = useRef(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => () => removeDot(id), []);

    useEffect(() => {
        const normalizedValue = SliderExtendedUtils.getNormalizedValue({ max, min, value });

        // Добавление Dot в контекст.
        addDot({
            changeValue: onChange,
            id,
            normalizedValue,
            stepIndex: SliderExtendedUtils.getStepIndexByNormalizedValue({ normalizedValue, steps }),
            value,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
        const nextNormalizedValue = SliderExtendedUtils.getNormalizedValue({ max, min, value });

        if (reverse) {
            setLeftPosition(100 - nextNormalizedValue);
        } else {
            setLeftPosition(nextNormalizedValue);
        }

        updateDot({
            changeValue: onChange,
            id,
            normalizedValue: nextNormalizedValue,
            stepIndex: SliderExtendedUtils.getStepIndexByNormalizedValue({
                normalizedValue: nextNormalizedValue,
                steps,
            }),
            value,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onChange, value, max, min, steps]);

    const handleMouseDown = (onTargetMouseDown: TOnTargetMouseDown) => (event: React.MouseEvent<HTMLSpanElement>) => {
        setIsFocusedByClick(true);

        setIsDragged(true);
        document.addEventListener("mouseup", handleDocumentMouseUp);

        onTargetMouseDown(event);
        onMouseDown?.(event);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (railNode) {
            let normalizedValue = SliderExtendedUtils.getNormalizedCursorValue({
                cursorXPosition: event.clientX,
                railNode,
            });
            if (reverse) {
                normalizedValue = 100 - normalizedValue;
            }
            const nextStep = SliderExtendedUtils.getNearestStep({ normalizedValue, steps });

            onChange(nextStep.value);
        }
    };

    const handleDocumentMouseUp = () => {
        setIsDragged(false);

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

        if (railNode) {
            let normalizedValue = SliderExtendedUtils.getNormalizedCursorValue({
                cursorXPosition: event.touches[0].clientX,
                railNode,
            });
            if (reverse) {
                normalizedValue = 100 - normalizedValue;
            }
            const nextStep = SliderExtendedUtils.getNearestStep({ normalizedValue, steps });

            onChange(nextStep.value);
        }
    };

    const handleDocumentTouchEnd = (event: TouchEvent) => {
        if (event.cancelable) {
            event.preventDefault();
        }

        setIsDragged(false);

        document.removeEventListener("touchend", handleDocumentTouchEnd);
    };

    /**
     * Возвращает текущую кнопку из контекста.
     */
    const getCurrentDot = () => dots.filter((d) => d.id === id)[0];

    /**
     * Обработчик сочетаний клавиш, меняющих значение слайдера на меньшее.
     */
    const handleKeyDownToMoveLeft = (event: KeyboardEvent) => {
        // Предотвращает скролл страницы.
        event.preventDefault();

        SliderExtendedDotActions.moveToPrevStep(getCurrentDot(), steps);
    };

    /**
     * Обработчик сочетаний клавиш, меняющих значение слайдера на большее.
     */
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
                onMouseMove={throttle(handleMouseMove, 50)}
                onTouchMove={throttle(handleTouchMove)}
                targetRef={ref}
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
                        style={{ left: `${leftPosition}%` }}
                        ref={ref}
                    >
                        {children}
                    </span>
                )}
            </SliderExtendedMoveHandler>
        </>
    );
};

SliderExtendedDot.displayName = "SliderExtendedDot";
