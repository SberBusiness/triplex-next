import React from "react";
import {
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
    { id: "application", label: "Application" },
    { id: "documents", label: "Documents" },
    { id: "signing", label: "Signing" },
    { id: "result", label: "Result" },
];

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
        <StepperExtended size={size} selectedStepId={selectedStepId} onSelectStep={handleSelectStep}>
            {STEPS.map(({ id, label }, index) => (
                <StepperExtended.Step
                    key={id}
                    id={id}
                    type={EStepperStepType.NEUTRAL}
                    isInActiveStep={index > selectedIndex}
                    disabled={withDisabledStep && id === "documents"}
                    icon={
                        withIcons ? (
                            <StepperStepIcon
                                type={index < selectedIndex ? EStepperStepIconType.FILLED : EStepperStepIconType.WAIT}
                            />
                        ) : undefined
                    }
                >
                    {label}
                </StepperExtended.Step>
            ))}
        </StepperExtended>
    );
};
