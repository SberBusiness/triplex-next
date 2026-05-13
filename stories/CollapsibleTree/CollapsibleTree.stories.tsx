import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { CollapsibleTree } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Opened as OpenedRender,
    OpenedSource,
    Nested as NestedRender,
    NestedSource,
} from "./examples";

const meta = {
    title: "Components/CollapsibleTree",
    component: CollapsibleTree,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Дерево с раскрывающимися нодами. Обёртка над `CollapsibleTreeExtended` с готовым заголовком: иконка-шеврон, hover и focus-visible на интерактивной строке.\n\n- Ноды с `children` интерактивны и раскрываются по клику.\n- Леаф-ноды (без `children`) отображаются без шеврона.\n- Стартовое состояние раскрытия задаётся через `defaultOpened`.",
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
    { id: "folder-1", label: "Folder text", children: [{ id: "file-1", label: "File text" }] },
    {
        id: "folder-2",
        label: "Folder text",
        defaultOpened: true,
        children: [
            { id: "file-2-1", label: "File text" },
            { id: "file-2-2", label: "File text" },
        ],
    },
    { id: "folder-3", label: "Folder text", children: [{ id: "file-3", label: "File text" }] },
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
