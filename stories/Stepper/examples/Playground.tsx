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
    const [selectedIndexState, setSelectedIndexState] = useState(1);
    // Контрол stepsCount может опустить число шагов ниже выбранного — выбор съезжает на последний доступный,
    // иначе выбранного шага не окажется в ленте и Stepper пометит непройденными все шаги сразу.
    const selectedIndex = Math.min(selectedIndexState, stepsCount - 1);
    const selectedStepId = `step${selectedIndex + 1}`;

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
        setSelectedIndexState(Number(id.replace("step", "")) - 1);
    };

    return (
        <div style={{ width: `${containerWidth}px`, maxWidth: "100%" }}>
            <Stepper steps={steps} size={size} selectedStepId={selectedStepId} onSelectStep={handleSelectStep} />
        </div>
    );
};
