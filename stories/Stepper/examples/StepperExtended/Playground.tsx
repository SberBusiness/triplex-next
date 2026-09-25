import React from "react";
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
import { action } from "storybook/actions";
import { useArgs } from "storybook/preview-api";

export interface PlaygroundArgs {
    size: EComponentSize;
    selectedStepId: string;
    withIcons: boolean;
    withDisabledStep: boolean;
}

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

export const Playground = ({ size, selectedStepId, withIcons, withDisabledStep }: PlaygroundArgs) => {
    // Привязка к Storybook controls: и Controls panel, и клик по шагу обновляют один и тот же arg,
    // поэтому состояние не дублируется в локальном useState.
    const [, updateArgs] = useArgs<PlaygroundArgs>();
    const selectedIndex = STEPS.findIndex((step) => step.id === selectedStepId);

    const handleSelectStep = (id: string) => {
        action("onSelectStep")(id);
        updateArgs({ selectedStepId: id });
    };

    return (
        <CarouselExtended
            style={{ display: "flex", alignItems: "center", maxWidth: "640px" }}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={SCROLL_STEP}
            stepNext={SCROLL_STEP}
        >
            <StepperExtended size={size} selectedStepId={selectedStepId} onSelectStep={handleSelectStep}>
                {STEPS.map(({ id, label }, index) => (
                    <StepperExtended.Step
                        key={id}
                        id={id}
                        type={EStepperStepType.NEUTRAL}
                        isInActiveStep={index > selectedIndex}
                        disabled={withDisabledStep && id === "step-2"}
                        icon={
                            withIcons ? (
                                <StepperStepIcon
                                    type={
                                        index < selectedIndex ? EStepperStepIconType.FILLED : EStepperStepIconType.WAIT
                                    }
                                />
                            ) : undefined
                        }
                    >
                        {label}
                    </StepperExtended.Step>
                ))}
            </StepperExtended>
        </CarouselExtended>
    );
};
