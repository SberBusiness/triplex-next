import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
    Title as DocsTitle,
    Description,
    Primary,
    Controls,
    Stories,
    ArgTypes,
    Heading,
} from "@storybook/addon-docs/blocks";
import { Title, ETitleSize, EFontType, EFontWeightTitle } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    PlaygroundArgs,
    Default as DefaultRender,
    DefaultSource,
    Sizes as SizesRender,
    SizesSource,
    Weights as WeightsRender,
    WeightsSource,
    Types as TypesRender,
    TypesSource,
    Decorations as DecorationsRender,
    DecorationsSource,
} from "./examples/Title";

const meta = {
    title: "Components/Typography/Title",
    component: Title,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Title} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Title>;

export default meta;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    size: ETitleSize.H1,
    weight: EFontWeightTitle.SEMIBOLD,
    type: EFontType.PRIMARY,
    tag: "h1",
    underline: false,
    strikethrough: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(ETitleSize),
            description: "Размер заголовка",
            table: {
                type: { summary: "ETitleSize" },
                defaultValue: { summary: "ETitleSize.H1" },
            },
        },
        weight: {
            control: { type: "select" },
            options: Object.values(EFontWeightTitle),
            description: "Толщина шрифта",
            table: {
                type: { summary: "EFontWeightTitle" },
                defaultValue: { summary: "EFontWeightTitle.SEMIBOLD" },
            },
        },
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
            options: ["h1", "h2", "h3", "div", "span", "p"],
            description: "HTML тег для рендера",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "h1" },
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

export const Default: StoryObj<typeof Title> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        // Визуально дублирует заголовок H1 из стори Sizes — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const Sizes: StoryObj<typeof Title> = {
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

export const Weights: StoryObj<typeof Title> = {
    render: WeightsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WeightsSource,
                language: "tsx",
            },
        },
    },
};

export const Types: StoryObj<typeof Title> = {
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

export const Decorations: StoryObj<typeof Title> = {
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
