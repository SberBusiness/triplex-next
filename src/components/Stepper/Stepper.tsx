import React, { useState, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { CarouselExtended, ICarouselExtendedButtonProvideProps } from "../CarouselExtended/CarouselExtended";
import { ButtonIcon } from "../Button/ButtonIcon";
import { StepperExtended } from "./StepperExtended";
import { StepperStep } from "./StepperStep";
import { createSizeToClassNameMap, scrollSmoothHorizontally } from "../../utils";
import { IStepperProps } from "./types";
import { EComponentSize } from "../../enums";
import { EScreenWidth } from "../../helpers/breakpoints";
import styles from "./styles/Stepper.module.less";

/** Внутренние составляющие Stepper. */
interface IStepperComposition {
    Step: typeof StepperStep;
}

/** Соответствие размера имени класса. */
const sizeToClassNameMap = createSizeToClassNameMap(styles);

const SCROLL_STEP_RATIO = 0.3;

/** Компонент Stepper, список шагов */
export const Stepper: React.FC<IStepperProps> & IStepperComposition = ({
    className,
    steps,
    size = EComponentSize.LG,
    selectedStepId,
    ...restProps
}) => {
    const [state, setState] = useState({ stepNext: 0, stepPrev: 0 });
    const carouselRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<Record<string, HTMLLIElement | null>>({});
    const selectedIndex = steps.findIndex((step) => step.id === selectedStepId);

    const renderPrevButton = useCallback(
        ({ hidden, ...restButtonProps }: ICarouselExtendedButtonProvideProps) =>
            hidden ? null : (
                <div className={clsx(styles.stepperButtonWrapper, styles.prev)}>
                    <ButtonIcon
                        className={clsx(styles.stepperButton, sizeToClassNameMap[size])}
                        tabIndex={-1}
                        {...restButtonProps}
                    >
                        <CaretleftStrokeSrvIcon24 paletteIndex={5} />
                    </ButtonIcon>
                </div>
            ),
        [size],
    );

    const renderNextButton = useCallback(
        ({ hidden, ...restButtonProps }: ICarouselExtendedButtonProvideProps) =>
            hidden ? null : (
                <div className={clsx(styles.stepperButtonWrapper, styles.next)}>
                    <ButtonIcon
                        className={clsx(styles.stepperButton, sizeToClassNameMap[size])}
                        tabIndex={-1}
                        {...restButtonProps}
                    >
                        <CaretrightStrokeSrvIcon24 paletteIndex={5} />
                    </ButtonIcon>
                </div>
            ),
        [size],
    );

    useEffect(() => {
        const carouselNode = carouselRef.current;

        if (carouselNode === null) {
            return;
        }

        const resizeObserver = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width;
            const scrollStep = width * SCROLL_STEP_RATIO;

            setState({
                stepNext: scrollStep,
                stepPrev: scrollStep,
            });
        });

        resizeObserver.observe(carouselNode);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    /** Выравнивание шага по правой части карусели. */
    const alignStepRight = useCallback(
        (carousel: HTMLDivElement, step: HTMLLIElement, delta: number, stepRight: number) => {
            if (delta > 0) {
                // Текущий шаг – не последний, необходимо показать следующий шаг.
                if (step.nextElementSibling) {
                    delta -= stepRight - step.nextElementSibling.getBoundingClientRect().right;
                }
                scrollSmoothHorizontally(carousel, Math.ceil(delta));
            }
        },
        [],
    );

    /** Выравнивание шага по левой части карусели. */
    const alignStepLeft = useCallback(
        (carousel: HTMLDivElement, step: HTMLLIElement, delta: number, stepLeft: number) => {
            if (delta < 0) {
                // Текущий шаг – не первый, необходимо показать предыдущий шаг.
                if (step.previousElementSibling) {
                    delta -= stepLeft - step.previousElementSibling.getBoundingClientRect().left;
                }
                scrollSmoothHorizontally(carousel, Math.floor(delta));
            }
        },
        [],
    );

    /** Выравнивание шага по центру карусели. */
    const alignStepCenter = useCallback((carousel: HTMLDivElement, delta: number) => {
        if (delta) {
            scrollSmoothHorizontally(carousel, delta);
        }
    }, []);

    /** Выравнивание шага в карусели. */
    const alignStep = useCallback(
        (carousel: HTMLDivElement, step: HTMLLIElement) => {
            const { left: carouselLeft, right: carouselRight, width: carouselWidth } = carousel.getBoundingClientRect();
            const { left: stepLeft, right: stepRight, width: stepWidth } = step.getBoundingClientRect();
            const carouselCenter = carouselLeft + carouselWidth / 2;
            const stepCenter = stepLeft + stepWidth / 2;

            if (window.matchMedia(`(max-width: ${EScreenWidth.SM_MAX})`).matches) {
                alignStepCenter(carousel, stepCenter - carouselCenter);
            } else if (carouselCenter > stepCenter) {
                alignStepLeft(carousel, step, stepLeft - carouselLeft, stepLeft);
            } else if (carouselCenter < stepCenter) {
                alignStepRight(carousel, step, stepRight - carouselRight, stepRight);
            }
        },
        [alignStepCenter, alignStepLeft, alignStepRight],
    );

    useEffect(() => {
        if (selectedStepId) {
            const { current: carousel } = carouselRef;
            const step = stepRefs.current[selectedStepId];

            if (carousel && step) {
                alignStep(carousel, step);
            }
        }
    }, [selectedStepId, alignStep]);

    return (
        <CarouselExtended
            className={clsx(styles.stepperCarousel, sizeToClassNameMap[size], className)}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={state.stepPrev}
            stepNext={state.stepNext}
            ref={carouselRef}
        >
            <StepperExtended selectedStepId={selectedStepId} size={size} {...restProps}>
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

Stepper.Step = StepperStep;
