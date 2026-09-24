import React, { useMemo, useState } from "react";
import { action } from "storybook/actions";
import {
    EComponentSize,
    EStepperStepIconType,
    EStepperStepType,
    IStepperStep,
    Stepper,
    StepperStepIcon,
} from "@sberbusiness/triplex-next";

export interface IPlaygroundProps {
    /** Размер компонента. */
    size: EComponentSize;
    /** Тип, которым помечен текущий шаг. */
    type: EStepperStepType;
    /** Количество шагов. */
    stepsCount: number;
    /** Иконки статуса на пройденных и текущем шагах. */
    withIcons: boolean;
    /** Ширина контейнера: чем она меньше, тем больше шагов уезжает за край. */
    containerWidth: number;
}

/** Иконка статуса шага: пройденный — галочка, текущий — тип шага, непройденный — без иконки. */
const getStepIcon = (index: number, selectedIndex: number, type: EStepperStepType): React.ReactNode => {
    if (index < selectedIndex) {
        return <StepperStepIcon type={EStepperStepIconType.SUCCESS} />;
    }

    if (index > selectedIndex) {
        return undefined;
    }

    if (type === EStepperStepType.ERROR) {
        return <StepperStepIcon type={EStepperStepIconType.ERROR} />;
    }

    if (type === EStepperStepType.WARNING) {
        return <StepperStepIcon type={EStepperStepIconType.WARNING} />;
    }

    return <StepperStepIcon type={EStepperStepIconType.WAIT} />;
};

export const Playground = ({ size, type, stepsCount, withIcons, containerWidth }: IPlaygroundProps) => {
    const [selectedStepId, setSelectedStepId] = useState("step2");
    const selectedIndex = Math.max(
        0,
        Array.from({ length: stepsCount }, (_, index) => `step${index + 1}`).indexOf(selectedStepId),
    );

    const steps = useMemo<Array<IStepperStep>>(
        () =>
            Array.from({ length: stepsCount }, (_, index) => ({
                id: `step${index + 1}`,
                label: `Step ${index + 1}`,
                type: index === selectedIndex ? type : EStepperStepType.NEUTRAL,
                icon: withIcons ? getStepIcon(index, selectedIndex, type) : undefined,
            })),
        [stepsCount, selectedIndex, type, withIcons],
    );

    const handleSelectStep = (id: string) => {
        action("onSelectStep")(id);
        setSelectedStepId(id);
    };

    return (
        <div style={{ width: `${containerWidth}px`, maxWidth: "100%" }}>
            <Stepper steps={steps} size={size} selectedStepId={selectedStepId} onSelectStep={handleSelectStep} />
        </div>
    );
};
