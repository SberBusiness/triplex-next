import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Caption, ECaptionSize, EFontType, EFontWeightCaption } from "@sberbusiness/triplex-next";
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
} from "./examples/Caption";

const meta = {
    title: "Components/Typography/Caption",
    component: Caption,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Caption} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Caption>;

export default meta;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    size: ECaptionSize.C1,
    weight: EFontWeightCaption.REGULAR,
    type: EFontType.PRIMARY,
    tag: "span",
    underline: false,
    strikethrough: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(ECaptionSize),
            description: "Размер подписи",
            table: {
                type: { summary: "ECaptionSize" },
                defaultValue: { summary: "ECaptionSize.C1" },
            },
        },
        weight: {
            control: { type: "select" },
            options: Object.values(EFontWeightCaption),
            description: "Толщина шрифта",
            table: {
                type: { summary: "EFontWeightCaption" },
                defaultValue: { summary: "EFontWeightCaption.REGULAR" },
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
            options: ["span", "div", "p", "h1", "h2", "h3"],
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

export const Default: StoryObj<typeof Caption> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        // Визуально дублирует подпись C1 из стори Sizes — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const Sizes: StoryObj<typeof Caption> = {
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

export const Weights: StoryObj<typeof Caption> = {
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

export const Types: StoryObj<typeof Caption> = {
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

export const Decorations: StoryObj<typeof Caption> = {
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
