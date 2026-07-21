import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Text, ETextSize, ELineType, EFontType, EFontWeightText } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    PlaygroundArgs,
    Default as DefaultRender,
    DefaultSource,
    Sizes as SizesRender,
    SizesSource,
    Weights as WeightsRender,
    WeightsSource,
    LineTypes as LineTypesRender,
    LineTypesSource,
    Types as TypesRender,
    TypesSource,
    Decorations as DecorationsRender,
    DecorationsSource,
} from "./examples/Text";

const meta = {
    title: "Components/Typography/Text",
    component: Text,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Text} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Text>;

export default meta;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    size: ETextSize.B2,
    weight: EFontWeightText.REGULAR,
    line: ELineType.NORMAL,
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
            options: Object.values(ETextSize),
            description: "Размер текста",
            table: {
                type: { summary: "ETextSize" },
                defaultValue: { summary: "ETextSize.B2" },
            },
        },
        weight: {
            control: { type: "select" },
            options: Object.values(EFontWeightText),
            description: "Толщина шрифта",
            table: {
                type: { summary: "EFontWeightText" },
                defaultValue: { summary: "EFontWeightText.REGULAR" },
            },
        },
        line: {
            control: { type: "select" },
            options: Object.values(ELineType),
            description: "Высота блока строки (Normal = обычная, Compact = компактная)",
            table: {
                type: { summary: "ELineType" },
                defaultValue: { summary: "ELineType.NORMAL" },
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

export const Default: StoryObj<typeof Text> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        // Визуально дублирует строку B2 из стори Sizes — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const Sizes: StoryObj<typeof Text> = {
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

export const Weights: StoryObj<typeof Text> = {
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

export const LineTypes: StoryObj<typeof Text> = {
    render: LineTypesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: LineTypesSource,
                language: "tsx",
            },
        },
    },
};

export const Types: StoryObj<typeof Text> = {
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

export const Decorations: StoryObj<typeof Text> = {
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
