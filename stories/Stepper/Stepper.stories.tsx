import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { EComponentSize, EStepperStepType, Stepper } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    IPlaygroundProps,
    ManySteps as ManyStepsRender,
    ManyStepsSource,
    Playground as PlaygroundRender,
    Sizes as SizesRender,
    SizesSource,
    Types as TypesRender,
    TypesSource,
    VisualTests as VisualTestsRender,
    WithIcons as WithIconsRender,
    WithIconsSource,
} from "./examples";

const meta = {
    title: "Components/Stepper",
    component: Stepper,
    tags: ["autodocs"],
    argTypes: {
        // Выбранный шаг и состав шагов живут во внутреннем состоянии примеров, управлять ими из Controls нечем.
        // В таблице Props (ArgTypes of={Stepper}) они остаются.
        steps: { table: { disable: true } },
        selectedStepId: { table: { disable: true } },
        onSelectStep: { table: { disable: true } },
    },
    parameters: {
        docs: {
            description: {
                component: `
Лента шагов: принимает массив шагов и сама собирает разметку. Шаги, которые не помещаются в контейнер, прокручиваются — карусель и кнопки прокрутки компонент рендерит сам. Для шагов с нестандартным содержимым есть базовый **StepperExtended**.

## Использование

Состав задаётся массивом **steps** (\`id\` + \`label\` + \`type\`), выбранный шаг — **selectedStepId**, смену запрашивает **onSelectStep**. Компонент управляемый: собственного состояния выбора у него нет.

## Особенности

- Шаги до выбранного считаются пройденными, после — непройденными. Порядок в массиве **steps** и есть порядок прохождения.
- При смене **selectedStepId** лента сама подводит выбранный шаг в видимую область: на широких экранах прижимает к ближайшему краю, на узких — центрирует.
- Кнопки прокрутки появляются по наведению на ленту и скрыты на экранах уже 768px: шаги в любом случае доступны прокруткой и с клавиатуры.
- Иконка статуса шага задаётся полем **icon** — обычно это **StepperStepIcon** с одним из значений \`EStepperStepIconType\`.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Stepper} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Stepper>;

export default meta;

const PLAYGROUND_ARGS: IPlaygroundProps = {
    size: EComponentSize.MD,
    type: EStepperStepType.NEUTRAL,
    stepsCount: 4,
    withIcons: true,
    containerWidth: 640,
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    render: PlaygroundRender,
    argTypes: {
        size: {
            control: { type: "inline-radio" },
            options: Object.values(EComponentSize),
            description: "Размер шагов и кнопок прокрутки.",
            table: {
                category: "Props",
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        type: {
            control: { type: "inline-radio" },
            options: Object.values(EStepperStepType),
            description: "Тип, которым помечен текущий шаг: NEUTRAL — обычный, ERROR и WARNING подсвечивают шаг.",
            table: {
                category: "Props",
                type: { summary: "EStepperStepType" },
            },
        },
        stepsCount: {
            control: { type: "range", min: 1, max: 12, step: 1 },
            description: "Количество шагов.",
            table: { category: "Settings" },
        },
        withIcons: {
            control: "boolean",
            description: "Иконки статуса на пройденных и текущем шагах.",
            table: { category: "Settings" },
        },
        containerWidth: {
            control: { type: "range", min: 240, max: 900, step: 20 },
            description: "Ширина контейнера: чем она меньше, тем больше шагов уезжает за край.",
            table: { category: "Settings" },
        },
    },
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
};

export const Default: StoryObj<typeof Stepper> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof Stepper> = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
};

export const Types: StoryObj<typeof Stepper> = {
    render: TypesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: TypesSource,
                language: "tsx",
            },
        },
    },
};

export const WithIcons: StoryObj<typeof Stepper> = {
    render: WithIconsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithIconsSource,
                language: "tsx",
            },
        },
    },
};

export const ManySteps: StoryObj<typeof Stepper> = {
    name: "With many steps (overflow)",
    render: ManyStepsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ManyStepsSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof Stepper> = {
    tags: ["!autodocs"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: async ({ userEvent }) => {
        // Переход по Tab включает :focus-visible на первом шаге.
        await userEvent.tab();
    },
};
