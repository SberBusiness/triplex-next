import React, { useState } from "react";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import {
    ButtonIcon,
    CarouselExtended,
    ICarouselExtendedButtonProvideProps,
    StepperExtended,
    EStepperStepType,
} from "@sberbusiness/triplex-next";

const STEPS = [
    { id: "step-1", label: "Step 1" },
    { id: "step-2", label: "Step 2" },
    { id: "step-3", label: "Step 3" },
    { id: "step-4", label: "Step 4" },
];

/** Величина прокрутки за один клик по кнопке. */
const SCROLL_STEP = 200;

/** Пока прокрутка не нужна, компонент передаёт hidden: кнопка не рендерится. */
const renderPrevButton = ({ hidden, ...buttonProps }: ICarouselExtendedButtonProvideProps) =>
    hidden ? null : (
        <ButtonIcon aria-label="Прокрутить назад" {...buttonProps}>
            <CaretleftStrokeSrvIcon24 paletteIndex={5} />
        </ButtonIcon>
    );

const renderNextButton = ({ hidden, ...buttonProps }: ICarouselExtendedButtonProvideProps) =>
    hidden ? null : (
        <ButtonIcon aria-label="Прокрутить вперёд" {...buttonProps}>
            <CaretrightStrokeSrvIcon24 paletteIndex={5} />
        </ButtonIcon>
    );

export const Default = () => {
    const [selectedStepId, setSelectedStepId] = useState("step-3");
    const selectedIndex = STEPS.findIndex((step) => step.id === selectedStepId);

    return (
        <CarouselExtended
            style={{ display: "flex", alignItems: "center", maxWidth: "640px" }}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={SCROLL_STEP}
            stepNext={SCROLL_STEP}
        >
            <StepperExtended selectedStepId={selectedStepId} onSelectStep={setSelectedStepId}>
                {STEPS.map(({ id, label }, index) => (
                    <StepperExtended.Step
                        key={id}
                        id={id}
                        type={EStepperStepType.NEUTRAL}
                        // Шаги правее выбранного ещё не пройдены.
                        isInActiveStep={index > selectedIndex}
                    >
                        {label}
                    </StepperExtended.Step>
                ))}
            </StepperExtended>
        </CarouselExtended>
    );
};
