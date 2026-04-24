import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Controls, Description, Primary, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import {
    Stepper,
    StepperExtended,
    CarouselExtended,
    ButtonIcon,
    ICarouselExtendedButtonProvideProps,
    EComponentSize,
    EStepperStepType,
    EStepperStepIconType,
} from "@sberbusiness/triplex-next";
import { StepperStepIcon } from "../../src/components/Stepper/StepperStepIcon";
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
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
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
        size: EComponentSize.LG,
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
            options: Object.values(EComponentSize),
            description: "Размер степпера",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.LG" },
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

        return <Stepper {...args} selectedStepId={selectedStepId} onSelectStep={handleSelectStep} />;
    },
    parameters: {
        controls: {
            include: ["steps", "size", "selectedStepId"],
        },
        docs: {
            description: {
                story: "Интерактивная демонстрация Stepper. Позволяет настраивать список шагов, размер, а также контролировать текущий выбранный шаг.",
            },
        },
    },
};

export const Sizes: StoryObj<typeof Stepper> = {
    name: "Sizes",
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        controls: { disable: true },
    },
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
                    <Stepper
                        steps={commonSteps}
                        size={EComponentSize.SM}
                        selectedStepId={selectedStepIdSM}
                        onSelectStep={setSelectedStepIdSM}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Medium (MD)</h3>
                    <Stepper
                        steps={commonSteps}
                        size={EComponentSize.MD}
                        selectedStepId={selectedStepIdMD}
                        onSelectStep={setSelectedStepIdMD}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Large (LG)</h3>
                    <Stepper
                        steps={commonSteps}
                        size={EComponentSize.LG}
                        selectedStepId={selectedStepIdLG}
                        onSelectStep={setSelectedStepIdLG}
                    />
                </div>
            </div>
        );
    },
};

export const Types: StoryObj<typeof Stepper> = {
    name: "Types",
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selectedStepIdNeutral, setSelectedStepIdNeutral] = useState("step4");
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
                label: "In Progress",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
                icon: <StepperStepIcon type={EStepperStepIconType.WAIT} />,
            },
            {
                id: "step5",
                label: "Available",
                disabled: false,
                type: EStepperStepType.NEUTRAL,
            },
            {
                id: "step6",
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
        ];

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Neutral</h3>
                    <Stepper
                        steps={neutralSteps}
                        size={EComponentSize.MD}
                        selectedStepId={selectedStepIdNeutral}
                        onSelectStep={setSelectedStepIdNeutral}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Error</h3>
                    <Stepper
                        steps={errorSteps}
                        size={EComponentSize.MD}
                        selectedStepId={selectedStepIdError}
                        onSelectStep={setSelectedStepIdError}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Warning</h3>
                    <Stepper
                        steps={warningSteps}
                        size={EComponentSize.MD}
                        selectedStepId={selectedStepIdWarning}
                        onSelectStep={setSelectedStepIdWarning}
                    />
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
                label: "In Progress",
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
        selectedStepId: "step1",
        onSelectStep: action("On Select Step"),
    },
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
        steps: {
            table: {
                disable: true,
            },
        },
        selectedStepId: {
            table: {
                disable: true,
            },
        },
        onSelectStep: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        controls: { disable: true },
    },
    render: (args) => {
        const [selectedStepId, setSelectedStepId] = useState(args.selectedStepId);
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Small (SM)</h3>
                    <Stepper
                        {...args}
                        size={EComponentSize.SM}
                        selectedStepId={selectedStepId}
                        onSelectStep={setSelectedStepId}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Medium (MD)</h3>
                    <Stepper
                        {...args}
                        size={EComponentSize.MD}
                        selectedStepId={selectedStepId}
                        onSelectStep={setSelectedStepId}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Large (LG)</h3>
                    <Stepper
                        {...args}
                        size={EComponentSize.LG}
                        selectedStepId={selectedStepId}
                        onSelectStep={setSelectedStepId}
                    />
                </div>
            </div>
        );
    },
};

export const StepperExtendedType: StoryObj<typeof StepperExtended> = {
    name: "StepperExtended",
    args: {
        size: EComponentSize.LG,
        selectedStepId: "stepper-extended-step-2",
        onSelectStep: action("On Select Step"),
    },
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
        selectedStepId: {
            table: {
                disable: true,
            },
        },
        onSelectStep: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
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

        const renderPrevButton = ({ hidden, ...restButtonProps }: ICarouselExtendedButtonProvideProps) =>
            hidden ? null : (
                <div className="stepper-button-wrapper prev">
                    <ButtonIcon
                        className={clsx("stepper-button", args.size)}
                        {...restButtonProps}
                        aria-label="Прокрутить назад"
                    >
                        <CaretleftStrokeSrvIcon24 paletteIndex={5} />
                    </ButtonIcon>
                </div>
            );

        const renderNextButton = ({ hidden, ...restButtonProps }: ICarouselExtendedButtonProvideProps) =>
            hidden ? null : (
                <div className="stepper-button-wrapper next">
                    <ButtonIcon
                        className={clsx("stepper-button", args.size)}
                        {...restButtonProps}
                        aria-label="Прокрутить вперёд"
                    >
                        <CaretrightStrokeSrvIcon24 paletteIndex={5} />
                    </ButtonIcon>
                </div>
            );

        return (
            <CarouselExtended
                className="stepper-carousel"
                buttonPrev={renderPrevButton}
                buttonNext={renderNextButton}
                stepPrev={stepPrev}
                stepNext={stepNext}
            >
                <StepperExtended size={args.size} selectedStepId={selectedStepId} onSelectStep={setSelectedStepId}>
                    {steps.map(({ id, label, icon, type }) => (
                        <StepperExtended.Step key={id} id={id} icon={icon} type={type}>
                            {label}
                        </StepperExtended.Step>
                    ))}
                </StepperExtended>
            </CarouselExtended>
        );
    },
};
