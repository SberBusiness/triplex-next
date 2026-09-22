import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { TagColor, EComponentSize, ETagColorStatus } from "@sberbusiness/triplex-next";
import {
    IPlaygroundArgs,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Sizes as SizesRender,
    SizesSource,
    Statuses as StatusesRender,
    StatusesSource,
    WithOverflow as WithOverflowRender,
    WithOverflowSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/TagColor",
    component: TagColor,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "TagColor используется для маркировки и классификации — например для статуса заявки или типа документа. " +
                    "Компонент неинтерактивный: он рендерит `span` без обработчиков и фокуса, а цвет фона задаётся через `status`. " +
                    "Длинный контент обрезается многоточием по ширине контейнера, поэтому тег не шире родителя.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={TagColor} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof TagColor>;

export default meta;
type Story = StoryObj<typeof TagColor>;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    children: "Tag text",
    size: EComponentSize.MD,
    status: ETagColorStatus.SUCCESS,
};

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        children: {
            description: "Содержимое тега.",
            control: "text",
            table: { category: "Props" },
        },
        size: {
            description: "Размер.",
            control: "select",
            options: Object.values(EComponentSize),
            table: {
                category: "Props",
                type: { summary: "EComponentSize" },
            },
        },
        status: {
            description: "Статус.",
            control: "select",
            options: Object.values(ETagColorStatus),
            table: {
                category: "Props",
                type: { summary: "ETagColorStatus" },
                defaultValue: { summary: "ETagColorStatus.DEFAULT" },
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
                story: "Минимальный тег: обязателен только `size`, статус по умолчанию — `ETagColorStatus.DEFAULT`.",
            },
            source: { code: DefaultSource, language: "tsx" },
        },
        // Состояние MD + DEFAULT уже покрыто Statuses и VisualTests — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const Sizes: Story = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Размеры SM (16px) / MD (20px) / LG (28px). Размер задаёт высоту, отступы, радиус скругления и размер текста.",
            },
            source: { code: SizesSource, language: "tsx" },
        },
    },
};

export const Statuses: Story = {
    render: StatusesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Статус задаёт только цвет фона — размер и типографика от него не зависят.",
            },
            source: { code: StatusesSource, language: "tsx" },
        },
    },
};

export const WithOverflow: Story = {
    name: "With overflow",
    render: WithOverflowRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Тег не шире своего контейнера: длинный текст обрезается многоточием.",
            },
            source: { code: WithOverflowSource, language: "tsx" },
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
