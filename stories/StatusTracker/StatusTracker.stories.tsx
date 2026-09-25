import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { StatusTracker, EStatusTrackerType, EStatusTrackerVerticalAlign } from "@sberbusiness/triplex-next";
import {
    IPlaygroundArgs,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Types as TypesRender,
    TypesSource,
    VerticalAlign as VerticalAlignRender,
    VerticalAlignSource,
    WithMediaOnly as WithMediaOnlyRender,
    WithMediaOnlySource,
    Example as ExampleRender,
    ExampleSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/StatusTracker",
    component: StatusTracker,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "StatusTracker — карточка статуса документа: декоративный градиент на фоне кодирует `type`, " +
                    "а содержимое собирается из блоков `StatusTracker.Media`, `.Header`, `.Body` и `.Footer`. " +
                    "Все блоки необязательны и рендерятся в том порядке, в каком переданы. " +
                    "Компонент занимает всю ширину и высоту родителя, поэтому размеры задаёт контейнер.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={StatusTracker} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof StatusTracker>;

export default meta;
type Story = StoryObj<typeof StatusTracker>;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    type: EStatusTrackerType.WAITING,
    verticalAlign: EStatusTrackerVerticalAlign.TOP,
};

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        type: {
            description: "Тип статуса документа. Задаёт цвет декоративного градиента.",
            control: "select",
            options: Object.values(EStatusTrackerType),
            table: {
                category: "Props",
                type: { summary: "EStatusTrackerType" },
            },
        },
        verticalAlign: {
            description: "Вертикальное выравнивание контента внутри карточки.",
            control: "select",
            options: Object.values(EStatusTrackerVerticalAlign),
            table: {
                category: "Props",
                type: { summary: "EStatusTrackerVerticalAlign" },
                defaultValue: { summary: "EStatusTrackerVerticalAlign.TOP" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Минимальная карточка: обязателен только `type`, выравнивание по умолчанию — `EStatusTrackerVerticalAlign.TOP`.",
            },
            source: { code: DefaultSource, language: "tsx" },
        },
    },
};

export const Types: Story = {
    render: TypesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "`type` влияет только на цвет декоративного градиента: иконку и текст статуса задаёт потребитель.",
            },
            source: { code: TypesSource, language: "tsx" },
        },
    },
};

export const VerticalAlign: Story = {
    name: "Vertical align",
    render: VerticalAlignRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Выравнивание заметно, только когда контейнер выше содержимого карточки.",
            },
            source: { code: VerticalAlignSource, language: "tsx" },
        },
    },
};

export const WithMediaOnly: Story = {
    name: "With media only",
    render: WithMediaOnlyRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Все блоки необязательны: карточка остаётся валидной даже с одной иконкой.",
            },
            source: { code: WithMediaOnlySource, language: "tsx" },
        },
    },
};

export const Example: Story = {
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Полная композиция: медиа, заголовок с суммой, группа статусов с предупреждением и футер с действиями.",
            },
            source: { code: ExampleSource, language: "tsx" },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
