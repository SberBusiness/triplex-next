import React, { useState } from "react";
import { StepperExtended, StepperStepIcon, EStepperStepIconType, EStepperStepType } from "@sberbusiness/triplex-next";

const STEPS = [
    { id: "application", label: "Application" },
    { id: "documents", label: "Documents" },
    { id: "signing", label: "Signing" },
    { id: "result", label: "Result" },
];

export const Default = () => {
    const [selectedStepId, setSelectedStepId] = useState("signing");
    const selectedIndex = STEPS.findIndex((step) => step.id === selectedStepId);

    return (
        <StepperExtended selectedStepId={selectedStepId} onSelectStep={setSelectedStepId}>
            {STEPS.map(({ id, label }, index) => (
                <StepperExtended.Step
                    key={id}
                    id={id}
                    type={EStepperStepType.NEUTRAL}
                    // Шаги правее выбранного ещё не пройдены.
                    isInActiveStep={index > selectedIndex}
                    icon={index < selectedIndex ? <StepperStepIcon type={EStepperStepIconType.FILLED} /> : undefined}
                >
                    {label}
                </StepperExtended.Step>
            ))}
        </StepperExtended>
    );
};
