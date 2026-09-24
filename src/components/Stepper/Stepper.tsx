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

/** Направление прокрутки ленты шагов. */
type TStepperScrollDirection = "prev" | "next";

/** Соответствие размера имени класса. */
const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Доля ширины видимой области ленты, на которую прокручивает один клик по кнопке. */
const SCROLL_STEP_RATIO = 0.3;

/** Соответствие направления прокрутки имени класса. */
const DIRECTION_TO_CLASS_NAME_MAP: Record<TStepperScrollDirection, string> = {
    prev: styles.prev,
    next: styles.next,
};

/** Соответствие направления прокрутки иконке кнопки. */
const DIRECTION_TO_ICON_MAP: Record<TStepperScrollDirection, React.ReactNode> = {
    prev: <CaretleftStrokeSrvIcon24 paletteIndex={5} />,
    next: <CaretrightStrokeSrvIcon24 paletteIndex={5} />,
};

/** Свойства кнопки прокрутки ленты шагов. */
interface IStepperScrollButtonProps extends ICarouselExtendedButtonProvideProps {
    /** Направление прокрутки. */
    direction: TStepperScrollDirection;
    /** Размер Stepper — от него зависит размер кнопки. */
    size: EComponentSize;
}

/**
 * Кнопка прокрутки ленты шагов. Рендерится по запросу CarouselExtended, который передаёт
 * `hidden` (прокрутка не нужна), `disabled` (достигнут край) и `onClick`.
 * Из таб-порядка исключена (`tabIndex = -1`): до любого шага можно дойти клавиатурой и без неё.
 */
const StepperScrollButton = ({ direction, size, hidden, ...restButtonProps }: IStepperScrollButtonProps) =>
    hidden ? null : (
        <div className={clsx(styles.stepperButtonWrapper, DIRECTION_TO_CLASS_NAME_MAP[direction])}>
            <ButtonIcon
                className={clsx(styles.stepperButton, sizeToClassNameMap[size])}
                tabIndex={-1}
                {...restButtonProps}
            >
                {DIRECTION_TO_ICON_MAP[direction]}
            </ButtonIcon>
        </div>
    );

/**
 * Прокручивает ленту так, чтобы шаг прижался к правому краю видимой области.
 * Если справа есть следующий шаг, лента подтягивается ещё и на него — подсказка, что лента не кончилась.
 */
const alignStepRight = (carousel: HTMLDivElement, step: HTMLLIElement, delta: number, stepRight: number): void => {
    if (delta <= 0) {
        return;
    }

    const nextStep = step.nextElementSibling;
    // Текущий шаг – не последний, необходимо показать следующий шаг.
    const scrollAmount = nextStep ? delta - (stepRight - nextStep.getBoundingClientRect().right) : delta;

    scrollSmoothHorizontally(carousel, Math.ceil(scrollAmount));
};

/**
 * Прокручивает ленту так, чтобы шаг прижался к левому краю видимой области.
 * Если слева есть предыдущий шаг, лента подтягивается ещё и на него — подсказка, что лента не кончилась.
 */
const alignStepLeft = (carousel: HTMLDivElement, step: HTMLLIElement, delta: number, stepLeft: number): void => {
    if (delta >= 0) {
        return;
    }

    const prevStep = step.previousElementSibling;
    // Текущий шаг – не первый, необходимо показать предыдущий шаг.
    const scrollAmount = prevStep ? delta - (stepLeft - prevStep.getBoundingClientRect().left) : delta;

    scrollSmoothHorizontally(carousel, Math.floor(scrollAmount));
};

/** Прокручивает ленту так, чтобы шаг встал по центру видимой области. */
const alignStepCenter = (carousel: HTMLDivElement, delta: number): void => {
    if (delta) {
        scrollSmoothHorizontally(carousel, delta);
    }
};

/**
 * Подводит выбранный шаг в видимую область ленты.
 * На узких экранах шаг центрируется, на широких — прижимается к ближайшему краю.
 */
const alignStep = (carousel: HTMLDivElement, step: HTMLLIElement): void => {
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
};

/** Компонент Stepper, список шагов */
export const Stepper: React.FC<IStepperProps> & IStepperComposition = ({
    className,
    steps,
    size = EComponentSize.LG,
    selectedStepId,
    ...restProps
}) => {
    const [scrollStep, setScrollStep] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<Record<string, HTMLLIElement | null>>({});
    const selectedIndex = steps.findIndex((step) => step.id === selectedStepId);

    const renderPrevButton = useCallback(
        (buttonProps: ICarouselExtendedButtonProvideProps) => (
            <StepperScrollButton {...buttonProps} direction="prev" size={size} />
        ),
        [size],
    );

    const renderNextButton = useCallback(
        (buttonProps: ICarouselExtendedButtonProvideProps) => (
            <StepperScrollButton {...buttonProps} direction="next" size={size} />
        ),
        [size],
    );

    useEffect(() => {
        const carouselNode = carouselRef.current;

        if (carouselNode === null) {
            return;
        }

        const resizeObserver = new ResizeObserver((entries) => {
            setScrollStep(entries[0].contentRect.width * SCROLL_STEP_RATIO);
        });

        resizeObserver.observe(carouselNode);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!selectedStepId) {
            return;
        }

        const carousel = carouselRef.current;
        const step = stepRefs.current[selectedStepId];

        if (carousel && step) {
            alignStep(carousel, step);
        }
    }, [selectedStepId]);

    /** Запоминает узел шага, чтобы подвести его в видимую область при выборе. */
    const setStepRef = (id: string) => (instance: HTMLLIElement | null) => {
        if (instance === null) {
            delete stepRefs.current[id];
        } else {
            stepRefs.current[id] = instance;
        }
    };

    return (
        <CarouselExtended
            className={clsx(styles.stepperCarousel, sizeToClassNameMap[size], className)}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={scrollStep}
            stepNext={scrollStep}
            ref={carouselRef}
        >
            <StepperExtended selectedStepId={selectedStepId} size={size} {...restProps}>
                {steps.map(({ label, ...step }, index) => (
                    <StepperExtended.Step
                        key={step.id}
                        forwardedRef={setStepRef(step.id)}
                        {...step}
                        isInActiveStep={index > selectedIndex}
                    >
                        {label}
                    </StepperExtended.Step>
                ))}
            </StepperExtended>
        </CarouselExtended>
    );
};

Stepper.Step = StepperStep;
