import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CollapsibleTreeExtended } from "../../src/components/CollapsibleTreeExtended/CollapsibleTreeExtended";
import {
    CustomToggleExample,
    CustomToggleExampleSource,
    DefaultExample,
    DefaultExampleSource,
    PlaygroundExample,
    VisualTestsExample,
} from "./examples";

const meta = {
    title: "Components/CollapsibleTreeExtended",
    component: CollapsibleTreeExtended,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Низкоуровневое декларативное дерево с раскрывающимися узлами. Каждый узел `CollapsibleTreeExtended.Node` принимает две render-функции — `renderHeader` (видимая часть, всегда отрисовывается прямо в `<li>`) и `renderBody` (раскрываемое содержимое, обёрнуто в анимацию). Что именно рендерить — решает потребитель: можно положить любую кнопку, иконку, текст или произвольную разметку.\n\n### Когда использовать\n\n| Сценарий | Компонент |\n| --- | --- |\n| Типовое дерево «папка/файл»: шеврон, hover, focus-visible | [`CollapsibleTree`](?path=/docs/components-collapsibletree--docs) |\n| Своя иконка раскрытия (Plus/Minus, кастомный SVG) | `CollapsibleTreeExtended` |\n| Header кликабелен целиком, без отдельной кнопки шеврона | `CollapsibleTreeExtended` |\n| Нестандартный layout узла (например, узел с двумя колонками, badge, действиями) | `CollapsibleTreeExtended` |\n| Полный контроль над состоянием раскрытия из родителя | `CollapsibleTreeExtended` |\n\n### Архитектура узла\n\n```\nCollapsibleTreeExtended.Node\n├── renderHeader(...) → рендерится прямо в <li>, виден всегда\n└── ExpandAnimation\n    └── renderBody(...) → раскрывается/сворачивается по `opened`\n```\n\n`CollapsibleTree` — готовая обёртка поверх этого компонента: она задаёт типовой `renderHeader` (кнопка с шевроном) и `renderBody` (рекурсивный рендер дочерних узлов). Если типовой UI устраивает — используй её.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CollapsibleTreeExtended} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof CollapsibleTreeExtended>;

export default meta;
type Story = StoryObj<typeof CollapsibleTreeExtended>;

interface IPlaygroundArgs {
    /** Раскрыть все ветки по умолчанию. */
    defaultOpened: boolean;
    /** Использовать иконку Plus/Minus вместо шеврона. */
    withCustomToggle: boolean;
}

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    defaultOpened: false,
    withCustomToggle: false,
};

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        defaultOpened: {
            description: "Раскрыть все ветки по умолчанию.",
            control: "boolean",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
        withCustomToggle: {
            description: "Использовать иконку Plus/Minus вместо шеврона.",
            control: "boolean",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
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
    render: ({ defaultOpened, withCustomToggle }) => (
        <PlaygroundExample defaultOpened={defaultOpened} withCustomToggle={withCustomToggle} />
    ),
};

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Типовой пример: кнопка с шевроном для веток, плоский `div` для листьев. По сути воспроизводит UI готового `CollapsibleTree` — полезно как ориентир, что писать в `renderHeader` для стандартного дерева.",
            },
            source: { code: DefaultExampleSource, language: "tsx" },
        },
    },
};

export const CustomToggle: Story = {
    name: "Custom toggle (Plus/Minus)",
    render: CustomToggleExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Альтернативная иконка раскрытия: `Plus` в свёрнутом состоянии, `Minus` — в раскрытом, вместо шеврона. Демонстрирует, что `renderHeader` принимает произвольную разметку — потребитель сам решает, какую кнопку и индикатор раскрытия использовать.",
            },
            source: { code: CustomToggleExampleSource, language: "tsx" },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    render: VisualTestsExample,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
