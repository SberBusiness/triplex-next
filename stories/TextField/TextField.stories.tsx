import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { TextField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    PlaygroundArgs,
    Default as DefaultRender,
    DefaultSource,
    Sizes as SizesRender,
    SizesSource,
    Statuses as StatusesRender,
    StatusesSource,
    WithPrefixAndPostfix as WithPrefixAndPostfixRender,
    WithPrefixAndPostfixSource,
    WithClearButton as WithClearButtonRender,
    WithClearButtonSource,
    WithCounter as WithCounterRender,
    WithCounterSource,
    PassRefToInput as PassRefToInputRender,
    PassRefToInputSource,
    Production as ProductionRender,
    ProductionSource,
    VisualTests as VisualTestsRender,
} from "./examples";

export default {
    title: "Components/TextFields/TextField",
    component: TextField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={TextField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof TextField>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Props
    size: EComponentSize.LG,
    status: EFormFieldStatus.DEFAULT,
    label: "Label",
    prefix: "",
    postfix: "",
    description: "(21) Description",
    counter: "0/201",
    // Settings
    placeholder: "Type to proceed",
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Props
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер поля",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.LG" },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Визуальное состояние",
            table: {
                type: { summary: "EFormFieldStatus" },
                defaultValue: { summary: "EFormFieldStatus.DEFAULT" },
            },
        },
        label: {
            control: { type: "text" },
            description: "Лейбл поля ввода",
        },
        prefix: {
            control: { type: "text" },
            description: "Префикс поля ввода",
        },
        postfix: {
            control: { type: "text" },
            description: "Постфикс поля ввода",
        },
        description: {
            control: { type: "text" },
            description: "Описание поля ввода",
        },
        counter: {
            control: { type: "text" },
            description: "Счетчик символов",
        },
        // Settings
        placeholder: {
            control: { type: "text" },
            description: "Текст-заполнитель в поле ввода.",
            table: {
                category: "Settings",
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

export const Default: StoryObj<typeof TextField> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        // Визуально дублирует вариант LG из стори Sizes — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const Sizes: StoryObj<typeof TextField> = {
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

export const Statuses: StoryObj<typeof TextField> = {
    render: StatusesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: StatusesSource,
                language: "tsx",
            },
        },
    },
};

export const WithPrefixAndPostfix: StoryObj<typeof TextField> = {
    render: WithPrefixAndPostfixRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithPrefixAndPostfixSource,
                language: "tsx",
            },
        },
        // Состояние с префиксом и постфиксом покрыто скриншотом стори VisualTests.
        testRunner: { skip: true },
    },
};

export const WithClearButton: StoryObj<typeof TextField> = {
    render: WithClearButtonRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithClearButtonSource,
                language: "tsx",
            },
        },
        // Состояние с кнопкой очистки покрыто скриншотом стори VisualTests.
        testRunner: { skip: true },
    },
};

export const WithCounter: StoryObj<typeof TextField> = {
    render: WithCounterRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithCounterSource,
                language: "tsx",
            },
        },
        // Состояние со счетчиком и описанием покрыто скриншотом стори VisualTests.
        testRunner: { skip: true },
    },
};

export const PassRefToInput: StoryObj<typeof TextField> = {
    render: PassRefToInputRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: PassRefToInputSource,
                language: "tsx",
            },
        },
        // Визуально дублирует стори Default — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const Production: StoryObj<typeof TextField> = {
    name: "Example: production",
    render: ProductionRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ProductionSource,
                language: "tsx",
            },
        },
        // Комбинация покрыта скриншотами стори VisualTests.
        testRunner: { skip: true },
    },
};

export const VisualTests: StoryObj<typeof TextField> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsRender,
    play: async ({ canvas, userEvent }) => {
        const inputs = await canvas.findAllByRole("textbox");

        // Фокус на первом поле (вариант FOCUSED).
        await userEvent.click(inputs[0]);
    },
};
