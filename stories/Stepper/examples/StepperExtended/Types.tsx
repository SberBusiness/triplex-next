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
];

const TYPE_TO_ICON_TYPE_MAP: Record<EStepperStepType, EStepperStepIconType> = {
    [EStepperStepType.NEUTRAL]: EStepperStepIconType.SUCCESS,
    [EStepperStepType.ERROR]: EStepperStepIconType.ERROR,
    [EStepperStepType.WARNING]: EStepperStepIconType.WARNING,
};

interface ITypeItemProps {
    type: EStepperStepType;
}

const TypeItem = ({ type }: ITypeItemProps) => {
    const [selectedStepId, setSelectedStepId] = useState("documents");
    const selectedIndex = STEPS.findIndex((step) => step.id === selectedStepId);

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{type.toUpperCase()}</div>
            <StepperExtended size={EComponentSize.MD} selectedStepId={selectedStepId} onSelectStep={setSelectedStepId}>
                {STEPS.map(({ id, label }, index) => (
                    <StepperExtended.Step
                        key={id}
                        id={id}
                        type={type}
                        isInActiveStep={index > selectedIndex}
                        icon={<StepperStepIcon type={TYPE_TO_ICON_TYPE_MAP[type]} />}
                    >
                        {label}
                    </StepperExtended.Step>
                ))}
            </StepperExtended>
        </div>
    );
};

const TYPES = Object.values(EStepperStepType);

export const Types = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {TYPES.map((type) => (
            <TypeItem key={type} type={type} />
        ))}
    </div>
);
