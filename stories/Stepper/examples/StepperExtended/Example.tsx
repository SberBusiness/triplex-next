import React, { useState } from "react";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import {
    ButtonIcon,
    CarouselExtended,
    ICarouselExtendedButtonProvideProps,
    StepperExtended,
    StepperStepIcon,
    EComponentSize,
    EStepperStepIconType,
    EStepperStepType,
} from "@sberbusiness/triplex-next";

const STEPS = Array.from({ length: 12 }, (item, index) => ({
    id: `step-${index}`,
    label: `Step ${index + 1}`,
}));

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

export const Example = () => {
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
            <StepperExtended size={EComponentSize.MD} selectedStepId={selectedStepId} onSelectStep={setSelectedStepId}>
                {STEPS.map(({ id, label }, index) => (
                    <StepperExtended.Step
                        key={id}
                        id={id}
                        type={EStepperStepType.NEUTRAL}
                        isInActiveStep={index > selectedIndex}
                        icon={
                            index < selectedIndex ? <StepperStepIcon type={EStepperStepIconType.FILLED} /> : undefined
                        }
                    >
                        {label}
                    </StepperExtended.Step>
                ))}
            </StepperExtended>
        </CarouselExtended>
    );
};
