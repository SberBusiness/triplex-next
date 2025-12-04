import React, { useState, useEffect, useRef } from "react";
import { IStepperExtendedProps, StepperExtended } from "./StepperExtended";
import { StepperWrapper } from "./StepperWrapper";
import { StepperStep, IStepperStepProps } from "./StepperStep";
import { CarouselExtended, ICarouselExtendedButtonProvideProps } from "../CarouselExtended/CarouselExtended";
import { ButtonIcon } from "../Button/ButtonIcon";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { EScreenWidth } from "../../helpers/breakpoints";
import { scrollSmoothHorizontally } from "../../utils/scroll";
import clsx from "clsx";
import styles from "./styles/Stepper.module.less";
import { EStepperSize } from "./enums";

/** Внутренние составляющие Stepper. */
interface IStepperComposition {
    Step: typeof StepperStep;
    Wrapper: typeof StepperWrapper;
}

/** Свойства шага в Stepper */
export interface IStepperStep extends IStepperStepProps {
    /** Название шага. */
    label?: React.ReactNode;
}

/** Свойства Stepper. */
export interface IStepperProps extends IStepperExtendedProps {
    children?: never;
    /** Шаги. */
    steps: Array<IStepperStep>;
    /** Размеры шагов Stepper*/
    size?: EStepperSize;
}

/** Возвращает CSS класс размера StepperStep. */
const getStepperSizeClass = (size: EStepperSize) => {
    switch (size) {
        case EStepperSize.LG:
            return styles.lg;
        case EStepperSize.MD:
            return styles.md;
        case EStepperSize.SM:
            return styles.sm;
    }
};

/** Компонент Stepper, список шагов */
export const Stepper: React.FC<IStepperProps> & IStepperComposition = ({
    className,
    steps,
    size = EStepperSize.SM,
    selectedStepId,
    ...rest
}) => {
    const [state, setState] = useState({ stepNext: 0, stepPrev: 0 });
    const carouselRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<Record<string, HTMLLIElement | null>>({});
    const classNames = clsx(styles.stepper, getStepperSizeClass(size), className);
    const selectedIndex = steps.findIndex((s) => s.id === selectedStepId);

    const renderPrevButton = ({ hidden, ...rest }: ICarouselExtendedButtonProvideProps) =>
        hidden ? null : (
            <ButtonIcon
                className={clsx(styles.buttonPrev, getStepperSizeClass(size))}
                {...rest}
                aria-label="Прокрутить назад"
            >
                <CaretleftStrokeSrvIcon24 className={clsx(styles.buttonPrevIcon)} paletteIndex={5} />
            </ButtonIcon>
        );

    const renderNextButton = ({ hidden, ...rest }: ICarouselExtendedButtonProvideProps) =>
        hidden ? null : (
            <ButtonIcon
                className={clsx(styles.buttonNext, getStepperSizeClass(size))}
                {...rest}
                aria-label="Прокрутить вперёд"
            >
                <CaretrightStrokeSrvIcon24 className={clsx(styles.buttonNextIcon)} paletteIndex={5} />
            </ButtonIcon>
        );

    useEffect(() => {
        const { current: carousel } = carouselRef;

        if (carousel) {
            const value = carousel.getBoundingClientRect().width * 0.3;

            setState({ stepNext: value, stepPrev: value });
        }
    }, []);

    /** Выравнивание шага по правой части карусели. */
    const alignStepRight = (carousel: HTMLDivElement, step: HTMLLIElement, delta: number, stepRight: number) => {
        if (delta > 0) {
            // Текущий шаг – не последний, необходимо показать следующий шаг.
            if (step.nextElementSibling) {
                delta -= stepRight - step.nextElementSibling.getBoundingClientRect().right;
            }
            scrollSmoothHorizontally(carousel, Math.ceil(delta));
        }
    };

    /** Выравнивание шага по левой части карусели. */
    const alignStepLeft = (carousel: HTMLDivElement, step: HTMLLIElement, delta: number, stepLeft: number) => {
        if (delta < 0) {
            // Текущий шаг – не первый, необходимо показать предыдущий шаг.
            if (step.previousElementSibling) {
                delta -= stepLeft - step.previousElementSibling.getBoundingClientRect().left;
            }
            scrollSmoothHorizontally(carousel, Math.floor(delta));
        }
    };

    /** Выравнивание шага по центру карусели. */
    const alignStepCenter = (carousel: HTMLDivElement, delta: number) => {
        if (delta) {
            scrollSmoothHorizontally(carousel, delta);
        }
    };

    /** Выравнивание шага в карусели. */
    const alignStep = (carousel: HTMLDivElement, step: HTMLLIElement) => {
        const { left: carouselLeft, right: carouselRight, width: carouselWidth } = carousel.getBoundingClientRect();
        const { left: stepLeft, right: stepRight, width: stepWidth } = step.getBoundingClientRect();
        const carouselCenter = carouselLeft + carouselWidth / 2;
        const stepCenter = stepLeft + stepWidth / 2;

        if (window.matchMedia(`(max-width: ${EScreenWidth.SM_MAX})`).matches) {
            alignStepCenter(carousel, stepCenter - carouselCenter);
        } else if (carouselCenter > stepCenter) {
            alignStepLeft(carousel, step, stepLeft - carouselLeft - 32, stepLeft); // 32 - paddingLeft
        } else if (carouselCenter < stepCenter) {
            alignStepRight(carousel, step, stepRight - carouselRight + 32, stepRight); // 32 - paddingRight
        }
    };

    useEffect(() => {
        if (selectedStepId) {
            const { current: carousel } = carouselRef;
            const step = stepRefs.current[selectedStepId];

            if (carousel && step) {
                alignStep(carousel, step);
            }
        }
    }, [selectedStepId]);

    return (
        <CarouselExtended
            className={clsx(styles.stepperCarousel, getStepperSizeClass(size))}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={state.stepPrev}
            stepNext={state.stepNext}
            ref={carouselRef}
        >
            <StepperExtended className={classNames} selectedStepId={selectedStepId} size={size} {...rest}>
                {steps.map(({ label, ...step }, index) => {
                    return (
                        <StepperExtended.Step
                            key={step.id}
                            forwardedRef={(instance) => (stepRefs.current[step.id] = instance)}
                            {...step}
                            isInActiveStep={index > selectedIndex}
                        >
                            {label}
                        </StepperExtended.Step>
                    );
                })}
            </StepperExtended>
        </CarouselExtended>
    );
};

Stepper.Wrapper = StepperWrapper;
Stepper.Step = StepperStep;
