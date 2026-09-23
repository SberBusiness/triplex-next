import React from "react";
import {
    StepperExtended,
    StepperStepIcon,
    EComponentSize,
    EStepperStepIconType,
    EStepperStepType,
} from "@sberbusiness/triplex-next";

const TYPE_TO_ICON_TYPE_MAP: Record<EStepperStepType, EStepperStepIconType> = {
    [EStepperStepType.NEUTRAL]: EStepperStepIconType.FILLED,
    [EStepperStepType.ERROR]: EStepperStepIconType.ERROR,
    [EStepperStepType.WARNING]: EStepperStepIconType.WARNING,
};

interface IStepperSampleProps {
    size: EComponentSize;
    type: EStepperStepType;
}

/** Степпер со всеми состояниями шага сразу: пройденный, недоступный, выбранный и непройденный. */
const StepperSample = ({ size, type }: IStepperSampleProps) => (
    <div>
        <div style={{ marginBottom: 8, fontSize: 14, fontWeight: 700 }}>
            {size.toUpperCase()} / {type.toUpperCase()}
        </div>
        <StepperExtended size={size} selectedStepId="selected" onSelectStep={() => {}}>
            <StepperExtended.Step id="passed" type={type} icon={<StepperStepIcon type={TYPE_TO_ICON_TYPE_MAP[type]} />}>
                Passed
            </StepperExtended.Step>
            <StepperExtended.Step id="disabled" type={type} disabled>
                Disabled
            </StepperExtended.Step>
            <StepperExtended.Step id="selected" type={type} icon={<StepperStepIcon type={EStepperStepIconType.WAIT} />}>
                Selected
            </StepperExtended.Step>
            <StepperExtended.Step id="not-passed" type={type} isInActiveStep>
                Not passed
            </StepperExtended.Step>
        </StepperExtended>
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <StepperSample size={EComponentSize.SM} type={EStepperStepType.NEUTRAL} />
        <StepperSample size={EComponentSize.MD} type={EStepperStepType.NEUTRAL} />
        <StepperSample size={EComponentSize.LG} type={EStepperStepType.NEUTRAL} />
        <StepperSample size={EComponentSize.MD} type={EStepperStepType.ERROR} />
        <StepperSample size={EComponentSize.MD} type={EStepperStepType.WARNING} />
    </div>
);
