import React, { useState } from "react";
import {
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

export const WithIcons = () => {
    const [selectedStepId, setSelectedStepId] = useState("wait");

    return (
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
    );
};
