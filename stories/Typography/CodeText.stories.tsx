import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { CodeText, EFontType } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    PlaygroundArgs,
    Default as DefaultRender,
    DefaultSource,
    Types as TypesRender,
    TypesSource,
    Decorations as DecorationsRender,
    DecorationsSource,
} from "./examples/CodeText";

const meta = {
    title: "Components/Typography/CodeText",
    component: CodeText,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CodeText} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof CodeText>;

export default meta;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    type: EFontType.PRIMARY,
    tag: "span",
    underline: false,
    strikethrough: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EFontType),
            description: "Тип (цвет) текста",
            table: {
                type: { summary: "EFontType" },
                defaultValue: { summary: "EFontType.PRIMARY" },
            },
        },
        tag: {
            control: { type: "select" },
            options: ["span", "code", "pre", "div"],
            description: "HTML тег для рендера",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "span" },
            },
        },
        underline: {
            control: { type: "boolean" },
            description: "Подчеркивание текста",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        strikethrough: {
            control: { type: "boolean" },
            description: "Зачеркивание текста",
            table: {
                type: { summary: "boolean" },
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
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof CodeText> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        // Визуально дублирует первую строку стори Decorations — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const Types: StoryObj<typeof CodeText> = {
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

export const Decorations: StoryObj<typeof CodeText> = {
    render: DecorationsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DecorationsSource,
                language: "tsx",
            },
        },
    },
};
