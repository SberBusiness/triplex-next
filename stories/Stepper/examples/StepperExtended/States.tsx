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

export const States = () => {
    const [selectedStepId, setSelectedStepId] = useState("signing");

    return (
        <CarouselExtended
            style={{ display: "flex", alignItems: "center", maxWidth: "640px" }}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={SCROLL_STEP}
            stepNext={SCROLL_STEP}
        >
            <StepperExtended size={EComponentSize.MD} selectedStepId={selectedStepId} onSelectStep={setSelectedStepId}>
                {/* Пройденный шаг: выбран не он и isInActiveStep не выставлен. */}
                <StepperExtended.Step
                    id="application"
                    type={EStepperStepType.NEUTRAL}
                    icon={<StepperStepIcon type={EStepperStepIconType.FILLED} />}
                >
                    Passed
                </StepperExtended.Step>
                {/* Недоступный шаг: клики и фокус с клавиатуры заблокированы. */}
                <StepperExtended.Step id="documents" type={EStepperStepType.NEUTRAL} disabled>
                    Disabled
                </StepperExtended.Step>
                {/* Текущий шаг: его id передан в selectedStepId. */}
                <StepperExtended.Step
                    id="signing"
                    type={EStepperStepType.NEUTRAL}
                    icon={<StepperStepIcon type={EStepperStepIconType.WAIT} />}
                >
                    Selected
                </StepperExtended.Step>
                {/* Ещё не пройденный шаг. */}
                <StepperExtended.Step id="result" type={EStepperStepType.NEUTRAL} isInActiveStep>
                    Not passed
                </StepperExtended.Step>
            </StepperExtended>
        </CarouselExtended>
    );
};
