import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
    ArgTypes,
    Controls,
    Description,
    Heading,
    Primary,
    Stories,
    Subheading,
    Title,
} from "@storybook/addon-docs/blocks";
import { EComponentSize, EFormFieldStatus, MultiselectField } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    DropdownWithoutInputExample,
    DropdownWithoutInputExampleSource,
    LoadingExample,
    LoadingExampleSource,
    ProductionExample,
    ProductionExampleSource,
    SizesExample,
    SizesExampleSource,
    StatusesExample,
    StatusesExampleSource,
    WithClearButtonExample,
    WithClearButtonExampleSource,
    WithPrefixAndPostfixExample,
    WithPrefixAndPostfixExampleSource,
} from "./examples";
import { PlaygroundExample } from "./examples/PlaygroundExample";
import "./MultiselectField.less";

const meta = {
    title: "Components/MultiselectField",
    component: MultiselectField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент мульти-списка.

## Особенности

- **Размеры**: SM, MD, LG.

## Состав

- Target — поле ввода
- Dropdown — выпадающий список
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <Subheading>MultiselectField</Subheading>
                    <ArgTypes of={MultiselectField} />
                    <Subheading>MultiselectField.Target</Subheading>
                    <ArgTypes of={MultiselectField.Target} />
                    <Subheading>MultiselectField.Dropdown</Subheading>
                    <ArgTypes of={MultiselectField.Dropdown} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof MultiselectField>;

export default meta;

interface IPlaygroundArgs {
    size: EComponentSize;
    status: EFormFieldStatus;
    loading: boolean;
    prefix: string;
    postfix: string;
    withInput: boolean;
    withClearButton: boolean;
}

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        size: EComponentSize.MD,
        status: EFormFieldStatus.DEFAULT,
        loading: false,
        prefix: "",
        postfix: "",
        withInput: true,
        withClearButton: false,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: EComponentSize.MD },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Состояние компонента",
            table: {
                type: { summary: "EFormFieldStatus" },
                defaultValue: { summary: EFormFieldStatus.DEFAULT },
            },
        },
        loading: {
            control: { type: "boolean" },
            description: "Показать состояние загрузки target.",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        prefix: {
            control: { type: "text" },
            description: "Текстовый префикс.",
            table: {
                category: "Settings",
                type: { summary: "string" },
            },
        },
        postfix: {
            control: { type: "text" },
            description: "Текстовый постфикс.",
            table: {
                category: "Settings",
                type: { summary: "string" },
            },
        },
        withInput: {
            control: { type: "boolean" },
            description: "Показывать поле фильтра в dropdown.",
            table: {
                category: "Settings",
                type: { summary: "boolean" },
            },
        },
        withClearButton: {
            control: { type: "boolean" },
            description: "Показывать кнопку очистки в target.",
            table: {
                category: "Settings",
                type: { summary: "boolean" },
            },
        },
    },
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: ({ prefix, postfix, ...args }) => (
        <PlaygroundExample
            {...args}
            prefix={prefix.length ? prefix : undefined}
            postfix={postfix.length ? postfix : undefined}
        />
    ),
};

export const Default: StoryObj<typeof DefaultExample> = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof SizesExample> = {
    name: "Sizes",
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Statuses: StoryObj<typeof StatusesExample> = {
    name: "Statuses",
    render: StatusesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: StatusesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Loading: StoryObj<typeof LoadingExample> = {
    name: "Loading",
    render: LoadingExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: LoadingExampleSource,
                language: "tsx",
            },
        },
    },
};

export const DropdownWithoutInput: StoryObj<typeof DropdownWithoutInputExample> = {
    name: "DropdownWithoutInput",
    render: DropdownWithoutInputExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DropdownWithoutInputExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithClearButton: StoryObj<typeof WithClearButtonExample> = {
    name: "WithClearButton",
    render: WithClearButtonExample,
    parameters: {
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: WithClearButtonExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithPrefixAndPostfix: StoryObj<typeof WithPrefixAndPostfixExample> = {
    name: "WithPrefixAndPostfix",
    render: WithPrefixAndPostfixExample,
    parameters: {
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: WithPrefixAndPostfixExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Example: StoryObj<typeof ProductionExample> = {
    name: "Example: production",
    render: ProductionExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ProductionExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof PlaygroundExample> = {
    name: "Visual tests",
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: () => (
        <div style={{ maxWidth: "320px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <PlaygroundExample initialSelectedIds={["multiselect-option-2-1"]} />
            <PlaygroundExample forceOpened />
        </div>
    ),
};
