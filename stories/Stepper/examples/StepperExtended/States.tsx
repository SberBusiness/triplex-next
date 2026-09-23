import React, { useState } from "react";
import {
    StepperExtended,
    StepperStepIcon,
    EComponentSize,
    EStepperStepIconType,
    EStepperStepType,
} from "@sberbusiness/triplex-next";

export const States = () => {
    const [selectedStepId, setSelectedStepId] = useState("signing");

    return (
        <StepperExtended size={EComponentSize.MD} selectedStepId={selectedStepId} onSelectStep={setSelectedStepId}>
            {/* Пройденный шаг: выбран не он и isInActiveStep не выставлен. */}
            <StepperExtended.Step
                id="application"
                type={EStepperStepType.NEUTRAL}
                icon={<StepperStepIcon type={EStepperStepIconType.FILLED} />}
            >
                Passed
            </StepperExtended.Step>
            {/* Недоступный шаг: клики и фокус с клавиатуры заблокированы. */}
            <StepperExtended.Step id="documents" type={EStepperStepType.NEUTRAL} disabled>
                Disabled
            </StepperExtended.Step>
            {/* Текущий шаг: его id передан в selectedStepId. */}
            <StepperExtended.Step
                id="signing"
                type={EStepperStepType.NEUTRAL}
                icon={<StepperStepIcon type={EStepperStepIconType.WAIT} />}
            >
                Selected
            </StepperExtended.Step>
            {/* Ещё не пройденный шаг. */}
            <StepperExtended.Step id="result" type={EStepperStepType.NEUTRAL} isInActiveStep>
                Not passed
            </StepperExtended.Step>
        </StepperExtended>
    );
};
