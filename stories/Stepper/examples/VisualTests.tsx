import React from "react";
import {
    EComponentSize,
    EStepperStepIconType,
    EStepperStepType,
    IStepperStep,
    Stepper,
    StepperStepIcon,
} from "@sberbusiness/triplex-next";

/** Пройденный, текущий и непройденный шаг — три состояния в одной ленте. */
const NEUTRAL_STEPS: Array<IStepperStep> = [
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
        icon: <StepperStepIcon type={EStepperStepIconType.WAIT} />,
    },
    {
        id: "step3",
        label: "Step 3",
        type: EStepperStepType.NEUTRAL,
    },
];

const DISABLED_STEPS: Array<IStepperStep> = [
    { id: "step1", label: "Step 1", type: EStepperStepType.NEUTRAL },
    { id: "step2", label: "Step 2", type: EStepperStepType.NEUTRAL },
    { id: "step3", label: "Step 3", type: EStepperStepType.NEUTRAL, disabled: true },
];

/** Второй шаг — текущий и помечен типом, первый — пройденный с тем же типом. */
const getTypedSteps = (type: EStepperStepType, iconType: EStepperStepIconType): Array<IStepperStep> => [
    { id: "step1", label: "Step 1", type, icon: <StepperStepIcon type={iconType} /> },
    { id: "step2", label: "Step 2", type, icon: <StepperStepIcon type={iconType} /> },
    { id: "step3", label: "Step 3", type: EStepperStepType.NEUTRAL },
];

const ICON_STEPS: Array<IStepperStep> = [
    {
        id: "step1",
        label: "FILLED",
        type: EStepperStepType.NEUTRAL,
        icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
    },
    {
        id: "step2",
        label: "SUCCESS",
        type: EStepperStepType.NEUTRAL,
        icon: <StepperStepIcon type={EStepperStepIconType.SUCCESS} />,
    },
    {
        id: "step3",
        label: "WAIT",
        type: EStepperStepType.NEUTRAL,
        icon: <StepperStepIcon type={EStepperStepIconType.WAIT} />,
    },
];

/** Лента, которая заведомо не помещается в контейнер фиксированной ширины. */
const OVERFLOW_STEPS: Array<IStepperStep> = Array.from({ length: 12 }, (_, index) => ({
    id: `step${index + 1}`,
    label: `Step ${index + 1}`,
    type: EStepperStepType.NEUTRAL,
}));

/** Ширина контейнера, при которой часть шагов уезжает за край. Фиксирована, чтобы скриншоты не зависели от viewport. */
const OVERFLOW_CONTAINER_WIDTH = "480px";

interface IVariantProps {
    caption: string;
    steps: Array<IStepperStep>;
    size?: EComponentSize;
}

/** Статичная лента: выбран второй шаг, состояние не меняется. */
const Variant = ({ caption, steps, size = EComponentSize.MD }: IVariantProps) => (
    <div>
        <div style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "700" }}>{caption}</div>
        <Stepper steps={steps} size={size} selectedStepId="step2" onSelectStep={() => {}} />
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "24px" }}>
        <Variant caption="SM" steps={NEUTRAL_STEPS} size={EComponentSize.SM} />
        <Variant caption="MD" steps={NEUTRAL_STEPS} />
        <Variant caption="LG" steps={NEUTRAL_STEPS} size={EComponentSize.LG} />
        <Variant caption="Отключённый шаг" steps={DISABLED_STEPS} />
        <Variant
            caption="ERROR"
            steps={getTypedSteps(EStepperStepType.ERROR, EStepperStepIconType.ERROR)}
            size={EComponentSize.SM}
        />
        <Variant
            caption="WARNING"
            steps={getTypedSteps(EStepperStepType.WARNING, EStepperStepIconType.WARNING)}
            size={EComponentSize.SM}
        />
        <Variant caption="Иконки шагов" steps={ICON_STEPS} size={EComponentSize.SM} />
        <div>
            <div style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "700" }}>
                Шаги не помещаются в контейнер
            </div>
            <div style={{ width: OVERFLOW_CONTAINER_WIDTH }}>
                <Stepper
                    steps={OVERFLOW_STEPS}
                    size={EComponentSize.SM}
                    selectedStepId="step2"
                    onSelectStep={() => {}}
                />
            </div>
        </div>
    </div>
);
