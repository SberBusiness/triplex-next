import React, { useState } from "react";
import {
    StepperExtended,
    StepperStepIcon,
    EComponentSize,
    EStepperStepIconType,
    EStepperStepType,
} from "@sberbusiness/triplex-next";

const STEPS = [
    { id: "application", label: "Application" },
    { id: "documents", label: "Documents" },
    { id: "signing", label: "Signing" },
    { id: "result", label: "Result" },
];

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [selectedStepId, setSelectedStepId] = useState("documents");
    const selectedIndex = STEPS.findIndex((step) => step.id === selectedStepId);

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
            <StepperExtended size={size} selectedStepId={selectedStepId} onSelectStep={setSelectedStepId}>
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
        </div>
    );
};

const SIZES = Object.values(EComponentSize);

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
