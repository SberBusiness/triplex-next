import React, { useEffect, useState } from "react";
import { Stepper, StepperExtended } from "../../src/components/Stepper";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { EStepperSize, EStepperStepIconType, EStepperStepType } from "../../src/components/Stepper/enums";
import { StepperStepIcon } from "../../src/components/Stepper/StepperStepIcon";
import { ButtonIcon } from "../../src/components/Button/ButtonIcon";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import {
    CarouselExtended,
    ICarouselExtendedButtonProvideProps,
} from "../../src/components/CarouselExtended/CarouselExtended";
import "./Stepper.less";

export default {
    title: "Components/Stepper",
    component: Stepper,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент Stepper для отображения последовательности шагов с возможностью навигации.

## Особенности

- **Навигация**: Поддержка горизонтальной прокрутки с кнопками навигации
- **Адаптивность**: Автоматическое выравнивание шагов на разных экранах
- **Доступность**: Поддержка ARIA атрибутов и клавиатурной навигации
- **Карусель**: Интегрированная карусель для удобной навигации по шагам

## Использование

Компонент принимает массив шагов и автоматически создает интерактивную навигацию.
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof Stepper> = {
    args: {
        steps: [
            {
                id: "step1",
                label: "Completed",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
            },
            {
                id: "step2",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
            },
            {
                id: "step3",
                label: "Success",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.SUCCESS} />,
            },
            {
                id: "step4",
                label: "Available",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
            },
        ],
        size: EStepperSize.MD,
        selectedStepId: "step3",
        onSelectStep: action("On Select Step"),
    },
    argTypes: {
        steps: {
            control: { type: "object" },
            description: "Массив шагов для отображения",
            table: {
                type: { summary: "Array<IStepperStep>" },
            },
        },
        size: {
            control: { type: "select" },
            options: [EStepperSize.SM, EStepperSize.MD, EStepperSize.LG],
            description: "Размер степпера",
            table: {
                type: { summary: "EStepperSize" },
                defaultValue: { summary: "EStepperSize.MD" },
            },
        },
        selectedStepId: {
            control: { type: "text" },
            description: "ID выбранного шага",
            table: {
                type: { summary: "string" },
            },
        },
        onSelectStep: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        const [selectedStepId, setSelectedStepId] = useState(args.selectedStepId);
        useEffect(() => {
            setSelectedStepId(args.selectedStepId);
        }, [args.selectedStepId]);
        const handleSelectStep = (id: string) => setSelectedStepId(id);

        return (
            <Stepper.Wrapper>
                <Stepper {...args} selectedStepId={selectedStepId} onSelectStep={handleSelectStep} />
            </Stepper.Wrapper>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация Stepper. Позволяет настраивать список шагов, размер, а также контролировать текущий выбранный шаг.",
            },
        },
    },
};

export const Sizes: StoryObj<typeof Stepper> = {
    name: "Sizes",
    render: () => {
        const [selectedStepIdSM, setSelectedStepIdSM] = useState("step3");
        const [selectedStepIdMD, setSelectedStepIdMD] = useState("step3");
        const [selectedStepIdLG, setSelectedStepIdLG] = useState("step3");

        const commonSteps = [
            {
                id: "step1",
                label: "Completed",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
            },
            {
                id: "step2",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
            },
            {
                id: "step3",
                label: "Completed",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.SUCCESS} />,
            },
            {
                id: "step4",
                label: "Available",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step5",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
        ];

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Small (SM)</h3>
                    <Stepper.Wrapper>
                        <Stepper
                            steps={commonSteps}
                            size={EStepperSize.SM}
                            selectedStepId={selectedStepIdSM}
                            onSelectStep={setSelectedStepIdSM}
                        />
                    </Stepper.Wrapper>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Medium (MD)</h3>
                    <Stepper.Wrapper>
                        <Stepper
                            steps={commonSteps}
                            size={EStepperSize.MD}
                            selectedStepId={selectedStepIdMD}
                            onSelectStep={setSelectedStepIdMD}
                        />
                    </Stepper.Wrapper>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Large (LG)</h3>
                    <Stepper.Wrapper>
                        <Stepper
                            steps={commonSteps}
                            size={EStepperSize.LG}
                            selectedStepId={selectedStepIdLG}
                            onSelectStep={setSelectedStepIdLG}
                        />
                    </Stepper.Wrapper>
                </div>
            </div>
        );
    },
};

