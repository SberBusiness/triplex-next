import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Portal } from "@sberbusiness/triplex-next";
import {
    IPlaygroundProps,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Example as ExampleRender,
    ExampleSource,
} from "./examples";

const meta = {
    title: "Components/Portal",
    component: Portal,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Портал для рендера содержимого во внешний DOM-узел (обёртка над ReactDOM.createPortal). Используется, когда содержимое нужно отрендерить вне DOM-иерархии родителя — например, чтобы выйти за пределы контейнера с overflow: hidden.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Portal} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Portal>;

export default meta;

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: {
        children: "Содержимое, отрендеренное через Portal.",
    },
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Содержимое, рендерящееся в container.",
            table: { type: { summary: "ReactNode" } },
        },
        container: {
            control: false,
            description:
                "DOM-узел, в который рендерится содержимое. DOM-узел нельзя настроить через Controls, поэтому в Playground он задаётся обёрткой — узел с пунктирной рамкой.",
            table: { type: { summary: "Element | DocumentFragment" } },
        },
    },
    parameters: {
        controls: { include: ["children", "container"] },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof Portal> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Содержимое Portal рендерится в указанный DOM-узел, а не в месте объявления." },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Example: StoryObj<typeof Portal> = {
    name: "Example: escaping overflow: hidden",
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Типовой сценарий использования: содержимое объявлено внутри контейнера с overflow: hidden, но через Portal рендерится во внешний узел и не обрезается.",
            },
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};
