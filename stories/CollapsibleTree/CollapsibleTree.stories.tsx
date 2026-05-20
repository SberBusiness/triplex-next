import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { CollapsibleTree, CollapsibleTreeNodeLabel } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Opened as OpenedRender,
    OpenedSource,
    Nested as NestedRender,
    NestedSource,
    CustomLabel as CustomLabelRender,
    CustomLabelSource,
    VisualTestsExample,
} from "./examples";

const meta = {
    title: "Components/CollapsibleTree",
    component: CollapsibleTree,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Готовое дерево с раскрывающимися ветками. Обёртка над [`CollapsibleTreeExtended`](?path=/docs/components-collapsibletreeextended--docs) с типовым UI узла: кнопка-заголовок с иконкой-шевроном, hover и focus-visible на интерактивной строке.\n\n### Модель данных\n\n- **Ветка** (`ICollapsibleTreeNodeBranch`) — узел с `label`, может содержать дочерние узлы (ветки и листья), интерактивна и раскрывается по клику.\n- **Лист** (`ICollapsibleTreeNodeLeaf`) — конечный узел с произвольным `content`, без шеврона, не раскрывается.\n- Стартовое состояние раскрытия ветки задаётся через `defaultOpened`.\n- На верхнем уровне `nodes` допустимы только ветки; листья — внутри `children` ветки.\n\n### Когда использовать\n\n- **`CollapsibleTree`** — типовое дерево «папка/файл» с готовым шевроном и hover. Достаточно описать данные узлов.\n- **`CollapsibleTreeExtended`** — нужен нестандартный UI узла (своя иконка раскрытия, кастомный header, особое поведение клика).",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CollapsibleTree} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof CollapsibleTree>;

export default meta;

const playgroundNodes = [
    {
        id: "folder-1",
        label: <CollapsibleTreeNodeLabel>Folder text</CollapsibleTreeNodeLabel>,
        children: [{ id: "file-1", content: "File text" }],
    },
    {
        id: "folder-2",
        label: <CollapsibleTreeNodeLabel>Folder text</CollapsibleTreeNodeLabel>,
        defaultOpened: true,
        children: [
            { id: "file-2-1", content: "File text" },
            { id: "file-2-2", content: "File text" },
        ],
    },
    {
        id: "folder-3",
        label: <CollapsibleTreeNodeLabel>Folder text</CollapsibleTreeNodeLabel>,
        children: [{ id: "file-3", content: "File text" }],
    },
];

export const Playground: StoryObj<typeof CollapsibleTree> = {
    tags: ["!autodocs"],
    args: {
        nodes: playgroundNodes,
    },
    parameters: {
        testRunner: { skip: true },
        controls: { include: ["nodes"] },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: (args) => (
        <div style={{ maxWidth: 320 }}>
            <CollapsibleTree {...args} />
        </div>
    ),
};

export const Default: StoryObj<typeof CollapsibleTree> = {
    name: "Default",
    render: DefaultRender,
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: DefaultSource, language: "tsx" },
        },
    },
};

export const Opened: StoryObj<typeof CollapsibleTree> = {
    name: "Opened",
    render: OpenedRender,
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: OpenedSource, language: "tsx" },
        },
    },
};

export const Nested: StoryObj<typeof CollapsibleTree> = {
    name: "Nested",
    render: NestedRender,
    parameters: {
        docs: {
            controls: { disable: true },
            source: { code: NestedSource, language: "tsx" },
        },
    },
};

export const CustomLabel: StoryObj<typeof CollapsibleTree> = {
    name: "Custom label",
    render: CustomLabelRender,
    parameters: {
        docs: {
            description: {
                story: "Размер и вес шрифта заголовка ветки задаются через пропы `size` и `weight` у `CollapsibleTreeNodeLabel`. По умолчанию — `B1` / `SEMIBOLD`.",
            },
            controls: { disable: true },
            source: { code: CustomLabelSource, language: "tsx" },
        },
    },
};

export const VisualTests: StoryObj<typeof CollapsibleTree> = {
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
