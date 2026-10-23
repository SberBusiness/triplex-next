import React, { useState } from "react";
import {
    EStepperStepIconType,
    EStepperStepType,
    IStepperStep,
    Stepper,
    StepperStepIcon,
} from "@sberbusiness/triplex-next";

/** Набор шагов, в котором второй шаг помечен переданным типом. */
const getSteps = (type: EStepperStepType, iconType: EStepperStepIconType): Array<IStepperStep> => [
    {
        id: "step1",
        label: "Step 1",
        type: EStepperStepType.NEUTRAL,
        icon: <StepperStepIcon type={EStepperStepIconType.SUCCESS} />,
    },
    {
        id: "step2",
        label: "Step 2",
        type,
        icon: <StepperStepIcon type={iconType} />,
    },
    {
        id: "step3",
        label: "Step 3",
        type: EStepperStepType.NEUTRAL,
    },
];

interface ITypeItemProps {
    caption: string;
    type: EStepperStepType;
    iconType: EStepperStepIconType;
}

const TypeItem = ({ caption, type, iconType }: ITypeItemProps) => {
    const [selectedStepId, setSelectedStepId] = useState("step2");

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{caption}</div>
            <Stepper
                steps={getSteps(type, iconType)}
                selectedStepId={selectedStepId}
                onSelectStep={setSelectedStepId}
            />
        </div>
    );
};

export const Types = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <TypeItem caption="NEUTRAL" type={EStepperStepType.NEUTRAL} iconType={EStepperStepIconType.WAIT} />
        <TypeItem caption="ERROR" type={EStepperStepType.ERROR} iconType={EStepperStepIconType.ERROR} />
        <TypeItem caption="WARNING" type={EStepperStepType.WARNING} iconType={EStepperStepIconType.WARNING} />
    </div>
);
