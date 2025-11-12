import React, { useState, useEffect, useRef, useCallback } from "react";
import { isEqual } from "lodash";
import { scrollSmoothHorizontally } from "../../utils/scroll";
import clsx from "clsx";
import styles from "./styles/CarouselExtended.module.less";

export interface ICarouselExtendedButtonProvideProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/** Свойства компонента CarouselExtended. */
export interface ICarouselExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Рендер-функция кнопки "Назад". */
    buttonPrev: (props: ICarouselExtendedButtonProvideProps) => React.ReactNode;
    /** Рендер-функция кнопки "Вперёд". */
    buttonNext: (props: ICarouselExtendedButtonProvideProps) => React.ReactNode;
    /** Величина (px) прокрутки при клике на кнопку "Назад". */
    stepPrev: number;
    /** Величина (px) прокрутки при клике на кнопку "Вперёд". */
    stepNext: number;
}

/** Карусель. */
export const CarouselExtended = React.forwardRef<HTMLDivElement, ICarouselExtendedProps>(
    ({ children, buttonPrev, buttonNext, stepPrev, stepNext, ...htmlDivAttributes }, ref) => {
        const [controlsState, setControlsState] = useState({ hidden: true, nextDisabled: false, prevDisabled: true });
        const carouselRef = useRef<HTMLDivElement | null>(null);

        /** Функция, контролирующая состояние кнопок. */
        const checkControls = useCallback((): void => {
            const carousel = carouselRef.current!;
            const newState = {
                hidden: carousel.scrollWidth == carousel.clientWidth,
                nextDisabled: Math.round(carousel.scrollLeft) + carousel.offsetWidth >= carousel.scrollWidth,
                prevDisabled: Math.round(carousel.scrollLeft) <= 0,
            };

            if (isEqual(newState, controlsState) == false) {
                setControlsState(newState);
            }
        }, [controlsState]);

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
            scrollSmoothHorizontally(carouselRef.current!, Math.floor(-stepPrev));
        };

        /** Обработчик клика по кнопке "Вперёд". */
        const handleMoveNext = (): void => {
            scrollSmoothHorizontally(carouselRef.current!, Math.ceil(stepNext));
        };

        /** Функция для хранения ссылки. */
        const setRef = (instance: HTMLDivElement | null) => {
            carouselRef.current = instance;
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        return (
            <div {...htmlDivAttributes}>
                {/* eslint-disable-next-line react-hooks/refs */}
                {buttonPrev({
                    disabled: controlsState.prevDisabled,
                    hidden: controlsState.hidden,
                    onClick: handleMovePrev,
                })}
                <div className={clsx(styles.carouselExtended)} onScroll={checkControls} ref={setRef}>
                    {children}
                </div>
                {/* eslint-disable-next-line react-hooks/refs */}
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