export const Types: StoryObj<typeof Stepper> = {
    name: "Types",
    render: () => {
        const [selectedStepIdNeutral, setSelectedStepIdNeutral] = useState("step3");
        const [selectedStepIdError, setSelectedStepIdError] = useState("step3");
        const [selectedStepIdWarning, setSelectedStepIdWarning] = useState("step3");

        const neutralSteps = [
            {
                id: "step1",
                label: "Completed",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
            },
            {
                id: "step2",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
            },
            {
                id: "step3",
                label: "Completed",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.SUCCESS} />,
            },
            {
                id: "step4",
                label: "Available",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step5",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
        ];

        const errorSteps = [
            {
                id: "step1",
                label: "Completed",
                disabled: false,
                type: EStepperStepType.ERROR,
                icon: <StepperStepIcon type={EStepperStepIconType.ERROR} />,
            },
            {
                id: "step2",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.ERROR,
                icon: <StepperStepIcon type={EStepperStepIconType.ERROR} />,
            },
            {
                id: "step3",
                label: "Error",
                disabled: false,
                type: EStepperStepType.ERROR,
                icon: <StepperStepIcon type={EStepperStepIconType.ERROR} />,
            },
            {
                id: "step4",
                label: "Available",
                disabled: false,
                type: EStepperStepType.ERROR,
            },
            {
                id: "step5",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.ERROR,
            },
        ];

        const warningSteps = [
            {
                id: "step1",
                label: "Completed",
                disabled: false,
                type: EStepperStepType.WARNING,
                icon: <StepperStepIcon type={EStepperStepIconType.WARNING} />,
            },
            {
                id: "step2",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.WARNING,
                icon: <StepperStepIcon type={EStepperStepIconType.WARNING} />,
            },
            {
                id: "step3",
                label: "Warning",
                disabled: false,
                type: EStepperStepType.WARNING,
                icon: <StepperStepIcon type={EStepperStepIconType.WARNING} />,
            },
            {
                id: "step4",
                label: "Available",
                disabled: false,
                type: EStepperStepType.WARNING,
            },
            {
                id: "step5",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.WARNING,
            },
        ];

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Neutral</h3>
                    <Stepper.Wrapper>
                        <Stepper
                            steps={neutralSteps}
                            size={EStepperSize.MD}
                            selectedStepId={selectedStepIdNeutral}
                            onSelectStep={setSelectedStepIdNeutral}
                        />
                    </Stepper.Wrapper>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Error</h3>
                    <Stepper.Wrapper>
                        <Stepper
                            steps={errorSteps}
                            size={EStepperSize.MD}
                            selectedStepId={selectedStepIdError}
                            onSelectStep={setSelectedStepIdError}
                        />
                    </Stepper.Wrapper>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Warning</h3>
                    <Stepper.Wrapper>
                        <Stepper
                            steps={warningSteps}
                            size={EStepperSize.MD}
                            selectedStepId={selectedStepIdWarning}
                            onSelectStep={setSelectedStepIdWarning}
                        />
                    </Stepper.Wrapper>
                </div>
            </div>
        );
    },
};

export const ManySteps: StoryObj<typeof Stepper> = {
    name: "With many steps (overflow)",
    args: {
        steps: [
            {
                id: "step1",
                label: "Completed",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
            },
            {
                id: "step2",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
            },
            {
                id: "step3",
                label: "Completed",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.SUCCESS} />,
            },
            {
                id: "step4",
                label: "Available",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step5",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step6",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step7",
                label: "Available",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step8",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step9",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step10",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step11",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step12",
                label: "Available",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step13",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step14",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step15",
                label: "Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
        ],
        size: EStepperSize.MD,
        selectedStepId: "step3",
        onSelectStep: action("On Select Step"),
    },
    argTypes: {
        steps: {
            control: { type: "object" },
            description: "Массив шагов для отображения",
            table: {
                type: { summary: "Array<IStepperStep>" },
            },
        },
        selectedStepId: {
            control: { type: "text" },
            description: "ID выбранного шага",
            table: {
                type: { summary: "string" },
            },
        },
        onSelectStep: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        const [selectedStepId, setSelectedStepId] = useState(args.selectedStepId);
        return (
            <Stepper.Wrapper>
                <Stepper {...args} selectedStepId={selectedStepId} onSelectStep={setSelectedStepId} />
            </Stepper.Wrapper>
        );
    },
};

export const StepperExtendedType: StoryObj<typeof StepperExtended> = {
    name: "StepperExtended",
    args: {
        size: EStepperSize.SM,
        selectedStepId: "stepper-extended-step-2",
        onSelectStep: action("On Select Step"),
    },
    argTypes: {
        selectedStepId: {
            control: { type: "text" },
            description: "ID выбранного шага",
            table: {
                type: { summary: "string" },
            },
        },
        onSelectStep: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        const [selectedStepId, setSelectedStepId] = useState(args.selectedStepId);

        const stepPrev = 200;
        const stepNext = 200;

        const steps = Array.from({ length: 100 }, (value, index) => ({
            id: `stepper-extended-step-${index}`,
            label: "Completed",
            type: EStepperStepType.NEUTRAL,
            icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
        }));

        const renderPrevButton = ({ hidden, ...rest }: ICarouselExtendedButtonProvideProps) =>
            hidden ? null : (
                <ButtonIcon className={`buttonPrev ${args.size}`} {...rest} aria-label="Прокрутить назад">
                    <CaretleftStrokeSrvIcon24 className="button-prev-icon" paletteIndex={5} />
                </ButtonIcon>
            );

        const renderNextButton = ({ hidden, ...rest }: ICarouselExtendedButtonProvideProps) =>
            hidden ? null : (
                <ButtonIcon className={`buttonNext ${args.size}`} {...rest} aria-label="Прокрутить вперёд">
                    <CaretrightStrokeSrvIcon24 className="button-next-icon" paletteIndex={5} />
                </ButtonIcon>
            );

        return (
            <StepperExtended.Wrapper>
                <CarouselExtended
                    className="stepperExtendedCarousel"
                    buttonPrev={renderPrevButton}
                    buttonNext={renderNextButton}
                    stepPrev={stepPrev}
                    stepNext={stepNext}
                >
                    <StepperExtended
                        className="stepperExtended"
                        size={args.size}
                        selectedStepId={selectedStepId}
                        onSelectStep={setSelectedStepId}
                    >
                        {steps.map(({ id, label, icon, type }) => (
                            <StepperExtended.Step key={id} id={id} icon={icon} type={type}>
                                {label}
                            </StepperExtended.Step>
                        ))}
                    </StepperExtended>
                </CarouselExtended>
            </StepperExtended.Wrapper>
        );
    },
};
