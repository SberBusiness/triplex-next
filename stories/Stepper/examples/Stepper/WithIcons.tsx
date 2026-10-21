import React, { useState } from "react";
import { EStepperStepIconType, EStepperStepType, Stepper, StepperStepIcon } from "@sberbusiness/triplex-next";

const STEPS = [
    {
        id: "step1",
        label: "FILLED",
        type: EStepperStepType.NEUTRAL,
        icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
    },
    {
        id: "step2",
        label: "SUCCESS",
        type: EStepperStepType.NEUTRAL,
        icon: <StepperStepIcon type={EStepperStepIconType.SUCCESS} />,
    },
    {
        id: "step3",
        label: "WAIT",
        type: EStepperStepType.NEUTRAL,
        icon: <StepperStepIcon type={EStepperStepIconType.WAIT} />,
    },
    {
        id: "step4",
        label: "ERROR",
        type: EStepperStepType.ERROR,
        icon: <StepperStepIcon type={EStepperStepIconType.ERROR} />,
    },
    {
        id: "step5",
        label: "WARNING",
        type: EStepperStepType.WARNING,
        icon: <StepperStepIcon type={EStepperStepIconType.WARNING} />,
    },
];

export const WithIcons = () => {
    const [selectedStepId, setSelectedStepId] = useState("step3");

    return <Stepper steps={STEPS} selectedStepId={selectedStepId} onSelectStep={setSelectedStepId} />;
};
