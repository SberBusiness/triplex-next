import React, { useState } from "react";
import {
    EStepperStepIconType,
    EStepperStepType,
    IStepperStep,
    Stepper,
    StepperStepIcon,
} from "@sberbusiness/triplex-next";

const STEPS: Array<IStepperStep> = Array.from({ length: 15 }, (_, index) => ({
    id: `step${index + 1}`,
    label: `Step ${index + 1}`,
    type: EStepperStepType.NEUTRAL,
    icon: index < 4 ? <StepperStepIcon type={EStepperStepIconType.SUCCESS} /> : undefined,
}));

export const ManySteps = () => {
    const [selectedStepId, setSelectedStepId] = useState("step2");

    return (
        // Контейнер уже ленты шагов: лишние шаги уезжают за край и прокручиваются.
        // Кнопки прокрутки появляются по наведению на ленту и скрыты на узких экранах.
        <div style={{ maxWidth: "480px" }}>
            <Stepper steps={STEPS} selectedStepId={selectedStepId} onSelectStep={setSelectedStepId} />
        </div>
    );
};
