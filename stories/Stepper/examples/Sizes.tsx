import React, { useState } from "react";
import {
    EComponentSize,
    EStepperStepIconType,
    EStepperStepType,
    Stepper,
    StepperStepIcon,
} from "@sberbusiness/triplex-next";

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
    {
        id: "step4",
        label: "Step 4",
        type: EStepperStepType.NEUTRAL,
        disabled: true,
    },
];

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [selectedStepId, setSelectedStepId] = useState("step2");

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <Stepper steps={STEPS} size={size} selectedStepId={selectedStepId} onSelectStep={setSelectedStepId} />
        </div>
    );
};

const SIZES = Object.values(EComponentSize);

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
