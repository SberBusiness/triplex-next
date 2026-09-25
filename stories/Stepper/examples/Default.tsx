import React, { useState } from "react";
import { EStepperStepIconType, EStepperStepType, Stepper, StepperStepIcon } from "@sberbusiness/triplex-next";

const STEPS = [
    {
        id: "step1",
        label: "Step 1",
        type: EStepperStepType.NEUTRAL,
        icon: <StepperStepIcon type={EStepperStepIconType.SUCCESS} />,
    },
    {
        id: "step2",
        label: "Step 2",
        type: EStepperStepType.NEUTRAL,
    },
    {
        id: "step3",
        label: "Step 3",
        type: EStepperStepType.NEUTRAL,
    },
];

export const Default = () => {
    const [selectedStepId, setSelectedStepId] = useState("step2");

    return <Stepper steps={STEPS} selectedStepId={selectedStepId} onSelectStep={setSelectedStepId} />;
};
