import React, { useState, useEffect, useRef, useCallback } from "react";
import { isEqual } from "lodash-es";
import { scrollSmoothHorizontally } from "../../utils/scroll";
import styles from "./styles/CarouselExtended.module.less";

/** Состояние кнопок прокрутки, вычисляемое по размерам и позиции прокрутки ленты. */
interface ICarouselExtendedControlsState {
    /** Прокрутка не нужна — контент помещается в видимую область. */
    hidden: boolean;
    /** Достигнут правый край ленты. */
    nextDisabled: boolean;
    /** Достигнут левый край ленты. */
    prevDisabled: boolean;
}

/** Состояние кнопок до первого измерения ленты. */
const INITIAL_CONTROLS_STATE: ICarouselExtendedControlsState = {
    hidden: true,
    nextDisabled: false,
    prevDisabled: true,
};

/**
 * Свойства, которые CarouselExtended передаёт в рендер-функции кнопок прокрутки:
 * `disabled` (край ленты достигнут), `hidden` (прокрутка не нужна) и `onClick`.
 */
export interface ICarouselExtendedButtonProvideProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/** Свойства компонента CarouselExtended. */
export interface ICarouselExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Рендер-функция кнопки "Назад". Получает `disabled`, `hidden` и `onClick`.
     * Позиционирование кнопки — на стороне потребителя; при `hidden` обычно возвращается null.
     */
    buttonPrev: (props: ICarouselExtendedButtonProvideProps) => React.ReactNode;
    /**
     * Рендер-функция кнопки "Вперёд". Получает `disabled`, `hidden` и `onClick`.
     * Позиционирование кнопки — на стороне потребителя; при `hidden` обычно возвращается null.
     */
    buttonNext: (props: ICarouselExtendedButtonProvideProps) => React.ReactNode;
    /** Величина (px) прокрутки при клике на кнопку "Назад". Дробное значение округляется вверх по модулю. */
    stepPrev: number;
    /** Величина (px) прокрутки при клике на кнопку "Вперёд". Дробное значение округляется вверх по модулю. */
    stepNext: number;
}

/**
 * Карусель — горизонтально прокручиваемая лента произвольного контента.
 * Разметку кнопок прокрутки рендерит потребитель, компонент передаёт им состояние и обработчик клика.
 * Ref указывает на прокручиваемый контейнер, а не на корневой элемент.
 */
export const CarouselExtended = React.forwardRef<HTMLDivElement, ICarouselExtendedProps>(
    ({ children, buttonPrev, buttonNext, stepPrev, stepNext, ...htmlDivAttributes }, ref) => {
        const [controlsState, setControlsState] = useState(INITIAL_CONTROLS_STATE);
        const carouselRef = useRef<HTMLDivElement | null>(null);

        /** Пересчитывает состояние кнопок по текущим размерам и позиции прокрутки ленты. */
        const checkControls = useCallback((): void => {
            const carousel = carouselRef.current;

            if (carousel === null) {
                return;
            }

            const nextState: ICarouselExtendedControlsState = {
                hidden: carousel.scrollWidth === carousel.clientWidth,
                nextDisabled: Math.round(carousel.scrollLeft) + carousel.offsetWidth >= carousel.scrollWidth,
                prevDisabled: Math.round(carousel.scrollLeft) <= 0,
            };

            setControlsState((prevState) => (isEqual(prevState, nextState) ? prevState : nextState));
        }, []);

        useEffect(() => {
            window.addEventListener("resize", checkControls);
            document.addEventListener("scroll", checkControls);

            return () => {
                window.removeEventListener("resize", checkControls);
                document.removeEventListener("scroll", checkControls);
            };
        }, [checkControls]);

        useEffect(() => {
            checkControls();
        }, [children, checkControls]);

        /** Обработчик клика по кнопке "Назад". */
        const handleMovePrev = (): void => {
            const carousel = carouselRef.current;

            if (carousel !== null) {
                scrollSmoothHorizontally(carousel, Math.floor(-stepPrev));
            }
        };

        /** Обработчик клика по кнопке "Вперёд". */
        const handleMoveNext = (): void => {
            const carousel = carouselRef.current;

            if (carousel !== null) {
                scrollSmoothHorizontally(carousel, Math.ceil(stepNext));
            }
        };

        /**
         * Сохраняет узел ленты локально и пробрасывает его во внешний ref.
         * Идентичность колбэка сохраняется ровно настолько, насколько стабилен `ref` потребителя:
         * при инлайновом колбэк-ref React по-прежнему отцепляет и заново прицепляет узел на каждом рендере.
         */
        const setRef = useCallback(
            (instance: HTMLDivElement | null): void => {
                carouselRef.current = instance;

                if (typeof ref === "function") {
                    ref(instance);
                } else if (ref) {
                    ref.current = instance;
                }
            },
            [ref],
        );

        return (
            <div {...htmlDivAttributes}>
                {buttonPrev({
                    disabled: controlsState.prevDisabled,
                    hidden: controlsState.hidden,
                    onClick: handleMovePrev,
                })}
                <div className={styles.carouselExtended} onScroll={checkControls} ref={setRef}>
                    {children}
                </div>
                {buttonNext({
                    disabled: controlsState.nextDisabled,
                    hidden: controlsState.hidden,
                    onClick: handleMoveNext,
                })}
            </div>
        );
    },
);

CarouselExtended.displayName = "CarouselExtended";
