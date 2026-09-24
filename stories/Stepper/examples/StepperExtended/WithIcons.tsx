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

const STEPS = [
    { id: "filled", label: "Filled", iconType: EStepperStepIconType.FILLED },
    { id: "success", label: "Success", iconType: EStepperStepIconType.SUCCESS },
    { id: "wait", label: "Wait", iconType: EStepperStepIconType.WAIT },
    { id: "warning", label: "Warning", iconType: EStepperStepIconType.WARNING },
    { id: "error", label: "Error", iconType: EStepperStepIconType.ERROR },
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

export const WithIcons = () => {
    const [selectedStepId, setSelectedStepId] = useState("wait");

    return (
        <CarouselExtended
            style={{ display: "flex", alignItems: "center", maxWidth: "640px" }}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={SCROLL_STEP}
            stepNext={SCROLL_STEP}
        >
            <StepperExtended size={EComponentSize.MD} selectedStepId={selectedStepId} onSelectStep={setSelectedStepId}>
                {STEPS.map(({ id, label, iconType }) => (
                    <StepperExtended.Step
                        key={id}
                        id={id}
                        type={EStepperStepType.NEUTRAL}
                        icon={<StepperStepIcon type={iconType} />}
                    >
                        {label}
                    </StepperExtended.Step>
                ))}
            </StepperExtended>
        </CarouselExtended>
    );
};
